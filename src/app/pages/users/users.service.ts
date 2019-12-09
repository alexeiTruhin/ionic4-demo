import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.model';

const API_ENDPOINT: string = 'https://reqres.in/api/';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [];

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>  { 
    return this.http.get(API_ENDPOINT + 'users?per_page=10').pipe(
      map( res => {
        const users = res.data;
        this.users = [...res.data];

        return users;
      })
    )
  }

  getUser(id: number): Observable<any>  { 
    // TODO fail if there is no user with such id
    return this.http.get(API_ENDPOINT + `users/${id}`).pipe(
      map( res => {
        const user = res.data;

        return user;
      })
    )
  }
}
