/**
 * Actions file to classify actions and the data they pass to reducers
 */
import { Action } from '@ngrx/store';

import { TodoModel } from './models/todo.model';


export enum TodoActionsTypes {
  ADD_TODO = '[TODO] Add Todo',
  UPDATE_TODO = '[TODO] Update Todos',
  SET_TODOS = '[TODO] Set Todos'
}

// Defining Provision Actions
export class AddTodo implements Action {
  readonly type = TodoActionsTypes.ADD_TODO;
  constructor(public payload: TodoModel) {}
}

export class UpdateTodo implements Action {
  readonly type = TodoActionsTypes.UPDATE_TODO;
  constructor(public _id_: string, public payload: Partial<TodoModel>) {}
}

export class SetTodos implements Action {
  readonly type = TodoActionsTypes.SET_TODOS;
  constructor(public payload: Array<TodoModel>) {}
}


// Defining types for todos Actions
export type TodoActions = AddTodo | UpdateTodo | SetTodos;
