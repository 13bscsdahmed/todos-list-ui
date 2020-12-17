import { createFeatureSelector, createSelector } from '@ngrx/store';
import { features } from '../features/features';
import { NotesState } from './notes.reducer';
import * as fromNotes from './notes.reducer';

// Creating feature selector for notes entity
export const selectNotesState = createFeatureSelector<NotesState>(features.notes);

/**
 * Get note by id selector
 * @param [id] - Id of note
 */
export const getNoteById = (id: string) => createSelector(
  selectNotesState,
  NotesState => NotesState.entities[id]
);

/**
 * Select all notes
 */
export const selectAllNotes = createSelector(
  selectNotesState,
  fromNotes.selectAll
);

/**
 * Filter notes by date
 * @param [date] - Date to filter on
 */
export const selectNotesByDate = (date: string) => createSelector(
  selectAllNotes,
  notes => notes.filter(note => note.date === date)
);

