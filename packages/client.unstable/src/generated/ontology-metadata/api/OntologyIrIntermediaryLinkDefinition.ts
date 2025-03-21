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

import type { LinkTypeMetadata } from "./LinkTypeMetadata.js";
import type { LinkTypeRid } from "./LinkTypeRid.js";
import type { ObjectTypeApiName } from "./ObjectTypeApiName.js";

/**
 * Represents a link between two ObjectTypes with an intermediary ObjectType acting as a bridge.
 * This LinkType can be used to jump from ObjectType A to B without specifying two separate search-arounds.
 * This LinkType can also be used to simulate a ManyToMany LinkType backed by an RV, or a ManyToMany LinkType
 * with properties.
 *
 * If any special interaction is required on the intermediary ObjectType (for example filtering) the two
 * connecting LinkTypes should be used instead.
 */
export interface OntologyIrIntermediaryLinkDefinition {
  objectTypeAToBLinkMetadata: LinkTypeMetadata;
  objectTypeBToALinkMetadata: LinkTypeMetadata;
  intermediaryObjectTypeRid: ObjectTypeApiName;
  objectTypeRidA: ObjectTypeApiName;
  objectTypeRidB: ObjectTypeApiName;
  aToIntermediaryLinkTypeRid: LinkTypeRid;
  intermediaryToBLinkTypeRid: LinkTypeRid;
}
