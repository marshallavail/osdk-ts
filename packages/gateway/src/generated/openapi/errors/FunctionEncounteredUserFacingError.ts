/*
 * Copyright 2023 Palantir Technologies, Inc. All rights reserved.
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

import type { FunctionRid } from "../components/FunctionRid.js";
import type { FunctionVersion } from "../components/FunctionVersion.js";

/**
 * The authored function failed to execute because of a user induced error. The message argument
 * is meant to be displayed to the user.
 */
export interface FunctionEncounteredUserFacingError {
  errorCode: "INVALID_ARGUMENT";
  errorName: "FunctionEncounteredUserFacingError";
  errorInstanceId: string;
  parameters: {
    functionRid: FunctionRid;
    functionVersion: FunctionVersion;
    message: string;
  };
}
