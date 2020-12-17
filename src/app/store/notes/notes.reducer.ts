/**
 * Reducer file to define initial state when
 * the app store is initialized and the state
 * modifications for each action as a case
 */
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { NoteModel } from './models/note.model';
import { NotesActions, NotesActionsTypes } from './notes.actions';

// Create adapter for note entity
const noteAdapter = createEntityAdapter<NoteModel>({
  selectId: (note: NoteModel) => note.id,
  sortComparer: false, // Disable sorting
});

// Define basic Monitor Connection State
export interface NotesState extends EntityState<NoteModel> {}




// Initialize State
const initialState: NotesState = noteAdapter.getInitialState({});

export function notesReducer(
  state = initialState,
  action: NotesActions,
): NotesState {
  switch (action.type) {
    case NotesActionsTypes.ADD_NOTE:
      return noteAdapter.addOne(action.payload, state);
    case NotesActionsTypes.UPDATE_NOTE:
      return noteAdapter.updateOne({
        id: action.id,
        changes: action.payload, // change the fields as are in this object
      }, state);
    default:
      return state;
  }
}

export const {
  selectAll,
} = noteAdapter.getSelectors();

