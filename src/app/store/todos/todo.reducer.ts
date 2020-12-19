/**
 * Reducer file to define initial state when
 * the app store is initialized and the state
 * modifications for each action as a case
 */
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { TodoModel } from './models/todo.model';
import { TodoActions, TodoActionsTypes } from './todo.actions';

// Create adapter for board entity
const todoAdapter = createEntityAdapter<TodoModel>({
  selectId: (todo: TodoModel) => todo._id_,
  sortComparer: false, // Disable sorting
});

// Define basic Monitor Connection State
export interface TodoState extends EntityState<TodoModel> {}




// Initialize State
const initialState: TodoState = todoAdapter.getInitialState({});

export function todoReducer(
  state = initialState,
  action: TodoActions,
): TodoState {
  switch (action.type) {
    case TodoActionsTypes.ADD_TODO:
      return todoAdapter.addOne(action.payload, state);
    case TodoActionsTypes.UPDATE_TODO:
      return todoAdapter.updateOne({
        id: action._id_,
        changes: action.payload, // change the fields as are in this object
      }, state);
    case TodoActionsTypes.SET_TODOS:
      return todoAdapter.setAll(action.payload, state);
    default:
      return state;
  }
}

export const {
  selectAll,
} = todoAdapter.getSelectors();

