import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

import { User } from '../pages/users/user.model';
import { UsersService } from '../pages/users/users.service';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(null);

  constructor(
    private usersService: UsersService,
    private storage: Storage,
    private platform: Platform
  ) { 
    this.platform.ready().then(() => {
      this.checkUser();
    });
  }

  checkUser() {
    this.storage.get(USER_KEY).then(user => {
      if (user) {
        this.authenticationState.next(user);
      }
    })
  }

  login() {
    const id = this.getRandomInt(1,10);
    this.usersService.getUser(id).subscribe( user => {
      this.storage.set(USER_KEY, user).then(() => {
        this.authenticationState.next(user);
      });
    });
  }

  logout() {
   return this.storage.remove(USER_KEY).then(() => {
      this.authenticationState.next(null);
    });
  }

  isAuthenticated() {
    return !!this.authenticationState.value;
  }

  currentUser(): User {
    return this.authenticationState.value;
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
