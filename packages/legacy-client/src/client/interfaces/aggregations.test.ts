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

import { describe, expectTypeOf, it } from "vitest";

import type { Todo } from "../../util/test/TodoObject";
import type {
  AggregatableProperty,
  ApproximateDistinctCountAggregatableProperty,
  BooleanGroupBy,
  CountOperation,
  MultipleAggregatableProperty,
  NumericGroupBy,
  StringGroupBy,
} from "../objectSets/aggregations";
import type {
  AggregateSelection,
  GroupBySelections,
  MultipleAggregateSelection,
} from "./aggregations";

describe("Aggregations", () => {
  it("correct types", () => {
    expectTypeOf<{
      complete: BooleanGroupBy<"complete">;
      id: StringGroupBy<"id">;
      body: StringGroupBy<"body">;
      points: NumericGroupBy<"points">;
    }>().toMatchTypeOf<GroupBySelections<Todo>>();

    expectTypeOf<{
      complete: AggregatableProperty<never>;
      id: AggregatableProperty<never>;
      body: AggregatableProperty<number>;
      points: AggregatableProperty<number>;
    }>().toMatchTypeOf<AggregateSelection<Todo>>();

    expectTypeOf<{
      complete: MultipleAggregatableProperty<number>;
      id: ApproximateDistinctCountAggregatableProperty;
      body: ApproximateDistinctCountAggregatableProperty;
      points: MultipleAggregatableProperty<number>;
      count: () => CountOperation;
    }>().toMatchTypeOf<MultipleAggregateSelection<Todo>>();
  });
});
