/**
 * Actions file to classify actions and the data they pass to reducers
 */
import { Action } from '@ngrx/store';

import { ListModel } from './models/list.model';


export enum ListActionsTypes {
  ADD_LIST = '[LIST] Add List',
  UPDATE_LIST = '[LIST] Update List',
  SET_LISTS = '[LIST] Set Lists'
}

// Defining Provision Actions
export class AddList implements Action {
  readonly type = ListActionsTypes.ADD_LIST;
  constructor(public payload: ListModel) {}
}

export class UpdateList implements Action {
  readonly type = ListActionsTypes.UPDATE_LIST;
  constructor(public _id_: string, public payload: Partial<ListModel>) {}
}

export class SetLists implements Action {
  readonly type = ListActionsTypes.SET_LISTS;
  constructor(public payload: Array<ListModel>) {}
}


// Defining types for list Actions
export type ListActions = SetLists | AddList | UpdateList;
