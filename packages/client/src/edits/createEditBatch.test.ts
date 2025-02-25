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

import { Task } from "@osdk/client.test.ontology";
import { beforeEach, describe, expect, it } from "vitest";
import { createClientMockHelper } from "../observable/internal/testUtils.js";
import { createEditBatch } from "./createEditBatch.js";
import type { EditBatch } from "./EditBatch.js";
import type {
  AddLink,
  CreateObject,
  DeleteObject,
  RemoveLink,
  UpdateObject,
} from "./types.js";

type TestEditScope =
  | CreateObject<Task>
  | DeleteObject<Task>
  | UpdateObject<Task>
  | AddLink<Task, "RP">
  | RemoveLink<Task, "RP">;

describe(createEditBatch, () => {
  let editBatch: EditBatch<TestEditScope>;

  beforeEach(() => {
    editBatch = createEditBatch(createClientMockHelper().client);
  });

  it("collects all edits", () => {
    editBatch.create(Task, { id: 0, name: "My Task Name" });
    editBatch.create(Task, { id: 1, name: "My Other Task Name" });
    editBatch.delete({ apiName: "Task", id: 0 });
    editBatch.update({ apiName: "Task", id: 0 }, { name: "My New Task Name" });
    editBatch.create(Task, { id: 0, name: "My Task Name" });

    editBatch.link({ apiName: "Task", id: 0 }, "RP", {
      apiName: "Person",
      id: 0,
    });
    editBatch.link({ apiName: "Task", id: 0 }, "RP", {
      apiName: "Person",
      id: 1,
    });
    editBatch.unlink({ apiName: "Task", id: 0 }, "RP", {
      apiName: "Person",
      id: 1,
    });

    expect(editBatch.getEdits()).toEqual([
      {
        type: "createObject",
        obj: Task,
        properties: { id: 0, name: "My Task Name" },
      },
      {
        type: "createObject",
        obj: Task,
        properties: { id: 1, name: "My Other Task Name" },
      },
      { type: "deleteObject", obj: { apiName: "Task", id: 0 } },
      {
        type: "updateObject",
        obj: { apiName: "Task", id: 0 },
        properties: { name: "My New Task Name" },
      },
      {
        type: "createObject",
        obj: Task,
        properties: { id: 0, name: "My Task Name" },
      },
      {
        type: "addLink",
        apiName: "RP",
        source: { apiName: "Task", id: 0 },
        target: { apiName: "Person", id: 0 },
      },
      {
        type: "addLink",
        apiName: "RP",
        source: { apiName: "Task", id: 0 },
        target: { apiName: "Person", id: 1 },
      },
      {
        type: "removeLink",
        apiName: "RP",
        source: { apiName: "Task", id: 0 },
        target: { apiName: "Person", id: 1 },
      },
    ]);
  });
});
