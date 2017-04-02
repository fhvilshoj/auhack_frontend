import {Injectable, OnInit} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {User} from "../Models/User";
import "rxjs/add/operator/toPromise";

@Injectable()
export class UsersService implements OnInit {

  private usersUrl = 'http://soerenq.com:9479/users';
  private headers = new Headers({'Content-Type': 'application/json'});

  currentUser: User = {
    "name": "Alice",
    "id": "ece30dcc-f1f2-4afd-9a42-c62ae3c62d45"
  };

  constructor(private http: Http) {
  }

  getAllUsers(): Promise<User[]> {
    //TODO return cache
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => response.json().value as User[])
      .catch(this.handleError);
  }

  ngOnInit(): void {
    this.getAllUsers()
      .then(users => {
        if (users && users.length > 0) this.currentUser = users[0]
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
