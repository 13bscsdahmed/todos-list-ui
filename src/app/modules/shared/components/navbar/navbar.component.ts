import { Component, Input, OnInit } from '@angular/core';
import { constants } from '../../../../config/app.constants';
import { NavbarModel } from '../models/navbar.model';

/**
 * Shared reusable navbar component
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constants  = constants;
  @Input() links: NavbarModel[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
