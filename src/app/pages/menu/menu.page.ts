import { Component, OnInit } from '@angular/core';

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
  ];
  constructor() { }

  ngOnInit() {
  }

}
