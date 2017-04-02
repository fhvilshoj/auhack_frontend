import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { User } from '../Models/User';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService implements OnInit {

  private usersUrl = 'http://soerenq.com:9479/users';
  private headers = new Headers({'Content-Type': 'application/json'});

  currentUser : User;

  constructor(private http: Http){}

  getAllUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => response.json().value as User[])
      .catch(this.handleError);
  }

  setCurrentUser(user : User): void {
    this.currentUser = user;
  }

  ngOnInit(): void {
    this.getAllUsers()
      .then(users => {if (users && users.length > 0) this.currentUser = users[0]})
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
