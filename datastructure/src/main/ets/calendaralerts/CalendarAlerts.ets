/**
 * @file Describe the file
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

interface CalendarAlertsType {
  id: number;
  eventId: number
  begin: number
  end: number
  alarmTime: number
  creationTime: number
  receivedTime: number
  notifyTime: number
  state: number
  minutes: number
  creator: string
}

/**
 * the structure of table CalendarAlerts
 *
 * @since 2022-09-19
 */
export class CalendarAlerts implements CalendarAlertsType {
  id = 0;
  eventId = 0;
  begin = 0;
  end = 0;
  alarmTime = 0;
  creationTime = 0;
  receivedTime = 0;
  notifyTime = 0;
  state = 0;
  minutes = 0;
  creator = '';
}