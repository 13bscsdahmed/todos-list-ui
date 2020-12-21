import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { appRoutes } from '../../config/app-routes.constants';

import { TodosComponent } from './components/todos/todos.component';
import { ReportsComponent } from './components/reports/reports.component';
import { BoardComponent } from './components/board/board.component';

const routes: Routes = [
  {
    // Define parent route and component
    path: '',
    component: TodosComponent,
    // Define child routes and respective components
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: appRoutes.todos.board,
      },
      {
        path: appRoutes.todos.board,
        component: BoardComponent,
      },
      {
        path: appRoutes.todos.reports,
        component: ReportsComponent,
      },
    ]
  },
];

/**
 * Diary module routes file
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
