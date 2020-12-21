import { createFeatureSelector, createSelector } from '@ngrx/store';
import { features } from '../features/features';
import { ListState } from './list.reducer';
import * as fromLists from './list.reducer';

// Creating feature selector for list entity
export const selectListState = createFeatureSelector<ListState>(features.lists);

/**
 * Get entity by id selector
 * @param [_id_] - Id of board
 */
export const getListById = (_id_: string) => createSelector(
  selectListState,
  ListsState => ListsState.entities[_id_]
);

/**
 * Select all list
 */
export const selectAllLists = createSelector(
  selectListState,
  fromLists.selectAll
);


