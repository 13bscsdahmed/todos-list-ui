/**
 * Actions file to classify actions and the data they pass to reducers
 */
import { Action } from '@ngrx/store';

import { TodosListModel } from './models/todos.model';


export enum TodosActionsTypes {
  ADD_TODO_LIST = '[TODOS] Add Todo List',
  UPDATE_TODO_LIST = '[TODOS] Update Todo',
}

// Defining Provision Actions
export class AddTodoList implements Action {
  readonly type = TodosActionsTypes.ADD_TODO_LIST;
  constructor(public payload: TodosListModel) {}
}

export class UpdateTodoList implements Action {
  readonly type = TodosActionsTypes.UPDATE_TODO_LIST;
  constructor(public id: string, public payload: Partial<TodosListModel>) {}
}


// Defining types for Todos Actions
export type TodosActions = AddTodoList | UpdateTodoList;
