/*
 * Copyright 2025 Palantir Technologies, Inc. All rights reserved.
 *
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

import type { ExperimentalDeclarativeEditInformation } from "./ExperimentalDeclarativeEditInformation.js";
import type { FunctionInputName } from "./FunctionInputName.js";
import type { FunctionRid } from "./FunctionRid.js";
import type { FunctionRuleCustomExecutionMode } from "./FunctionRuleCustomExecutionMode.js";
import type { FunctionVersion } from "./FunctionVersion.js";
import type { LogicRuleValue } from "./LogicRuleValue.js";

/**
 * A Function to be executed with action input parameters.
 */
export interface FunctionRule {
  functionRid: FunctionRid;
  functionVersion: FunctionVersion;
  functionInputValues: Record<FunctionInputName, LogicRuleValue>;
  customExecutionMode: FunctionRuleCustomExecutionMode | undefined;
  experimentalDeclarativeEditInformation:
    | ExperimentalDeclarativeEditInformation
    | undefined;
}
