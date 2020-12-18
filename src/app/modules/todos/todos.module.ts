import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosRoutingModule } from './todos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { TodosComponent } from './components/todos/todos.component';
import { BoardComponent } from './components/board/board.component';
import { ReportsComponent } from './components/reports/reports.component';

import { notesReducer } from '../../store/notes/notes.reducer';
import { features } from '../../store/features/features';

/**
 * Diary Module
 */
@NgModule({
  declarations: [
    TodosComponent,
    BoardComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    SharedModule,
    StoreModule.forFeature(features.notes, notesReducer)
  ]
})
export class TodosModule { }
