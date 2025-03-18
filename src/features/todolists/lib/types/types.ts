import type { Model } from '../../api/tasksApi.types';
import type { TodolistType } from '../../api/todolistsApi.types';

export type DomainModel = Partial<Model>;
export type FilterValues = 'all' | 'active' | 'completed' | 'first 3';
export type TodoListDomain = TodolistType & {
  filter: FilterValues;
};
