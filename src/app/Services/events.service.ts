import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { AUEvent } from '../Models/AUEvent';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventsService {

  private eventsUrl = 'http://soerenq.com:9479/events';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http){}

  getEventsForAllUsers(): Promise<AUEvent[]> {
    return this.http.get(this.eventsUrl)
      .toPromise()
      .then(response => response.json().value as AUEvent[])
      .catch(this.handleError);
  }

  getEventsForUser(userId: string): Promise<AUEvent[]> {
    return this.http.get(this.eventsUrl + '?$userId=' + userId)
      .toPromise()
      .then(response => response.json().value as AUEvent[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
