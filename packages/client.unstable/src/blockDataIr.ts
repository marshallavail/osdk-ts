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

import type { ArrayPropertyType } from "./generated/ontology-metadata/api/ArrayPropertyType.js";
import type {
  InterfaceTypeBlockDataV2,
  OntologyBlockDataV2,
  OntologyIrObjectTypeBlockDataV2,
  SharedPropertyTypeBlockDataV2,
} from "./generated/ontology-metadata/api/blockdata/index.js";
import type { InterfaceLinkType } from "./generated/ontology-metadata/api/InterfaceLinkType.js";
import type { InterfaceType } from "./generated/ontology-metadata/api/InterfaceType.js";
import type { SharedPropertyType } from "./generated/ontology-metadata/api/SharedPropertyType.js";
import type { StructFieldType } from "./generated/ontology-metadata/api/StructFieldType.js";
import type { StructPropertyType } from "./generated/ontology-metadata/api/StructPropertyType.js";
import type {
  Type,
  Type_array,
  Type_struct,
} from "./generated/ontology-metadata/api/Type.js";
import type { BaseType } from "./generated/type-registry/api/BaseType.js";
import type { ExampleValue } from "./generated/type-registry/api/ExampleValue.js";
import type { ValueTypeApiName } from "./generated/type-registry/api/ValueTypeApiName.js";
import type { ValueTypeDataConstraint } from "./generated/type-registry/api/ValueTypeDataConstraint.js";
import type { ValueTypeDisplayMetadata } from "./generated/type-registry/api/ValueTypeDisplayMetadata.js";
import type { ValueTypeStatus } from "./generated/type-registry/api/ValueTypeStatus.js";
import type { ValueTypeVersion } from "./generated/type-registry/api/ValueTypeVersion.js";

export type InterfaceTypeApiName = string;
export type ObjectTypeFieldApiName = string;
export type InterfaceLinkTypeApiName = string;

export interface OntologyIr {
  blockData: OntologyIrOntologyBlockDataV2;
  importedTypes: ImportedTypes;
}

export interface OntologyIrOntologyBlockDataV2 extends
  ReplaceKeys<
    Omit<
      OntologyBlockDataV2,
      | "knownIdentifiers"
      | "linkTypes"
      | "ruleSets"
      | "actionTypes"
      | "blockOutputCompassLocations"
    >,
    {
      objectTypes: Record<string, OntologyIrObjectTypeBlockDataV2>;
      interfaceTypes: Record<string, OntologyIrInterfaceTypeBlockDataV2>;
      sharedPropertyTypes: Record<
        string,
        OntologyIrSharedPropertyTypeBlockDataV2
      >;
    }
  >
{
}

export interface OntologyIrInterfaceType
  extends
    ReplaceKeys<Omit<InterfaceType, "rid">, {
      properties: OntologyIrSharedPropertyType[];
      allProperties: OntologyIrSharedPropertyType[];
      extendsInterfaces: string[];
      allExtendsInterfaces: string[];
      links: OntologyIrInterfaceLinkType[];
      allLinks: OntologyIrInterfaceLinkType[];
    }>
{}

export type ApiNameValueTypeReference = {
  apiName: ValueTypeApiName;
  version: ValueTypeVersion;
};

export interface OntologyIrSharedPropertyType
  extends
    ReplaceKeys<Omit<SharedPropertyType, "rid" | "valueType">, {
      type: OntologyIrType;
    }>
{
  valueType?: ApiNameValueTypeReference;
}

export type OntologyIrType = Exclude<Type, Type_struct | Type_array> | {
  type: "struct";
  struct: OntologyIrStructPropertyType;
} | { type: "array"; array: OntologyIrArrayPropertyType };

export type OntologyIrArrayPropertyType = ReplaceKeys<
  ArrayPropertyType,
  { subtype: OntologyIrType }
>;

export type OntologyIrStructPropertyType = ReplaceKeys<
  StructPropertyType,
  { structFields: Array<OntologyIrStructFieldType> }
>;

export type OntologyIrStructFieldType = ReplaceKeys<
  Omit<StructFieldType, "structFieldRid">,
  { fieldType: OntologyIrType }
>;

export interface OntologyIrInterfaceLinkType
  extends Omit<InterfaceLinkType, "rid">
{}

export interface OntologyIrInterfaceTypeBlockDataV2 extends
  ReplaceKeys<
    InterfaceTypeBlockDataV2,
    {
      interfaceType: OntologyIrInterfaceType;
    }
  >
{}

export interface OntologyIrSharedPropertyTypeBlockDataV2 extends
  ReplaceKeys<
    SharedPropertyTypeBlockDataV2,
    {
      sharedPropertyType: OntologyIrSharedPropertyType;
    }
  >
{}

type ReplaceKeys<T, Z extends { [K in keyof T]?: unknown }> = {
  [K in keyof T]: K extends keyof Z ? Z[K] : T[K];
};

export type OntologyIrPackagedValueType = {
  version: ValueTypeVersion;
  baseType: BaseType;
  constraints: ValueTypeDataConstraint[];
  exampleValues: ExampleValue[];
};

export type OntologyIrPackagedValueTypeMetadata = {
  apiName: ValueTypeApiName;
  displayMetadata: ValueTypeDisplayMetadata;
  status: ValueTypeStatus;
};

export type OntologyIrValueTypeBlockDataEntry = {
  metadata: OntologyIrPackagedValueTypeMetadata;
  versions: OntologyIrPackagedValueType[];
};

export type OntologyIrValueTypeBlockData = {
  valueTypes: OntologyIrValueTypeBlockDataEntry[];
};

export type ImportedTypes = {
  sharedPropertyTypes: ImportedSharedPropertyTypes[];
};

export type ImportedSharedPropertyTypes = {
  apiName: string;
  packageName: string;
};
