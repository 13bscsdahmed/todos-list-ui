import { Component } from '@angular/core';
import { NavbarModel } from './modules/shared/components/models/navbar.model';
import { appRoutes } from './config/app-routes.constants';

/**
 * Main App Container component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  links: NavbarModel[] = [
    {
      label: 'Board',
      link: `${appRoutes.todos.root}/${appRoutes.todos.board}`,
      activeClass: 'active'
    },
    {
      label: 'Reports',
      link: `${appRoutes.todos.root}/${appRoutes.todos.reports}`,
      activeClass: 'active'
    }
  ];
}
