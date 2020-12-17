import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { appRoutes } from '../../config/app-routes.constants';

import { DiaryComponent } from './components/diary/diary.component';
import { HistoryComponent } from './components/history/history.component';
import { NoteComponent } from './components/note/note.component';

const routes: Routes = [
  {
    // Define parent route and component
    path: '',
    component: DiaryComponent,
    // Define child routes and respective components
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: appRoutes.diary.note,
      },
      {
        path: appRoutes.diary.note,
        component: NoteComponent,
      },
      {
        path: appRoutes.diary.history,
        component: HistoryComponent,
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
export class DiaryRoutingModule { }
