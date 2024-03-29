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
#include <sstream>
#include "calendar_log.h"
#include "native_util.h"

namespace OHOS::CalendarApi::Native {
void DumpCalendarAccount(const CalendarAccount &account)
{
    LOG_DEBUG("account.name:%{public}s", account.name.c_str());
    LOG_DEBUG("account.type:%{public}s", account.type.c_str());
    LOG_DEBUG("account.displayName:%{public}s", account.displayName.value_or("").c_str());
}

void DumpEvent(const Event &event)
{
    LOG_DEBUG("id       :%{public}d", event.id.value_or(-1));
    LOG_DEBUG("type     :%{public}d", event.type);
    LOG_DEBUG("title    :%{public}s", event.title.value_or("[null]").c_str());
    if (event.location) {
        auto location = event.location.value();
        LOG_DEBUG("location.location  :%{public}s", location.location.value_or("[null]").c_str());
        LOG_DEBUG("location.longitude :%{public}d", location.longitude.value_or(-1));
        LOG_DEBUG("location.latitude  :%{public}d", location.latitude.value_or(-1));
    } else {
        LOG_DEBUG("location [null]");
    }
    if (event.service) {
        auto service = event.service.value();
        LOG_DEBUG("service.type  :%{public}s", service.type.c_str());
        LOG_DEBUG("service.description :%{public}s", service.description.value_or("[null]").c_str());
        LOG_DEBUG("service.uri  :%{public}s", service.uri.c_str());
    } else {
        LOG_DEBUG("service [null]");
    }
    LOG_DEBUG("title    :%{public}s", event.title.value_or("").c_str());
    LOG_DEBUG("startTime    :%{public}s", std::to_string(event.startTime).c_str());
    LOG_DEBUG("endTime      :%{public}s", std::to_string(event.endTime).c_str());
    LOG_DEBUG("isAllDay :%{public}d", event.isAllDay.value_or(0));

    for (const auto &attendee : event.attendees) {
        LOG_DEBUG("attendee.name   :%{public}s", attendee.name.c_str());
        LOG_DEBUG("attendee.email  :%{public}s", attendee.email.c_str());
    }

    LOG_DEBUG("timeZone     :%{public}s", event.timeZone.value_or("[null]").c_str());
    LOG_DEBUG("description  :%{public}s", event.description.value_or("[null]").c_str());
}

void BuildEventLocation(DataShare::DataShareValuesBucket &valuesBucket, const Event &event)
{
    if (!event.location) {
        return;
    }
    auto location = event.location.value();
    if (location.location) {
        valuesBucket.Put("eventLocation", location.location.value());
    }
    if (location.longitude) {
        // longitude is string in db
        valuesBucket.Put("location_longitude", std::to_string(location.longitude.value()));
    }
    if (location.latitude) {
        // latitude is string in db
        valuesBucket.Put("location_latitude", std::to_string(location.latitude.value()));
    }
}

void BuildEventService(DataShare::DataShareValuesBucket &valuesBucket, const Event &event)
{
    if (!event.service) {
        return;
    }
    const auto service = event.service.value();
    if (service.description) {
        valuesBucket.Put("service_description", service.description.value());
    }
    valuesBucket.Put("service_type", service.type);
    valuesBucket.Put("service_cp_bz_uri", service.uri);
}

DataShare::DataShareValuesBucket BuildValueEvent(const Event &event, int calendarId)
{
    DataShare::DataShareValuesBucket valuesBucket;
    valuesBucket.Put("calendar_id", calendarId);

    LOG_DEBUG("title %{public}s", event.title.value_or("").c_str());
    valuesBucket.Put("title", event.title.value_or(""));
    valuesBucket.Put("event_calendar_type", event.type);
    valuesBucket.Put("dtstart", event.startTime);
    valuesBucket.Put("dtend", event.endTime);

    BuildEventLocation(valuesBucket, event);
    BuildEventService(valuesBucket, event);
    
    LOG_DEBUG("description %{public}s", event.description.value_or("").c_str());

    if (event.description.has_value()) {
        valuesBucket.Put("description", event.description.value());
    }
    if (event.timeZone.has_value()) {
        valuesBucket.Put("eventTimezone", event.timeZone.value());
    }
    if (event.isAllDay.has_value()) {
        valuesBucket.Put("allDay", event.isAllDay.value());
    }
    return valuesBucket;
}

DataShare::DataShareValuesBucket BuildAttendeeValue(const Attendee &attendee, int eventId)
{
    DataShare::DataShareValuesBucket valuesBucket;
    valuesBucket.Put("event_id", eventId);
    valuesBucket.Put("attendeeName", attendee.name);
    LOG_DEBUG("attendeeName %{public}s", attendee.name.c_str());
    valuesBucket.Put("attendeeEmail", attendee.email);
    LOG_DEBUG("attendeeEmail %{public}s", attendee.email.c_str());
    return valuesBucket;
}

int GetValue(DataShareResultSetPtr &resultSet, string_view fieldName, int& out)
{
    int index = 0;
    auto ret = resultSet->GetColumnIndex(string(fieldName), index);
    if (ret != DataShare::E_OK) {
        return ret;
    }
    return resultSet->GetInt(index, out);
}

int GetIndexValue(const DataShareResultSetPtr &resultSet, int index, std::string& out)
{
    return resultSet->GetString(index, out);
}

int GetIndexValue(const DataShareResultSetPtr &resultSet, int index, int& out)
{
    return resultSet->GetInt(index, out);
}

int GetIndexValue(const DataShareResultSetPtr &resultSet, int index, int64_t& out)
{
    return resultSet->GetLong(index, out);
}

int GetValue(DataShareResultSetPtr &resultSet, string_view fieldName, std::string& out)
{
    int index = 0;
    auto fieldNameStr = string(fieldName);
    auto ret = resultSet->GetColumnIndex(fieldNameStr, index);
    if (ret != DataShare::E_OK) {
        LOG_WARN("GetValue [%{public}s] failed [%{public}d]", fieldNameStr.c_str(), ret);
        return ret;
    }
    return resultSet->GetString(index, out);
}


std::vector<std::shared_ptr<Calendar>> ResultSetToCalendars(DataShareResultSetPtr &resultSet)
{
    std::vector<std::shared_ptr<Calendar>> result;
    int rowCount = 0;
    resultSet->GetRowCount(rowCount);
    LOG_INFO("GetRowCount is %{public}d", rowCount);
    if (rowCount == 0) {
        return result;
    }
    auto err = resultSet->GoToFirstRow();
    if (err != DataShare::E_OK) {
        LOG_INFO("Failed GoToFirstRow %{public}d", err);
        return result;
    }
    do {
        int idValue = -1;
        if (GetValue(resultSet, "_id", idValue) != DataShare::E_OK) {
            break;
        }
        LOG_DEBUG("id: %{public}d", idValue);
        std::string nameValue;
        if (GetValue(resultSet, "account_name", nameValue) != DataShare::E_OK) {
            break;
        }
        LOG_DEBUG("account_name: %{public}s", nameValue.c_str());
        std::string typeValue;
        if (GetValue(resultSet, "account_type", typeValue) != DataShare::E_OK) {
            break;
        }
        LOG_DEBUG("account_type: %{public}s", typeValue.c_str());

        std::string displayNameValue;
        GetValue(resultSet, "calendar_displayName", displayNameValue);
        LOG_DEBUG("calendar_displayName: %{public}s", displayNameValue.c_str());

        int canReminder = -1;
        GetValue(resultSet, "canReminder", canReminder);
        LOG_DEBUG("canReminder: %{public}d", canReminder);

        int colorValue = 0;
        GetValue(resultSet, "calendar_color", colorValue);
        CalendarAccount curAccount {nameValue, typeValue, displayNameValue};
        result.emplace_back(std::make_shared<Calendar>(curAccount, idValue));
    } while (resultSet->GoToNextRow() == DataShare::E_OK);
    return result;
}


std::optional<Location> ResultSetToLocation(DataShareResultSetPtr &resultSet)
{
    Location out;
    string value;
    auto ret = GetValue(resultSet, "eventLocation", value);
    out.location = std::make_optional<string>(value);
    ret = GetValue(resultSet, "location_longitude", value);
    int longitudeValue = -1;
    std::stringstream str2digit;
    str2digit << value;
    str2digit >> longitudeValue;
    if (longitudeValue != -1) {
        out.longitude = std::make_optional<int>(longitudeValue);
    }
    ret = GetValue(resultSet, "location_latitude", value);
    int latitudeValue = -1;
    str2digit.clear();
    str2digit << value;
    str2digit >> latitudeValue;
    if (latitudeValue != -1) {
        out.latitude = std::make_optional<int>(latitudeValue);
    }
    
    if (ret != DataShare::E_OK) {
        return std::nullopt;
    }
    return std::make_optional<Location>(out);
}

std::optional<EventService> ResultSetToEventService(DataShareResultSetPtr &resultSet)
{
    EventService out;
    string value;
    auto ret = GetValue(resultSet, "service_type", value);
    if (ret != DataShare::E_OK) {
        return std::nullopt;
    }
    const std::set<std::string> serviceType = {"Meeting", "Watching", "Repayment", "Live", "Shopping",
                                               "Trip", "Class", "SportsEvents", "SportsExercise"};
    if (serviceType.count(value)) {
        out.type = value;
    } else {
        return std::nullopt;
    }
    ret = GetValue(resultSet, "service_cp_bz_uri", value);
    if (ret != DataShare::E_OK) {
        return std::nullopt;
    }
    out.uri = value;
    ret = GetValue(resultSet, "service_description", value);
    if (ret == DataShare::E_OK) {
        out.description = std::make_optional<string>(value);
    }
    return std::make_optional<EventService>(out);
}

void ResultSetToEvent(Event &event, DataShareResultSetPtr &resultSet, const std::set<std::string>& columns)
{
    GetValueOptional(resultSet, "_id", event.id);
    if (columns.count("type")) {
        int type = 0;
        GetValue(resultSet, "event_calendar_type", type);
        event.type = static_cast<EventType>(type);
    }
    if (columns.count("title")) {
        GetValueOptional(resultSet, "title", event.title);
    }
    if (columns.count("startTime")) {
        LOG_DEBUG("TLQ get startTime");
        GetValue(resultSet, "dtstart", event.startTime);
    }
    if (columns.count("endTime")) {
        LOG_DEBUG("TLQ get endTime");
        GetValue(resultSet, "dtend", event.endTime);
    }
    if (columns.count("isAllDay")) {
        int isAllDay = 0;
        GetValue(resultSet, "allDay", isAllDay);
        event.isAllDay = static_cast<bool>(isAllDay);
    }
    if (columns.count("description")) {
        GetValueOptional(resultSet, "description", event.description);
    }
    if (columns.count("timeZone")) {
        GetValueOptional(resultSet, "eventTimezone", event.timeZone);
    }
    if (columns.count("location")) {
        event.location = ResultSetToLocation(resultSet);
    }
    if (columns.count("service")) {
        event.service = ResultSetToEventService(resultSet);
    }
}

int ResultSetToEvents(std::vector<Event> &events, DataShareResultSetPtr &resultSet,
    const std::set<std::string>& columns)
{
    int rowCount = 0;
    resultSet->GetRowCount(rowCount);
    LOG_INFO("GetRowCount is %{public}d", rowCount);
    if (rowCount <= 0) {
        return -1;
    }
    auto err = resultSet->GoToFirstRow();
    if (err != DataShare::E_OK) {
        LOG_ERROR("Failed GoToFirstRow %{public}d", err);
        return -1;
    }
    do {
        Event event;
        ResultSetToEvent(event, resultSet, columns);
        events.emplace_back(event);
    } while (resultSet->GoToNextRow() == DataShare::E_OK);
    return 0;
}

int ResultSetToAttendees(std::vector<Attendee> &attendees, DataShareResultSetPtr &resultSet)
{
    int rowCount = 0;
    resultSet->GetRowCount(rowCount);
    LOG_INFO("GetRowCount is %{public}d", rowCount);
    if (rowCount <= 0) {
        return -1;
    }
    auto err = resultSet->GoToFirstRow();
    if (err != DataShare::E_OK) {
        LOG_ERROR("Failed GoToFirstRow %{public}d", err);
        return -1;
    }
    do {
        Attendee attendee;
        GetValue(resultSet, "attendeeName", attendee.name);
        GetValue(resultSet, "attendeeEmail", attendee.email);
        attendees.emplace_back(attendee);
    } while (resultSet->GoToNextRow() == DataShare::E_OK);
    return 0;
}

int ResultSetToReminders(std::vector<int> &reminders, DataShareResultSetPtr &resultSet)
{
    int rowCount = 0;
    resultSet->GetRowCount(rowCount);
    LOG_INFO("GetRowCount is %{public}d", rowCount);
    if (rowCount <= 0) {
        return -1;
    }
    auto err = resultSet->GoToFirstRow();
    if (err != DataShare::E_OK) {
        LOG_ERROR("Failed GoToFirstRow %{public}d", err);
        return -1;
    }
    do {
        int minutes;
        GetValue(resultSet, "minutes", minutes);
        reminders.emplace_back(minutes);
    } while (resultSet->GoToNextRow() == DataShare::E_OK);
    return 0;
}

bool IsValidHexString(const std::string& colorStr)
{
    if (colorStr.empty()) {
        return false;
    }
    for (char ch : colorStr) {
        if ((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'f') || (ch >= 'A' && ch <= 'F')) {
            continue;
        }
        return false;
    }
    return true;
}

bool ColorParse(const std::string& colorStr, variant<string, int64_t>& colorValue)
{
    if (colorStr.empty()) {
        LOG_ERROR("color string is empty");
        return false;
    }

    if (colorStr[0] != '#') { // start with '#'
        LOG_ERROR("color string not start with #");
        return false;
    }

    const int rgbLen = 7;
    const int argbLen = 9;
    if (colorStr.size() != rgbLen && colorStr.size() != argbLen) {
        LOG_ERROR("color string length is not 7 or 9");
        return false;
    }

    std::string colorStrSub = colorStr.substr(1);
    if (!IsValidHexString(colorStrSub)) {
        LOG_DEBUG("color string is not valid hex string");
        return false;
    }

    LOG_DEBUG("color string size is 7 or 9");
    colorValue.emplace<1>(std::stoll(colorStrSub, NULL, 16)); // 16 is convert hex string to number
    if (std::get_if<1>(&colorValue)) {
        LOG_DEBUG("colorStrSub -> colorValue colorValue:%{public}s", std::to_string(std::get<1>(colorValue)).c_str());
        return true;
    }
    LOG_DEBUG("color is null");
    return false;
}

void setField(const std::vector<string>& eventKey, std::vector<string>& queryField, std::set<string>& resultSetField)
{
    const std::map<string, string> eventField = { { "id", "_id" },
                                                  { "type", "event_calendar_type" },
                                                  { "title", "title" },
                                                  { "startTime", "dtstart" },
                                                  { "endTime", "dtend" },
                                                  { "isAllDay", "allDay" },
                                                  { "timeZone", "eventTimezone" },
                                                  { "description", "description" } };
    for (const auto& field : eventKey) {
        if (field == "location") {
            queryField.emplace_back("eventLocation");
            queryField.emplace_back("location_longitude");
            queryField.emplace_back("location_latitude");
            resultSetField.insert(field);
            continue;
        }
        if (field == "service") {
            queryField.emplace_back("service_type");
            queryField.emplace_back("service_cp_bz_uri");
            queryField.emplace_back("service_description");
            resultSetField.insert(field);
            continue;
        }
        if (field == "attendee") {
            resultSetField.insert(field);
            continue;
        }
        if (field == "reminderTime") {
            resultSetField.insert(field);
            continue;
        }
        if (field == "id") {
            continue;
        }
        queryField.emplace_back(eventField.at(field));
        resultSetField.insert(field);
    }
}
}