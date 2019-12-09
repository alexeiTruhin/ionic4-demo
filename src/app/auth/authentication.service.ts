import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../pages/users/user.model';
import { UsersService } from '../pages/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(null);

  login() {
    const id = this.getRandomInt(1,10);
    this.usersService.getUser(id).subscribe( user => {
      this.authenticationState.next(user);
    });
  }

  logout() {
    return this.authenticationState.next(null);
  }

  isAuthenticated() {
    return !!this.authenticationState.value;
  }

  currentUser(): User {
    return this.authenticationState.value;
  }

  constructor(private usersService: UsersService) { }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
