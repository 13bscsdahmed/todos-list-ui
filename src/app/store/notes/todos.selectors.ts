import { createFeatureSelector, createSelector } from '@ngrx/store';
import { features } from '../features/features';
import { TodosState } from './todos.reducer';
import * as fromTodos from './todos.reducer';

// Creating feature selector for todos entity
export const selectTodosState = createFeatureSelector<TodosState>(features.todos);

/**
 * Get board by id selector
 * @param [id] - Id of board
 */
export const getTodoById = (id: string) => createSelector(
  selectTodosState,
  TodosState => TodosState.entities[id]
);

/**
 * Select all notes
 */
export const selectAllTodos = createSelector(
  selectTodosState,
  fromTodos.selectAll
);


