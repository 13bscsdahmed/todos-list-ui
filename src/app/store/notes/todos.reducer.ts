/**
 * Reducer file to define initial state when
 * the app store is initialized and the state
 * modifications for each action as a case
 */
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { TodosListModel } from './models/todos.model';
import { TodosActions, TodosActionsTypes } from './todos.actions';

// Create adapter for board entity
const todoAdapter = createEntityAdapter<TodosListModel>({
  selectId: (todoList: TodosListModel) => todoList.id,
  sortComparer: false, // Disable sorting
});

// Define basic Monitor Connection State
export interface TodosState extends EntityState<TodosListModel> {}




// Initialize State
const initialState: TodosState = todoAdapter.getInitialState({});

export function todosReducer(
  state = initialState,
  action: TodosActions,
): TodosState {
  switch (action.type) {
    case TodosActionsTypes.ADD_TODO_LIST:
      return todoAdapter.addOne(action.payload, state);
    case TodosActionsTypes.UPDATE_TODO_LIST:
      return todoAdapter.updateOne({
        id: action.id,
        changes: action.payload, // change the fields as are in this object
      }, state);
    default:
      return state;
  }
}

export const {
  selectAll,
} = todoAdapter.getSelectors();

