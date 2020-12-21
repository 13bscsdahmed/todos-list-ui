import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { appRoutes } from './config/app-routes.constants';
import { PreloadSelectedModules } from './strategies/preload-selected-modules.strategy';

const routes: Routes = [
  { // Redirect '' to public route
    path: '',
    pathMatch: 'full',
    redirectTo: appRoutes.todos.root,
    data : {
      preload: false
    }
  },
  { // Go to todos route
    path: appRoutes.todos.root,
    data: {
      preload: true
    },
    loadChildren: () => import('./modules/todos/todos.module').then(m => m.TodosModule)
  },
  { // Redirect in case of wildcards / undefined routes
    path: '**',
    redirectTo: appRoutes.todos.root
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
