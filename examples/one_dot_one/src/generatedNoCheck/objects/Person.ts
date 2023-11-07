import { ObjectDefinition } from '@osdk/api';
import type { MultiLink, OntologyObject } from '@osdk/legacy-client';
import type { Todo } from './Todo';

/**
 * A person
 */
export interface Person extends OntologyObject {
  readonly __apiName: 'Person';
  readonly __primaryKey: string;
  readonly email: string | undefined;
  readonly Todos: MultiLink<Todo>;
}

export const Person = {
  apiName: 'Person',
  primaryKeyType: 'string',
  links: {
    Todos: {
      multiplicity: true,
      targetType: 'Todo',
    },
  },
  properties: {
    email: {
      multiplicity: false,
      type: 'string',
      nullable: true,
    },
  },
} satisfies ObjectDefinition<'Person', 'Todo'>;
