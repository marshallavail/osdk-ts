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

import type { OntologyObjectV2 } from "@osdk/foundry.ontologies";

import type { GeoJsonObject } from "@osdk/foundry.geo";

export const employee1 = {
  __rid:
    "ri.phonograph2-objects.main.object.88a6fccb-f333-46d6-a07e-7725c5f18b61",
  __primaryKey: 50030,
  __apiName: "Employee",
  employeeId: 50030,
  fullName: "John Doe",
  office: "NYC",
  class: "Red",
  startDate: "2019-01-01",
  employeeStatus: "TimeSeries<String>",
  employeeSensor: "TimeSeries<>",
  employeeLocation: "GeotimeSeriesReferencePlaceholder",
};

export const employee2 = {
  __rid:
    "ri.phonograph2-objects.main.object.ae6a0b9a-9b9a-4b9e-8b0a-2b0b9a9a0b9a",
  __primaryKey: 50031,
  __apiName: "Employee",
  __title: "Jane Doe",
  employeeId: 50031,
  fullName: "Jane Doe",
  office: "SEA",
  class: "Blue",
  startDate: "2012-02-12",
  employeeStatus: "TimeSeries<String>",
  employeeSensor: "TimeSeries<>",
  employeeLocation: "GeotimeSeriesReferencePlaceholder",
};

export const employee3 = {
  __rid:
    "ri.phonograph2-objects.main.object.b9a0b2b0-0a2b-0b8b-9e4b-a9a9b9a0b9a0",
  __primaryKey: 50032,
  __apiName: "Employee",
  __title: "Jack Smith",
  employeeId: 50032,
  fullName: "Jack Smith",
  office: "LON",
  class: "Red",
  startDate: "2015-05-15",
  employeeStatus: "TimeSeries<String>",
  employeeSensor: "TimeSeries<>",
  employeeLocation: "GeotimeSeriesReferencePlaceholder",
};

export const employee4withDerived = {
  __rid:
    "ri.phonograph2-objects.main.object.b9a0b2b0-0a2b-0b8b-9e4b-a9a9b9a0b9a0",
  __primaryKey: 50035,
  __apiName: "Employee",
  __title: "Jack Smith",
  employeeId: 50035,
  fullName: "Jack Smith",
  office: "LON",
  class: "Red",
  startDate: "2015-05-15",
  derivedPropertyName: 1,
  employeeStatus: "TimeSeries<String>",
  employeeSensor: "TimeSeries<>",
  employeeLocation: "GeotimeSeriesReferencePlaceholder",
};

export const employee5withUndefinedDerived = {
  __rid:
    "ri.phonograph2-objects.main.object.b9a0b2b0-0a2b-0b8b-9e4b-a9a9b9a0b9a0",
  __primaryKey: 50036,
  __apiName: "Employee",
  __title: "Jack Smith",
  employeeId: 50036,
  fullName: "Jack Smith",
  office: "LON",
  class: "Red",
  startDate: "2015-05-15",
  derivedPropertyName: undefined,
  employeeStatus: "TimeSeries<String>",
  employeeSensor: "TimeSeries<>",
  employeeLocation: "GeotimeSeriesReferencePlaceholder",
};

export const employeeFailsStrict = {
  __rid:
    "ri.phonograph2-objects.main.object.b9a0b2b0-0a2b-0b8b-9e4b-a9a9b9a0b9a0",
  __primaryKey: 50033,
  __apiName: "Employee",
  __title: "Jack Smith",
  employeeId: undefined,
  fullName: "Jack Smith",
  office: "LON",
  class: "Red",
  startDate: "2015-05-15",
  employeeStatus: "TimeSeries<String>",
  employeeSensor: "TimeSeries<>",
  employeeLocation: "GeotimeSeriesReferencePlaceholder",
};

export const officeAreaGeoJson: GeoJsonObject = {
  coordinates: [
    [
      [1.0, 1.0],
      [1.0, 2.0],
      [2.0, 2.0],
      [2.0, 1.0],
      [1.0, 1.0],
    ],
  ],
  type: "Polygon",
};

export const nycOffice: OntologyObjectV2 = {
  __rid:
    "ri.phonograph2-objects.main.object.c0c0c0c0-c0c0-c0c0-c0c0-c0c0c0c0c0c0",
  __primaryKey: "NYC",
  __apiName: "Office",
  __title: "New York City",
  officeId: "NYC",
  name: "New York City",
  entrance: { type: "Point", coordinates: [1.1, 1.1] },
  occupiedArea: officeAreaGeoJson,
};

export const travisPlayer = {
  __rid:
    "ri.phonograph2-objects.main.object.c0c0c3c0-c0c0-c0c0-c0c0-c0c0c0c0c0c0",
  __primaryKey: "tkelce",
  __apiName: "BgaoNflPlayer",
  __title: "tkelce",
  gamesPlayed: 171,
  name: "Travis Kelce",
  number: 87,
  wikiUrl: "myKelce.com",
  address: {
    addressLine1: "15 Muppets Lane",
    addressLine2: "Resort No 4",
    city: "Memphis",
    state: "TN",
    zipCode: 11100,
  },
  id: "tkelce",
};

export const objectWithAllPropertyTypes1: OntologyObjectV2 = {
  __rid:
    "ri.phonograph2-objects.main.object.401ac022-89eb-4591-8b7e-0a912b9efb44",
  __primaryKey: 1,
  __apiName: "objectTypeWithAllPropertyTypes",
  __title: "1",
  id: 1,
  string: "string",
  boolean: true,
  date: "2019-01-01",
  dateTime: "2019-01-01T01:01:01.000Z",
  decimal: 1.1,
  integer: 1,
  attachment: {
    rid: "ri.attachments.main.attachment.86016861-707f-4292-b258-6a7108915a75",
  },
  attachment2: {
    rid: "ri.attachments.main.attachment.86016861-707f-4292-b258-6a7108915a80",
  },
  attachmentArray: [
    {
      rid:
        "ri.attachments.main.attachment.86016861-707f-4292-b258-6a7108915a75",
    },
    {
      rid:
        "ri.attachments.main.attachment.86016861-707f-4292-b258-6a7108915a80",
    },
  ],
  long: 1,
  short: 1,
  float: 1.1,
  double: 1.1,
  byte: 1,
  geoPoint: { type: "Point", coordinates: [1.1, 1.1] },
  geoShape: {
    coordinates: [
      [
        [1.0, 1.0],
        [1.0, 2.0],
        [2.0, 2.0],
        [2.0, 1.0],
        [1.0, 1.0],
      ],
    ],
    type: "Polygon",
  },
  stringArray: ["string"],
  booleanArray: [true],
  dateArray: ["2019-01-01"],
  dateTimeArray: ["2019-01-01T01:01:01.000Z"],
  decimalArray: [1.1],
  integerArray: [1],
  longArray: [1],
  shortArray: [1],
  floatArray: [1.1],
  doubleArray: [1.1],
  byteArray: [1],
  geoPointArray: [{ type: "Point", coordinates: [1.1, 1.1] }],
  geoShapeArray: [
    {
      coordinates: [
        [
          [1.0, 1.0],
          [1.0, 2.0],
          [2.0, 2.0],
          [2.0, 1.0],
          [1.0, 1.0],
        ],
      ],
      type: "Polygon",
    },
  ],
  mediaReference: "MediaReferencePlaceholder",
};

export const objectWithAllPropertyTypesEmptyEntries = {
  __rid:
    "ri.phonograph2-objects.main.object.401ac022-89eb-4591-8b7e-0a912b9efb44",
  __primaryKey: 2,
  __apiName: "objectTypeWithAllPropertyTypes",
  __title: "2",
  id: 2,
};

export const objectLoadResponseMap: {
  [objectTypeApiName: string]: {
    [primaryKey: string]: OntologyObjectV2;
  };
} = {
  Employee: {
    [employee1.__primaryKey.toString()]: employee1,
    [employee2.__primaryKey.toString()]: employee2,
    [employee3.__primaryKey.toString()]: employee3,
    [employee4withDerived.__primaryKey.toString()]: employee4withDerived,
    [employeeFailsStrict.__primaryKey.toString()]: employeeFailsStrict,
  },
  Office: {
    [nycOffice.__primaryKey.toString()]: nycOffice,
  },
  objectTypeWithAllPropertyTypes: {
    [objectWithAllPropertyTypes1.__primaryKey.toString()]:
      objectWithAllPropertyTypes1,
    [objectWithAllPropertyTypesEmptyEntries.__primaryKey.toString()]:
      objectWithAllPropertyTypesEmptyEntries,
  },
  BgaoNflPlayer: { [travisPlayer.__primaryKey.toString()]: travisPlayer },
};
