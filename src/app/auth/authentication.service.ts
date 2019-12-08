import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  login() {
    return this.authenticationState.next(true);
  }

  logout() {
    return this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  constructor() { }
}
