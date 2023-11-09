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

import type { ObjectTypesFrom, OntologyDefinition } from "@osdk/api";
import {
  BooleanGroupBy,
  LocalDateGroupBy,
  NumericGroupBy,
  StringGroupBy,
  TimestampGroupBy,
} from "../../ontology-runtime";
import type { GroupBySelections } from "../interfaces/aggregations";
import type { OsdkLegacyObjectFrom } from "../OsdkObject";

export function mapPropertiesToGroupByProperties<
  O extends OntologyDefinition<any>,
  K extends ObjectTypesFrom<O>,
>(ontology: O, type: K) {
  return Object.entries(ontology.objects[type].properties).reduce(
    (acc, [property, definition]) => {
      switch (definition.type) {
        case "boolean":
          acc[property] = BooleanGroupBy(property);
          break;
        case "datetime":
          acc[property] = LocalDateGroupBy(property);
          break;
        case "timestamp":
          acc[property] = TimestampGroupBy(property);
        case "short":
        case "long":
        case "float":
        case "decimal":
        case "byte":
        case "double":
        case "integer":
          acc[property] = NumericGroupBy(property);
          break;
        case "string":
          acc[property] = StringGroupBy(property);
          break;
        case "geopoint":
        case "geoshape":
        case "attachment":
        case "numericTimeseries":
        case "stringTimeseries":
          return acc;
        default:
          const _: never = definition.type;
      }
      return acc;
    },
    {} as Record<string, GroupBySelections<any>>,
  ) as GroupBySelections<OsdkLegacyObjectFrom<O, K>>;
}
