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

import type { MustBeEmpty } from "./MustBeEmpty.js";
import type { OntologyIrParameterObjectTypeReference } from "./OntologyIrParameterObjectTypeReference.js";
export interface OntologyIrParameterObjectTypeReferenceOrEmpty_empty {
  type: "empty";
  empty: MustBeEmpty;
}

export interface OntologyIrParameterObjectTypeReferenceOrEmpty_objectTypeReference {
  type: "objectTypeReference";
  objectTypeReference: OntologyIrParameterObjectTypeReference;
}
export type OntologyIrParameterObjectTypeReferenceOrEmpty =
  | OntologyIrParameterObjectTypeReferenceOrEmpty_empty
  | OntologyIrParameterObjectTypeReferenceOrEmpty_objectTypeReference;
