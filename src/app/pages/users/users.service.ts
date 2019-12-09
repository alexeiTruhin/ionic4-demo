import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.model';

const USERS_URL: string = 'https://reqres.in/api/users?per_page=10';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [];

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>  { 
    return this.http.get(USERS_URL).pipe(
      map( res => {
        const users = res.data;
        this.users = [...res.data];

        return users;
      })
    )
  }

}
