import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosRoutingModule } from './todos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { TodosComponent } from './components/todos/todos.component';
import { BoardComponent } from './components/board/board.component';
import { ReportsComponent } from './components/reports/reports.component';

import { listReducer } from '../../store/list/list.reducer';
import { features } from '../../store/features/features';
import { ListService } from './services/list.service';
import { todoReducer } from '../../store/todos/todo.reducer';
import { TodoService } from './services/todo.service';
import { AddListDialogComponent } from './dialogs/add-list-dialog/add-list-dialog.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';

/**
 * Diary Module
 */
@NgModule({
  declarations: [
    TodosComponent,
    BoardComponent,
    ReportsComponent,
    AddListDialogComponent,
    BoardHeaderComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    SharedModule,
    StoreModule.forFeature(features.lists, listReducer),
    StoreModule.forFeature(features.todos, todoReducer)
  ],
  providers: [
    ListService,
    TodoService,
  ],
  entryComponents: [
    AddListDialogComponent
  ]
})
export class TodosModule { }
