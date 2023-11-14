import type { OntologyDefinition } from '@osdk/api';
import type { Ontology as ClientOntology } from '@osdk/legacy-client';
import { actionTakesAllParameterTypes } from './actions/actionTakesAllParameterTypes';
import { createTodo } from './actions/createTodo';
import { ObjectTypeWithAllPropertyTypes } from './objects/ObjectTypeWithAllPropertyTypes';
import { Person } from './objects/Person';
import { Todo } from './objects/Todo';
import type { Actions } from './ontologyActions';
import type { Objects } from './ontologyObjects';
import type { Queries } from './ontologyQueries';
import { getTodoCount } from './queries/getTodoCount';
import { queryTakesAllParameterTypes } from './queries/queryTakesAllParameterTypes';

export const Ontology: {
  metadata: {
    ontologyRid: 'ridHere';
    ontologyApiName: 'OntologyApiName';
    userAgent: 'foundry-typescript-osdk/0.0.1';
  };
  objects: {
    Todo: typeof Todo;
    Person: typeof Person;
    ObjectTypeWithAllPropertyTypes: typeof ObjectTypeWithAllPropertyTypes;
  };
  actions: {
    actionTakesAllParameterTypes: typeof actionTakesAllParameterTypes;
    createTodo: typeof createTodo;
  };
  queries: {
    queryTakesAllParameterTypes: typeof queryTakesAllParameterTypes;
    getTodoCount: typeof getTodoCount;
  };
} = {
  metadata: {
    ontologyRid: 'ridHere' as const,
    ontologyApiName: 'OntologyApiName' as const,
    userAgent: 'foundry-typescript-osdk/0.0.1' as const,
  },
  objects: {
    Todo,
    Person,
    ObjectTypeWithAllPropertyTypes,
  },
  actions: {
    actionTakesAllParameterTypes,
    createTodo,
  },
  queries: {
    queryTakesAllParameterTypes,
    getTodoCount,
  },
} satisfies OntologyDefinition<
  'Todo' | 'Person' | 'ObjectTypeWithAllPropertyTypes',
  'actionTakesAllParameterTypes' | 'createTodo',
  'queryTakesAllParameterTypes' | 'getTodoCount'
>;

export interface Ontology extends ClientOntology<typeof Ontology> {
  objects: Objects;
  actions: Actions;
  queries: Queries;
}
