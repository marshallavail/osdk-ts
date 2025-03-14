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

import type { ObjectMetadata } from "@osdk/api";
import type { ObjectTypeFullMetadata } from "@osdk/foundry.ontologies";
import { wireObjectTypeFullMetadataToSdkObjectMetadata } from "@osdk/generator-converters";
import { deleteUndefineds } from "../util/deleteUndefineds.js";
import type { EnhanceCommon } from "./EnhanceCommon.js";
import { EnhancedBase } from "./EnhancedBase.js";

export class EnhancedObjectType extends EnhancedBase<ObjectTypeFullMetadata> {
  constructor(common: EnhanceCommon, public raw: ObjectTypeFullMetadata) {
    super(common, raw, raw.objectType.apiName, "./ontology/objects");
  }

  getDefinitionIdentifier(v2: boolean): string {
    return v2 ? this.shortApiName : `${this.shortApiName}Def`;
  }

  getImportedDefinitionIdentifier(v2: boolean): string {
    return this.getDefinitionIdentifier(v2);
  }

  getCleanedUpDefinition(v2: boolean): ObjectMetadata {
    return deleteUndefineds(
      wireObjectTypeFullMetadataToSdkObjectMetadata(
        this.raw,
        v2,
      ),
    );
  }
}
