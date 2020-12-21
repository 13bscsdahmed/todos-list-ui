import { createFeatureSelector, createSelector } from '@ngrx/store';
import { features } from '../features/features';
import { TodoState } from './todo.reducer';
import * as fromTodos from './todo.reducer';

// Creating feature selector for todo entity
export const selectTodoState = createFeatureSelector<TodoState>(features.todos);

/**
 * Get entity by id selector
 * @param [_id_] - Id of board
 */
export const getTodoById = (_id_: string) => createSelector(
  selectTodoState,
  TodosState => TodosState.entities[_id_]
);

/**
 * Select all todos
 */
export const selectAllTodos = createSelector(
  selectTodoState,
  fromTodos.selectAll
);


