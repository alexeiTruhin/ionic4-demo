import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../auth/authentication.service';
import { User } from '../users/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public appPages = [
    {
      title: 'Stories',
      url: '/app/stories',
      icon: 'list-box'
    },
    {
      title: 'Users',
      url: '/app/users',
      icon: 'people'
    },
  ];

  currentUser = {};

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser();
  }

  logout() {
    this.authService.logout();
  }
}
