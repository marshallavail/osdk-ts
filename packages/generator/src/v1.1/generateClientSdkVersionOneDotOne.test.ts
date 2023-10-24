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

import { describe, expect, test } from "vitest";
import { compileThis } from "../util/test/compileThis";
import { createMockMinimalFiles } from "../util/test/createMockMinimalFiles";
import { TodoWireOntology } from "../util/test/TodoWireOntology";
import { generateClientSdkVersionOneDotOne } from "./generateClientSdkVersionOneDotOne";

describe("generator", () => {
  test("should be able to generate a project", async () => {
    const helper = createMockMinimalFiles();
    const BASE_PATH = "/foo";

    await generateClientSdkVersionOneDotOne(
      TodoWireOntology,
      helper.minimalFiles,
      BASE_PATH,
    );

    expect(helper.minimalFiles.writeFile).toBeCalled();
    helper.dumpFilesToConsole();

    expect(
      helper.getFiles()[`${BASE_PATH}/index.ts`],
    ).toMatchInlineSnapshot(`
      "// Path: /foo/index.ts
      export const ontologyRid = 'ridHere';
      "
    `);

    const diagnostics = compileThis(helper.getFiles(), BASE_PATH);
    for (const q of diagnostics) {
      console.error(
        `${q.file?.fileName}:${q.file?.getLineStarts()} ${q.messageText}`,
      );
    }

    expect(diagnostics).toHaveLength(0);
  });
});
