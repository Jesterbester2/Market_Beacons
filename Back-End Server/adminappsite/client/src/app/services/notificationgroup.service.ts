import NoTigrp from '../model/notificationgroup.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class NotigrpService {

  api_url = 'http://localhost:3000';
  notificationgroupUrl = `${this.api_url}/api/notificationgroup`;

  constructor(
    private http: HttpClient
  ) { }


  /*
  *
  * Creates new notificationgroup entery in Database
  * url: post ./api/notificationgroup
  *
  */


  createNotificationgroup(notificationgroup: NoTigrp): Observable<any> {
    //returns the observable of http post request
    return this.http.post(`${this.notificationgroupUrl}`, notificationgroup);
  }


  /*
  *
  * Sends Request to server for list notificationgroups, returns list
  * url: get ./api/notificationgroup
  *
  */
  getNotificationgroup(): Observable<NoTigrp[]> {
    return this.http.get(this.notificationgroupUrl)
      .map(res => {
        //Maps the response object sent from the server

        return res["data"] as NoTigrp[];
      })
  }


  /*
  *
  * Sends Request to server for notificationgroup based on id, then updates based on body
  * url: put  ./api/notificationgroup
  */

  editNotificationgroup(notificationgroup: NoTigrp) {
    let editUrl = `${this.notificationgroupUrl}`
    //returns the observable of http put request
    return this.http.put(editUrl, notificationgroup);
  }


  /*
  *
  * Sends Request to server for notificationgroup based on id, then removes from collection
  * url: delete ./api/notificationgroup/:id
  *
  */
  deleteNotificationgroup(id: string): any {
    //Delete the object by the id
    let deleteUrl = `${this.notificationgroupUrl}/${id}`
    return this.http.delete(deleteUrl)
      .map(res => {
        return res;
      })

  }
}
