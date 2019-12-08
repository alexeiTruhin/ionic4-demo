import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../auth/authentication.service';

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
      url: '/app/stories',
      icon: 'people'
    },
  ];
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
