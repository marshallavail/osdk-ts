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

import type { ObjectTypeApiName } from "../ObjectTypeApiName.js";
import type { OntologyVersion } from "../OntologyVersion.js";
import type { BackupId } from "./BackupId.js";

/**
 * Contains the information that can be used to restore patches that were deleted by mistake.
 */
export interface OntologyIrPatchBackup {
  backupId: BackupId;
  objectTypeRid: ObjectTypeApiName;
  ontologyVersion: OntologyVersion;
}
