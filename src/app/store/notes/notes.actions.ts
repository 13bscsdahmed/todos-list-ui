/**
 * Actions file to classify actions and the data they pass to reducers
 */
import { Action } from '@ngrx/store';

import { NoteModel } from './models/note.model';


export enum NotesActionsTypes {
  ADD_NOTE = '[NOTE] Add Note',
  UPDATE_NOTE = '[NOTE] Update Note',
}

// Defining Provision Actions
export class AddNote implements Action {
  readonly type = NotesActionsTypes.ADD_NOTE;
  constructor(public payload: NoteModel) {}
}

export class UpdateNote implements Action {
  readonly type = NotesActionsTypes.UPDATE_NOTE;
  constructor(public id: string, public payload: Partial<NoteModel>) {}
}


// Defining types for Notes Actions
export type NotesActions = AddNote | UpdateNote;
