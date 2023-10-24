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

import type { PropertyDefinition } from "@osdk/api";
import type { PropertyV2 } from "@osdk/gateway/types";

export function wirePropertyV2ToSdkPropertyDefinition(
  input: PropertyV2,
): PropertyDefinition {
  switch (input.dataType.type) {
    case "string":
    case "boolean": {
      return {
        type: input.dataType.type,
        // TODO: These wire objects don't have nullable, readonly
      };
    }
    default: {
      throw new Error(
        `Not implemented: wirePropertyToSdkPropertyDefinition(${input.dataType.type})`,
      );
    }
  }
}
