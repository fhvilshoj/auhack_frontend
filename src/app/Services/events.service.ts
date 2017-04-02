import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { AUEvent } from '../Models/AUEvent';

import 'rxjs/add/operator/toPromise';
import {AppSettings} from "../app-settings.component";
import {EventType} from "../Models/EventType";

@Injectable()
export class EventsService {

  private eventsUrl = AppSettings.API_ENDPOINT + 'events';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http){}

  private addIfDate(date?: Date): string{
    return date ? '&$filter=date gt ' + date : '';
  }

  getEventsForAllUsers(date?: Date): Promise<AUEvent[]> {

    return this.http.get(this.eventsUrl + this.addIfDate(date))
      .toPromise()
      .then(response => response.json().value as AUEvent[])
      .catch(this.handleError);
  }


  getEventsForUser(userId: string,date?: Date): Promise<AUEvent[]> {
    return this.http.get(this.eventsUrl + '?$filter userId eq' + userId+this.addIfDate(date))
      .toPromise()
      .then(response => response.json().value as AUEvent[])
      .catch(this.handleError);
  }

  //TODO verify that the newest is first
  getNewest(count: number,date?: Date): Promise<AUEvent[]>{
    return this.http.get(this.eventsUrl+'?$orderBy=time desc&$top=' + count+this.addIfDate(date))
      .toPromise()
      .then(response => response.json().value as AUEvent[])
      .catch(this.handleError);
  }

  getAllByType(type: EventType,date?: Date): Promise<AUEvent[]>{
    return this.http.get(this.eventsUrl+'?$filter=type eq ' + EventType+this.addIfDate(date))
      .toPromise()
      .then(response => response.json().value as AUEvent[])
      .catch(this.handleError);
  }

  getAllByTag(tag: string,date?: Date): Promise<AUEvent[]>{
    return this.http.get(this.eventsUrl+'?$filter=contains('+ tag +',tags)'+this.addIfDate(date))
      .toPromise()
      .then(response => response.json().value as AUEvent[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
