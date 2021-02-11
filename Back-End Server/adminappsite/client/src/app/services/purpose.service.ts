import PuRpose from '../model/purpose.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class PurposeService {

  api_url = 'http://localhost:3000';
  purposeUrl = `${this.api_url}/api/purpose`;

  constructor(
    private http: HttpClient
  ) { }


  /*
  *
  * Creates new purpose entery in Database
  * url: post ./api/purpose
  *
  */


  createPurpose(purpose: PuRpose): Observable<any> {
    //returns the observable of http post request
    return this.http.post(`${this.purposeUrl}`, purpose);
  }



  /*
  *
  * Sends Request to server for list purposes, returns list
  * url: get ./api/purpose
  *
  */
  getPurpose(): Observable<PuRpose[]> {
    return this.http.get(this.purposeUrl)
      .map(res => {
        //Maps the response object sent from the server

        return res["data"] as PuRpose[];
      })
  }


  /*
  *
  * Sends Request to server for purpose based on id, then updates based on body
  * url: put  ./api/purpose
  */

  editPurpose(purpose: PuRpose) {
    let editUrl = `${this.purposeUrl}`
    //returns the observable of http put request
    return this.http.put(editUrl, purpose);
  }



  /*
  *
  * Sends Request to server for purpose based on id, then removes from collection
  * url: delete ./api/purpose/:id
  *
  */
  deletePurpose(id: string): any {
    //Delete the object by the id
    let deleteUrl = `${this.purposeUrl}/${id}`
    return this.http.delete(deleteUrl)
      .map(res => {
        return res;
      })

  }
}
