/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "calendar_napi.h"
#include "calendar_log.h"
#include "napi_util.h"
#include "napi_queue.h"
#include "native_util.h"

namespace {
    const std::string CALENDAR_CLASS_NAME = "Calendar";
}

namespace OHOS::CalendarApi {

napi_value CalendarNapi::Constructor(napi_env env)
{
    const napi_property_descriptor properties[] = {
        DECLARE_NAPI_FUNCTION("addEvent", AddEvent),
        DECLARE_NAPI_FUNCTION("addEvents", AddEvents),
        DECLARE_NAPI_FUNCTION("deleteEvent", DeleteEvent),
        DECLARE_NAPI_FUNCTION("deleteEvents", DeleteEvents),
        DECLARE_NAPI_FUNCTION("updateEvent", UpdateEvent),
        DECLARE_NAPI_FUNCTION("updateEvents", UpdateEvents),
        DECLARE_NAPI_FUNCTION("getEvents", GetEvents),
        DECLARE_NAPI_FUNCTION("getConfig", GetConfig),
        DECLARE_NAPI_FUNCTION("setConfig", SetConfig),
        DECLARE_NAPI_FUNCTION("getAccount", GetAccount),
    };
    size_t count = sizeof(properties) / sizeof(properties[0]);
    return NapiUtil::DefineClass(env, "Calendar", properties, count, CalendarNapi::New);
}

/*
 * [JS API Prototype]
 *      var calendar = new Calendar();
 */
napi_value CalendarNapi::New(napi_env env, napi_callback_info info)
{
    auto ctxt = std::make_shared<ContextBase>();
    auto input = [env, ctxt](size_t argc, napi_value* argv) {
        CHECK_ARGS_RETURN_VOID(ctxt, argc <= 1, "invalid arguments!");
    };
    ctxt->GetCbInfoSync(env, info, input);
    NAPI_ASSERT(env, ctxt->status == napi_ok, "invalid arguments!");

    auto calendar = new (std::nothrow) CalendarNapi();
    NAPI_ASSERT(env, calendar != nullptr, "no memory for calendar");

    auto finalize = [](napi_env env, void* data, void* hint) {
        LOG_DEBUG("calendar finalize.");
        auto* calendar = reinterpret_cast<CalendarNapi*>(data);
        CHECK_RETURN_VOID(calendar != nullptr, "finalize null!");
        delete calendar;
    };
    if (napi_wrap(env, ctxt->self, calendar, finalize, nullptr, nullptr) != napi_ok) {
        delete calendar;
        GET_AND_THROW_LAST_ERROR(env);
        return nullptr;
    }
    return ctxt->self;
}

napi_status CalendarNapi::ToJson(napi_env env, napi_value inner, CalendarNapi*& out)
{
    LOG_DEBUG("CalendarNapi::ToJson");
    return NapiUtil::Unwrap(env, inner, reinterpret_cast<void**>(&out), CalendarNapi::Constructor(env));
}

void CalendarNapi::SetNative(std::shared_ptr<Native::Calendar>& calendar)
{
    calendar_ = calendar;
}
std::shared_ptr<Native::Calendar>& CalendarNapi::GetNative()
{
    return calendar_;
}

napi_value CalendarNapi::AddEvent(napi_env env, napi_callback_info info)
{
    LOG_INFO("AddEvent");
    struct AddEventContext : public ContextBase {
        Event event;
        int eventId;
    };
    auto ctxt = std::make_shared<AddEventContext>();
    auto input = [env, ctxt](size_t argc, napi_value* argv) {
        // required atleast 1 arguments :: <eventFilter>
        CHECK_ARGS_RETURN_VOID(ctxt, argc == 1, "invalid arguments!");
        ctxt->status = NapiUtil::GetValue(env, argv[0], ctxt->event);
        CHECK_STATUS_RETURN_VOID(ctxt, "AddEvent failed!");
        Native::DumpEvent(ctxt->event);
        CHECK_STATUS_RETURN_VOID(ctxt, "invalid arg[0], i.e. invalid keys!");
    };
    ctxt->GetCbInfo(env, info, input);
    auto execute = [ctxt]() {
        auto calendar = reinterpret_cast<CalendarNapi*>(ctxt->native);
        CHECK_RETURN_VOID(calendar != nullptr, "CalendarNapi nullptr");
        auto nativeCalendar = calendar->GetNative();
        CHECK_RETURN_VOID(nativeCalendar != nullptr, "nativeCalendar nullptr");
        ctxt->eventId = nativeCalendar->AddEvent(ctxt->event);
        ctxt->status = (ctxt->eventId > 0) ? napi_ok : napi_generic_failure;
        CHECK_STATUS_RETURN_VOID(ctxt, "AddEvent failed!");
    };
    auto output = [env, ctxt](napi_value& result) {
        ctxt->status = NapiUtil::SetValue(ctxt->env, ctxt->eventId, result);
        CHECK_STATUS_RETURN_VOID(ctxt, "output failed");
    };
    return NapiQueue::AsyncWork(env, ctxt, std::string(__FUNCTION__), execute, output);
}

napi_value CalendarNapi::AddEvents(napi_env env, napi_callback_info info)
{
    LOG_INFO("AddEvents");
    struct AddEventsContext : public ContextBase {
        std::vector<Event> events;
        int count;
    };
    auto ctxt = std::make_shared<AddEventsContext>();
    auto input = [env, ctxt](size_t argc, napi_value* argv) {
        // required atleast 1 arguments :: <eventFilter>
        CHECK_ARGS_RETURN_VOID(ctxt, argc == 1, "invalid arguments!");
        ctxt->status = NapiUtil::GetValue(env, argv[0], ctxt->events);
        CHECK_STATUS_RETURN_VOID(ctxt, "GetValue failed!");
        CHECK_STATUS_RETURN_VOID(ctxt, "invalid arg[0], i.e. invalid keys!");
    };
    ctxt->GetCbInfo(env, info, input);
    auto execute = [ctxt]() {
        auto calendar = reinterpret_cast<CalendarNapi*>(ctxt->native);
        CHECK_RETURN_VOID(calendar != nullptr, "CalendarNapi nullptr");
        auto nativeCalendar = calendar->GetNative();
        CHECK_RETURN_VOID(nativeCalendar != nullptr, "nativeCalendar nullptr");
        ctxt->count = nativeCalendar->AddEvents(ctxt->events);
        ctxt->status = (ctxt->count > 0) ? napi_ok : napi_generic_failure;
        CHECK_STATUS_RETURN_VOID(ctxt, "AddEvent failed!");
    };
    return NapiQueue::AsyncWork(env, ctxt, std::string(__FUNCTION__), execute);
}

napi_value CalendarNapi::DeleteEvent(napi_env env, napi_callback_info info)
{
    LOG_INFO("DeleteEvent");
    struct DeleteEventContext : public ContextBase {
        bool result;
        int eventId;
    };
    auto ctxt = std::make_shared<DeleteEventContext>();
    auto input = [env, ctxt](size_t argc, napi_value* argv) {
        // required atleast 1 arguments :: <number>
        CHECK_ARGS_RETURN_VOID(ctxt, argc == 1, "invalid arguments!");
        NapiUtil::GetValue(env, argv[0], ctxt->eventId);
        CHECK_STATUS_RETURN_VOID(ctxt, "invalid arg[0], i.e. invalid keys!");
    };
    ctxt->GetCbInfo(env, info, input);
    auto execute = [ctxt]() {
        auto calendar = reinterpret_cast<CalendarNapi*>(ctxt->native);
        CHECK_RETURN_VOID(calendar != nullptr, "CalendarNapi nullptr");
        auto nativeCalendar = calendar->GetNative();
        CHECK_RETURN_VOID(nativeCalendar != nullptr, "nativeCalendar nullptr");
        ctxt->result = nativeCalendar->DeleteEvent(ctxt->eventId);
    };
    return NapiQueue::AsyncWork(env, ctxt, std::string(__FUNCTION__), execute);
}

napi_value CalendarNapi::DeleteEvents(napi_env env, napi_callback_info info)
{
    LOG_INFO("DeleteEvents");
    struct DeleteEventsContext : public ContextBase {
        int result;
        std::vector<int> ids;
    };
    auto ctxt = std::make_shared<DeleteEventsContext>();
    auto input = [env, ctxt](size_t argc, napi_value* argv) {
        // required atleast 1 arguments :: <number>
        CHECK_ARGS_RETURN_VOID(ctxt, argc == 1, "invalid arguments!");
        NapiUtil::GetValue(env, argv[0], ctxt->ids);
        CHECK_STATUS_RETURN_VOID(ctxt, "invalid arg[0], i.e. invalid keys!");
    };
    ctxt->GetCbInfo(env, info, input);
    auto execute = [ctxt]() {
        auto calendar = reinterpret_cast<CalendarNapi*>(ctxt->native);
        CHECK_RETURN_VOID(calendar != nullptr, "CalendarNapi nullptr");
        auto nativeCalendar = calendar->GetNative();
        CHECK_RETURN_VOID(nativeCalendar != nullptr, "nativeCalendar nullptr");
        ctxt->result = nativeCalendar->DeleteEvents(ctxt->ids);
    };
    return NapiQueue::AsyncWork(env, ctxt, std::string(__FUNCTION__), execute);
}

napi_value CalendarNapi::UpdateEvent(napi_env env, napi_callback_info info)
{
    LOG_INFO("UpdateEvent");
    struct UpdateEventContext : public ContextBase {
        bool result;
        Event event;
    };
    auto ctxt = std::make_shared<UpdateEventContext>();
    auto input = [env, ctxt](size_t argc, napi_value* argv) {
        // required atleast 1 arguments :: <number>
        CHECK_ARGS_RETURN_VOID(ctxt, argc == 1, "invalid arguments!");
        NapiUtil::GetValue(env, argv[0], ctxt->event);
        CHECK_STATUS_RETURN_VOID(ctxt, "invalid arg[0], i.e. invalid keys!");
    };
    ctxt->GetCbInfo(env, info, input);
    auto execute = [ctxt]() {
        auto calendar = reinterpret_cast<CalendarNapi*>(ctxt->native);
        CHECK_RETURN_VOID(calendar != nullptr, "CalendarNapi nullptr");
        auto nativeCalendar = calendar->GetNative();
        CHECK_RETURN_VOID(nativeCalendar != nullptr, "nativeCalendar nullptr");
        ctxt->result = nativeCalendar->UpdateEvent(ctxt->event);
    };
    return NapiQueue::AsyncWork(env, ctxt, std::string(__FUNCTION__), execute);
}

napi_value CalendarNapi::UpdateEvents(napi_env env, napi_callback_info info)
{
    LOG_INFO("UpdateEvents");
    struct DeleteEventsContext : public ContextBase {
        int result;
        std::vector<Event> events;
        CalendarNapi *calendar;
    };
    auto ctxt = std::make_shared<DeleteEventsContext>();
    auto input = [env, ctxt](size_t argc, napi_value* argv) {
        // required atleast 1 arguments :: <number>
        CHECK_ARGS_RETURN_VOID(ctxt, argc == 1, "invalid arguments!");
        NapiUtil::GetValue(env, argv[0], ctxt->events);
        CHECK_STATUS_RETURN_VOID(ctxt, "invalid arg[0], i.e. invalid keys!");
    };
    ctxt->GetCbInfo(env, info, input);
    auto execute = [ctxt]() {
        auto calendar = reinterpret_cast<CalendarNapi*>(ctxt->native);
        CHECK_RETURN_VOID(calendar != nullptr, "CalendarNapi nullptr");
        auto nativeCalendar = calendar->GetNative();
        CHECK_RETURN_VOID(nativeCalendar != nullptr, "nativeCalendar nullptr");
        ctxt->result = nativeCalendar->UpdateEvents(ctxt->events);
    };
    return NapiQueue::AsyncWork(env, ctxt, std::string(__FUNCTION__), execute);
}

napi_value CalendarNapi::GetEvents(napi_env env, napi_callback_info info)
{
    struct GetEventsContext : public ContextBase {
        EventFilterNapi* eventFilter;
        std::vector<std::string> eventKeys;
        std::vector<Event> events;
    };
    auto ctxt = std::make_shared<GetEventsContext>();
    auto input = [env, ctxt](size_t argc, napi_value* argv) {
        CHECK_ARGS_RETURN_VOID(ctxt, argc <= 2, "invalid arguments!");
        if (argc >= 1) {
            napi_valuetype type = napi_undefined;
            napi_typeof(env, argv[0], &type);
            CHECK_ARGS_RETURN_VOID(ctxt, type == napi_object, "type error!");
            ctxt->status = NapiUtil::GetValue(env, argv[0], ctxt->eventFilter);
            CHECK_STATUS_RETURN_VOID(ctxt, "invalid arg[0], i.e. invalid keys!");
        }
        if (argc == 2) {
            // required atleast 2 arguments :: <eventKey>
            napi_valuetype type = napi_undefined;
            napi_typeof(env, argv[0], &type);
            ctxt->status = NapiUtil::GetValue(env, argv[1], ctxt->eventKeys);
            CHECK_STATUS_RETURN_VOID(ctxt, "invalid arg[1], i.e. invalid keys!");
        }
    };
    ctxt->GetCbInfo(env, info, input);

    auto execute = [ctxt]() {
        std::shared_ptr<Native::EventFilter> nativeFilter = nullptr;
        if (ctxt->eventFilter != nullptr) {
            nativeFilter = ctxt->eventFilter->GetNative();
        }
        auto calendar = reinterpret_cast<CalendarNapi*>(ctxt->native);
        CHECK_RETURN_VOID(calendar != nullptr, "CalendarNapi nullptr");
        auto nativeCalendar = calendar->GetNative();
        CHECK_RETURN_VOID(nativeCalendar != nullptr, "nativeCalendar nullptr");
        ctxt->events = nativeCalendar->GetEvents(nativeFilter, ctxt->eventKeys);
        ctxt->status = (true) ? napi_ok : napi_generic_failure;
        CHECK_STATUS_RETURN_VOID(ctxt, "GetEvents failed!");
    };
    auto output = [env, ctxt](napi_value& result) {
        ctxt->status = NapiUtil::SetValue(ctxt->env, ctxt->events, result);
        CHECK_STATUS_RETURN_VOID(ctxt, "output failed");
    };
    return NapiQueue::AsyncWork(env, ctxt, std::string(__FUNCTION__), execute, output);
}

napi_value CalendarNapi::GetConfig(napi_env env, napi_callback_info info)
{
    LOG_INFO("GetConfig");
    size_t argc = 0;
    napi_value thisVar = nullptr;
    auto status = napi_get_cb_info(env, info, &argc, nullptr, &thisVar, nullptr);
    if (status != napi_ok) {
        LOG_ERROR("GetConfig napi_get_cb_info failed %{public}d", status);
        return nullptr;
    }
    CalendarNapi *calendarNapi = nullptr;
    status = napi_unwrap(env, thisVar, (void **)&calendarNapi);
    if (status != napi_ok) {
        LOG_ERROR("GetConfig napi_unwrap failed %{public}d", status);
        return nullptr;
    }
    if (calendarNapi == nullptr) {
        LOG_ERROR("GetConfig reinterpret_cast failed");
        return nullptr;
    }
    auto nativeCalendar = calendarNapi->GetNative();
    CHECK_RETURN(nativeCalendar != nullptr, "GetConfig -> get nativeCalendar nullptr", nullptr);
    auto config = nativeCalendar->GetConfig();
    LOG_DEBUG("config.enableReminder:%{public}d", config.enableReminder.value_or(-1));
    if (std::get_if<1>(&config.color)) {
        LOG_DEBUG("config.color:%{public}s", std::to_string(std::get<1>(config.color)).c_str());
    } else {
        LOG_ERROR("config.color is null");
    }
    napi_value result;
    status = NapiUtil::SetValue(env, config, result);
    if (status != napi_ok) {
        LOG_ERROR("SetValue failed %{public}d", status);
        return nullptr;
    }
    return result;
}

napi_value CalendarNapi::SetConfig(napi_env env, napi_callback_info info)
{
    LOG_INFO("SetConfig");
    struct SetConfigContext : public ContextBase {
        int result;
        CalendarConfig config;
        CalendarNapi *calendar;
    };
    auto ctxt = std::make_shared<SetConfigContext>();
    auto input = [env, ctxt](size_t argc, napi_value* argv) {
        // required atleast 1 arguments :: <CalendarConfig>
        CHECK_ARGS_RETURN_VOID(ctxt, argc == 1, "invalid arguments!");
        NapiUtil::GetValue(env, argv[0], ctxt->config);
        CHECK_STATUS_RETURN_VOID(ctxt, "invalid arg[0], i.e. invalid config!");
    };
    ctxt->GetCbInfo(env, info, input);
    auto execute = [ctxt]() {
        auto calendar = reinterpret_cast<CalendarNapi*>(ctxt->native);
        CHECK_RETURN_VOID(calendar != nullptr, "CalendarNapi nullptr");
        auto nativeCalendar = calendar->GetNative();
        CHECK_RETURN_VOID(nativeCalendar != nullptr, "nativeCalendar nullptr");
        ctxt->result = nativeCalendar->SetConfig(ctxt->config);
    };
    return NapiQueue::AsyncWork(env, ctxt, std::string(__FUNCTION__), execute);
}

napi_value CalendarNapi::GetAccount(napi_env env, napi_callback_info info)
{
    LOG_INFO("GetAccount");
    size_t argc = 0;
    napi_value thisVar = nullptr;
    auto status = napi_get_cb_info(env, info, &argc, nullptr, &thisVar, nullptr);
    if (status != napi_ok) {
        LOG_ERROR("GetAccount napi_get_cb_info failed %{public}d", status);
        return nullptr;
    }
    CalendarNapi *calendarNapi = nullptr;
    status = napi_unwrap(env, thisVar, (void **)&calendarNapi);
    if (status != napi_ok) {
        LOG_ERROR("GetAccount napi_unwrap failed %{public}d", status);
        return nullptr;
    }
    if (calendarNapi == nullptr) {
        LOG_ERROR("GetAccount reinterpret_cast failed");
        return nullptr;
    }
    auto nativeCalendar = calendarNapi->GetNative();
    CHECK_RETURN(nativeCalendar != nullptr, "GetAccount -> get nativeCalendar nullptr", nullptr);
    auto account = nativeCalendar->GetAccount();
    LOG_DEBUG("account.name:%{public}s", account.name.c_str());
    LOG_DEBUG("account.type:%{public}s", account.type.c_str());
    if (account.displayName) {
        LOG_DEBUG("account.displayName:%{public}s", account.displayName.value().c_str());
    }
    napi_value result;
    status = NapiUtil::SetValue(env, account, result);
    if (status != napi_ok) {
        LOG_ERROR("SetValue failed %{public}d", status);
        return nullptr;
    }
    return result;
}

napi_value CalendarAccountConstructor(napi_env env, napi_callback_info info)
{
    napi_value thisArg = nullptr;
    void* data = nullptr;

    napi_get_cb_info(env, info, nullptr, nullptr, &thisArg, &data);

    napi_value global = nullptr;
    napi_get_global(env, &global);

    return thisArg;
}

static void CalendarAccountInit(napi_env env, napi_value exports)
{
    napi_value name = nullptr;
    napi_value type = nullptr;
    napi_value displayName = nullptr;

    napi_create_string_utf8(env, "name", NAPI_AUTO_LENGTH, &name);
    napi_create_string_utf8(env, "type", NAPI_AUTO_LENGTH, &type);
    napi_create_string_utf8(env, "displayName", NAPI_AUTO_LENGTH, &displayName);

    napi_property_descriptor calendarAccountProperties[] = {
        DECLARE_NAPI_PROPERTY("name", name),
        DECLARE_NAPI_PROPERTY("type", type),
        DECLARE_NAPI_PROPERTY("displayName", displayName),
    };
    napi_value result = nullptr;
    napi_define_class(env, "CalendarAccount", NAPI_AUTO_LENGTH, CalendarAccountConstructor, nullptr,
        sizeof(calendarAccountProperties) / sizeof(napi_property_descriptor), calendarAccountProperties, &result);
    napi_set_named_property(env, exports, "CalendarAccount", result);
}

napi_value CalendarNapi::Init(napi_env env, napi_value exports)
{
    auto status = napi_set_named_property(env, exports, "Calendar", CalendarNapi::Constructor(env));
    LOG_INFO("init Calendar %{public}d", status);
    CalendarAccountInit(env, exports);
    return exports;
}
}