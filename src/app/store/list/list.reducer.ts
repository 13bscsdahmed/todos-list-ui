/**
 * Reducer file to define initial state when
 * the app store is initialized and the state
 * modifications for each action as a case
 */
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ListModel } from './models/list.model';
import { ListActions, ListActionsTypes } from './list.actions';

// Create adapter for board entity
const listAdapter = createEntityAdapter<ListModel>({
  selectId: (list: ListModel) => list._id_,
  sortComparer: false, // Disable sorting
});

// Define basic Monitor Connection State
export interface ListState extends EntityState<ListModel> {}




// Initialize State
const initialState: ListState = listAdapter.getInitialState({});

export function listReducer(
  state = initialState,
  action: ListActions,
): ListState {
  switch (action.type) {
    case ListActionsTypes.ADD_LIST:
      return listAdapter.addOne(action.payload, state);
    case ListActionsTypes.UPDATE_LIST:
      return listAdapter.updateOne({
        id: action._id_,
        changes: action.payload, // change the fields as are in this object
      }, state);
    case ListActionsTypes.SET_LISTS:
      return listAdapter.setAll(action.payload, state);
    default:
      return state;
  }
}

export const {
  selectAll,
} = listAdapter.getSelectors();

