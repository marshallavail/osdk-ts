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

import type { DataSetName } from "./blockdata/DataSetName.js";
import type { BranchId } from "./BranchId.js";
import type { ColumnName } from "./ColumnName.js";
import type { ObjectTypeFieldApiName } from "./ObjectTypeFieldApiName.js";

/**
 * Many to many link type datasource that is backed by a dataset in foundry, uniquely identified by its rid and
 * branch.
 */
export interface OntologyIrManyToManyLinkTypeDatasetDatasource {
  branchId: BranchId;
  datasetRid: DataSetName;
  objectTypeAPrimaryKeyMapping: Record<ObjectTypeFieldApiName, ColumnName>;
  objectTypeBPrimaryKeyMapping: Record<ObjectTypeFieldApiName, ColumnName>;
  writebackDatasetRid: DataSetName | undefined;
}
