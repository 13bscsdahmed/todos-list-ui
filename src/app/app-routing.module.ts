import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { appRoutes } from './config/app-routes.constants';
import { PreloadSelectedModules } from './strategies/preload-selected-modules.strategy';

const routes: Routes = [
  { // Redirect '' to public route
    path: '',
    pathMatch: 'full',
    redirectTo: appRoutes.diary.root,
    data : {
      preload: false
    }
  },
  { // Go to diary route
    path: appRoutes.diary.root,
    data: {
      preload: true
    },
    loadChildren: () => import('./modules/diary/diary.module').then(m => m.DiaryModule)
  },
  { // Redirect in case of wildcards / undefined routes
    path: '**',
    redirectTo: appRoutes.diary.root
  }
];

/**
 * Main app routing modules
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadSelectedModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
