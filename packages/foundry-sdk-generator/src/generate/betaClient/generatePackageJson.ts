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

import { writeFile } from "fs/promises";
import { join } from "path";

export async function generatePackageJson(options: {
  packageName: string;
  packageVersion: string;
  packagePath: string;
  dependencies?: Array<{ dependencyName: string; dependencyVersion: string }>;
  peerDependencies?: Array<
    { dependencyName: string; dependencyVersion: string }
  >;
  beta: boolean;
}): Promise<
  {
    name: string;
    version: string;
    dependencies: { [dependencyName: string]: string } | undefined;
    peerDependencies: { [dependencyName: string]: string } | undefined;
    type: string;
  }
> {
  const packageDeps = constructDependencies(options.dependencies);
  const packagePeerDeps = constructDependencies(options.peerDependencies);

  // Note that any "default" conditions _must_ be last in their block otherwise it will crash at runtime
  const packageJson = {
    name: options.packageName,
    version: options.packageVersion,
    main: "./cjs/index.js",
    types: "./cjs/index.d.ts",
    exports: {
      ".": {
        script: {
          types: "./dist/bundle/index.d.mts",
          default: "./dist/bundle/index.mjs",
        },
        require: {
          types: "./cjs/index.d.ts",
          default: "./cjs/index.js",
        },
        import: {
          types: "./esm/index.d.ts",
          default: "./esm/index.js",
        },
        types: "./cjs/index.d.ts",
        default: "./cjs/index.js",
      },
    },
    dependencies: packageDeps,
    peerDependencies: packagePeerDeps,
    type: "commonjs",
  };

  await writeFile(
    join(options.packagePath, "package.json"),
    JSON.stringify(packageJson, undefined, 4),
  );

  return packageJson;
}

function constructDependencies(
  dependencies: {
    dependencyName: string;
    dependencyVersion: string;
  }[] | undefined,
) {
  return dependencies?.reduce((acc, value) => {
    acc[value.dependencyName] = value.dependencyVersion;
    return acc;
  }, {} as { [dependencyName: string]: string });
}
