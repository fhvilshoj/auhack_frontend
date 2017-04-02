import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { AUEvent } from '../Models/AUEvent';

import 'rxjs/add/operator/toPromise';
import {AppSettings} from "../app-settings.component";
import {Service} from "../Models/Service";

@Injectable()
export class ServicesService {

  private servicesUrl = AppSettings.API_ENDPOINT + 'services';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http){}

  getAllServices(): Promise<Service[]> {
    return this.http.get(this.servicesUrl).toPromise()
      .then(response => response.json().value as Service[])
      .catch(this.handleError);
  }

  //Not sure if this works as intended - users are registered per instance
  getServicesForUser(userId: string): Promise<Service[]> {
    return this.http.get(this.servicesUrl + "?userId=" + userId).toPromise()
      .then(response => response.json().value as Service[])
  }

  //this.servicesUrl + "(" + serviceId + ")")
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
