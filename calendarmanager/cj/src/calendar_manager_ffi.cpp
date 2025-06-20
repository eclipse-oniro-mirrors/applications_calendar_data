/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
#include "calendar_manager_ffi.h"
#include "cj_calendar_manager.h"
#include "cj_common_ffi.h"
#include "ffi_remote_data.h"
#include "cj_calendar.h"
#include "calendar_log.h"
#include "cj_event_filter.h"

extern "C" {
    void FfiOHOSGetCalendarManager(int64_t contextId, int32_t* errcode)
    {
        return OHOS::CalendarApi::CJCalendarManager::GetCalendarManager(contextId, errcode);
    }

    int64_t FfiOHOSCalendarManagerCreateCalendar(
        CCalendarAccount calendarAccount, int64_t* calendarId, int32_t* errcode)
    {
        return OHOS::CalendarApi::CJCalendarManager::CreateCalendar(calendarAccount, calendarId, errcode);
    }

    void FfiOHOSCalendarManagerdeleteCalendar(int64_t calendarId, int32_t* errcode)
    {
        return OHOS::CalendarApi::CJCalendarManager::DeleteCalendar(calendarId, errcode);
    }

    int64_t FfiOHOSCalendarManagerGetCalendar(CCalendarAccount calendarAccount, int64_t* calendarId, int32_t* errcode)
    {
        return OHOS::CalendarApi::CJCalendarManager::GetCalendar(calendarAccount, calendarId, errcode);
    }

    CArrI64 FfiOHOSCalendarManagerGetAllCalendars(int32_t* errcode)
    {
        return OHOS::CalendarApi::CJCalendarManager::GetAllCalendars(errcode);
    }

    int64_t FfiOHOSCalendarManagerEditerEvent(char* eventstr, int32_t* errcode)
    {
        return OHOS::CalendarApi::CJCalendarManager::EditerEvent(eventstr, errcode);
    }

    int64_t FfiOHOSCalendarAddEvent(int64_t id, CEvent event, int32_t* errcode)
    {
        auto instance = OHOS::FFI::FFIData::GetData<OHOS::CalendarApi::CJCalendar>(id);
        if (instance == nullptr) {
            LOG_ERROR("CJCalendar instance is nullptr");
            *errcode = CJ_ERR_ILLEGAL_INSTANCE;
            return -1;
        }
        return instance->AddEvent(event, errcode);
    }

    void FfiOHOSCalendarAddEvents(int64_t id, CArrEvents event, int32_t* errcode)
    {
        auto instance = OHOS::FFI::FFIData::GetData<OHOS::CalendarApi::CJCalendar>(id);
        if (instance == nullptr) {
            LOG_ERROR("CJCalendar instance is nullptr");
            *errcode = CJ_ERR_ILLEGAL_INSTANCE;
            return;
        }
        instance->AddEvents(event, errcode);
    }

    void FfiOHOSCalendarDeleteEvent(int64_t id, int64_t eventId, int32_t* errcode)
    {
        auto instance = OHOS::FFI::FFIData::GetData<OHOS::CalendarApi::CJCalendar>(id);
        if (instance == nullptr) {
            LOG_ERROR("CJCalendar instance is nullptr");
            *errcode = CJ_ERR_ILLEGAL_INSTANCE;
            return;
        }
        instance->DeleteEvent(eventId, errcode);
    }

    void FfiOHOSCalendarDeleteEvents(int64_t id, CArrI64 eventIds, int32_t* errcode)
    {
        auto instance = OHOS::FFI::FFIData::GetData<OHOS::CalendarApi::CJCalendar>(id);
        if (instance == nullptr) {
            LOG_ERROR("CJCalendar instance is nullptr");
            *errcode = CJ_ERR_ILLEGAL_INSTANCE;
            return;
        }
        instance->DeleteEvents(eventIds, errcode);
    }

    void FfiOHOSCalendarUpdateEvent(int64_t id, CEvent event, int32_t* errcode)
    {
        auto instance = OHOS::FFI::FFIData::GetData<OHOS::CalendarApi::CJCalendar>(id);
        if (instance == nullptr) {
            LOG_ERROR("CJCalendar instance is nullptr");
            *errcode = CJ_ERR_ILLEGAL_INSTANCE;
            return;
        }
        instance->UpdateEvent(event, errcode);
    }

    CArrEvents FfiOHOSCalendarGetEvents(int64_t id, int64_t eventFilterId, CArrString eventKey, int32_t* errcode)
    {
        CArrEvents arr;
        auto instance = OHOS::FFI::FFIData::GetData<OHOS::CalendarApi::CJCalendar>(id);
        if (instance == nullptr) {
            LOG_ERROR("CJCalendar instance is nullptr");
            *errcode = CJ_ERR_ILLEGAL_INSTANCE;
            return arr;
        }
        return instance->GetEvents(eventFilterId, eventKey, errcode);
    }

    CCalendarConfig FfiOHOSCalendarGetConfig(int64_t id, int32_t* errcode)
    {
        CCalendarConfig config;
        auto instance = OHOS::FFI::FFIData::GetData<OHOS::CalendarApi::CJCalendar>(id);
        if (instance == nullptr) {
            LOG_ERROR("CJCalendar instance is nullptr");
            *errcode = CJ_ERR_ILLEGAL_INSTANCE;
            return config;
        }
        return instance->GetConfig(errcode);
    }

    void FfiOHOSCalendarSetConfig(int64_t id, CCalendarConfig cCalendarConfig, int32_t* errcode)
    {
        auto instance = OHOS::FFI::FFIData::GetData<OHOS::CalendarApi::CJCalendar>(id);
        if (instance == nullptr) {
            LOG_ERROR("CJCalendar instance is nullptr");
            *errcode = CJ_ERR_ILLEGAL_INSTANCE;
            return;
        }
        instance->SetConfig(cCalendarConfig, errcode);
    }

    CCalendarAccount FfiOHOSCalendarGetAccount(int64_t id, int32_t* errcode)
    {
        CCalendarAccount account;
        auto instance = OHOS::FFI::FFIData::GetData<OHOS::CalendarApi::CJCalendar>(id);
        if (instance == nullptr) {
            LOG_ERROR("CJCalendar instance is nullptr");
            *errcode = CJ_ERR_ILLEGAL_INSTANCE;
            return account;
        }
        return instance->GetAccount(errcode);
    }

    int64_t FfiOHOSEventFilterFilterById(CArrI64 idsCArr, int32_t* errcode)
    {
        return OHOS::CalendarApi::CJEventFilter::FilterById(idsCArr, errcode);
    }

    int64_t FfiOHOSEventFilterFilterByTime(int64_t startTime, int64_t end, int32_t* errcode)
    {
        return OHOS::CalendarApi::CJEventFilter::FilterByTime(startTime, end, errcode);
    }
    
    int64_t FfiOHOSEventFilterFilterByTitle(char* title, int32_t* errcode)
    {
        return OHOS::CalendarApi::CJEventFilter::FilterByTitle(title, errcode);
    }
}
