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

import type { InterfacePropertyNotFound } from "./InterfacePropertyNotFound.js";
import type { InvalidDataConstraintsError } from "./InvalidDataConstraintsError.js";
import type { InvalidIsIndexedForSearchError } from "./InvalidIsIndexedForSearchError.js";
import type { InvalidPropertyTypeError } from "./InvalidPropertyTypeError.js";
import type { InvalidTypeClassesError } from "./InvalidTypeClassesError.js";
import type { InvalidValueTypeError } from "./InvalidValueTypeError.js";
import type { MissingImplementingPropertyError } from "./MissingImplementingPropertyError.js";
export interface InvalidPropertyImplementationError_invalidPropertyType {
  type: "invalidPropertyType";
  invalidPropertyType: InvalidPropertyTypeError;
}

export interface InvalidPropertyImplementationError_invalidTypeClasses {
  type: "invalidTypeClasses";
  invalidTypeClasses: InvalidTypeClassesError;
}

export interface InvalidPropertyImplementationError_invalidDataConstraints {
  type: "invalidDataConstraints";
  invalidDataConstraints: InvalidDataConstraintsError;
}

export interface InvalidPropertyImplementationError_invalidValueType {
  type: "invalidValueType";
  invalidValueType: InvalidValueTypeError;
}

export interface InvalidPropertyImplementationError_invalidIsIndexedForSearch {
  type: "invalidIsIndexedForSearch";
  invalidIsIndexedForSearch: InvalidIsIndexedForSearchError;
}

export interface InvalidPropertyImplementationError_propertyIdNotFound {
  type: "propertyIdNotFound";
  propertyIdNotFound: MissingImplementingPropertyError;
}

export interface InvalidPropertyImplementationError_interfacePropertyNotFound {
  type: "interfacePropertyNotFound";
  interfacePropertyNotFound: InterfacePropertyNotFound;
}
export type InvalidPropertyImplementationError =
  | InvalidPropertyImplementationError_invalidPropertyType
  | InvalidPropertyImplementationError_invalidTypeClasses
  | InvalidPropertyImplementationError_invalidDataConstraints
  | InvalidPropertyImplementationError_invalidValueType
  | InvalidPropertyImplementationError_invalidIsIndexedForSearch
  | InvalidPropertyImplementationError_propertyIdNotFound
  | InvalidPropertyImplementationError_interfacePropertyNotFound;
