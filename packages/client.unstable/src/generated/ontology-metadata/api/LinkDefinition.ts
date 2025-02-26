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

import type { IntermediaryLinkDefinition } from "./IntermediaryLinkDefinition.js";
import type { ManyToManyLinkDefinition } from "./ManyToManyLinkDefinition.js";
import type { OneToManyLinkDefinition } from "./OneToManyLinkDefinition.js";
export interface LinkDefinition_manyToMany {
  type: "manyToMany";
  manyToMany: ManyToManyLinkDefinition;
}

export interface LinkDefinition_oneToMany {
  type: "oneToMany";
  oneToMany: OneToManyLinkDefinition;
}

export interface LinkDefinition_intermediary {
  type: "intermediary";
  intermediary: IntermediaryLinkDefinition;
}
export type LinkDefinition =
  | LinkDefinition_manyToMany
  | LinkDefinition_oneToMany
  | LinkDefinition_intermediary;
