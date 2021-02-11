import NoTi from '../model/notification.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {

  api_url = 'http://localhost:3000';
  notificationUrl = `${this.api_url}/api/notification`;

  constructor(
    private http: HttpClient
  ) { }




  /*
  *
  * Creates new notification entery in Database
  * url: post ./api/notification
  *
  */
  createNotification(notification: NoTi): Observable<any> {
    //returns the observable of http post request
    return this.http.post(`${this.notificationUrl}`, notification);
  }


  /*
  *
  * Sends Request to server for list notifications, returns list
  * url: get ./api/notification
  *
  */

  getNoti(): Observable<NoTi[]> {
    return this.http.get(this.notificationUrl)
      .map(res => {
        //Maps the response object sent from the server

        return res["data"] as NoTi[];
      })
  }



  /*
  *
  * Sends Request to server for notification based on id, then updates based on body
  * url: put  ./api/notification
  */
  editNotification(notification: NoTi) {
    let editUrl = `${this.notificationUrl}`
    //returns the observable of http put request
    return this.http.put(editUrl, notification);
  }




  /*
  *
  * Sends Request to server for notification based on id, then removes from collection
  * url: delete ./api/notification/:id
  *
  */
  deleteNotification(id: string): any {
    //Delete the object by the id
    let deleteUrl = `${this.notificationUrl}/${id}`
    return this.http.delete(deleteUrl)
      .map(res => {
        return res;
      })

  }
}
