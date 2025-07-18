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
#ifndef OHOS_CALENDAR_ENV_NAPI_H
#define OHOS_CALENDAR_ENV_NAPI_H

#include "napi/native_api.h"
#include "napi/native_common.h"
#include "napi/native_node_api.h"
#include "ability.h"
#include "ability_context.h"
#include "singleton.h"

namespace OHOS::CalendarApi {
class CalendarEnvNapi : public OHOS::Singleton<CalendarEnvNapi> {
public:
    void Init(napi_env env, napi_value value);
    std::shared_ptr<OHOS::AbilityRuntime::Context> getContext();
private:
    napi_status GetContext(napi_env env, napi_value value);
    std::shared_ptr<OHOS::AbilityRuntime::Context> m_context;
};
} // namespace Calendar::CalendarApi
#endif