import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryRoutingModule } from './diary-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { DiaryComponent } from './components/diary/diary.component';
import { NoteComponent } from './components/note/note.component';
import { HistoryComponent } from './components/history/history.component';

import { notesReducer } from '../../store/notes/notes.reducer';
import { features } from '../../store/features/features';

/**
 * Diary Module
 */
@NgModule({
  declarations: [
    DiaryComponent,
    NoteComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    DiaryRoutingModule,
    SharedModule,
    StoreModule.forFeature(features.notes, notesReducer)
  ]
})
export class DiaryModule { }
