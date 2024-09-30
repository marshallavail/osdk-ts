/*
 * Copyright 2024 Palantir Technologies, Inc. All rights reserved.
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

import { type ConjureContext, conjureFetch } from "conjure-lite";
import type { UpdateValueTypeRequest } from "../UpdateValueTypeRequest.js";
import type { ValueTypeRid } from "../ValueTypeRid.js";

/**
 * Updates an existing Value Type.
 */
export async function updateValueType(
  ctx: ConjureContext,
  valueTypeRid: ValueTypeRid,
  request: UpdateValueTypeRequest,
): Promise<void> {
  return conjureFetch(
    ctx,
    `/type-registry/value-types/${valueTypeRid}`,
    "PUT",
    request,
  );
}
