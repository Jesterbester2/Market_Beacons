import BeAcon from '../model/beacon.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class BeaconService {

  api_url = 'http://localhost:3000';
  beaconUrl = `${this.api_url}/api/beacon`;

  constructor(
    private http: HttpClient
  ) { }




  /*
  *
  * Creates new beacon entery in Database
  * url: post ./api/beacon
  *
  */
  createBeacon(beacon: BeAcon): Observable<any> {
    //returns the observable of http post request
    return this.http.post(`${this.beaconUrl}`, beacon);
  }



  /*
  *
  * Sends Request to server for list beacons, returns list
  * url: get ./api/beacon
  *
  */
  getBeacon(): Observable<BeAcon[]> {
    return this.http.get(this.beaconUrl)
      .map(res => {
        //Maps the response object sent from the server
        //console.log(res["date"]);
        return res["data"] as BeAcon[];
      })
  }
  /*
  *
  * Sends Request to server for beacon based on id, then updates based on body
  * url: put  ./api/beacon
  */

  editBeacon(beacon: BeAcon) {
    let editUrl = `${this.beaconUrl}`
    //returns the observable of http put request
    return this.http.put(editUrl, beacon);
  }



  /*
  *
  * Sends Request to server for beacon based on id, then removes from collection
  * url: delete ./api/beacon/:id
  *
  */
  deleteBeacon(id: string): any {
    //Delete the object by the id
    let deleteUrl = `${this.beaconUrl}/${id}`
    return this.http.delete(deleteUrl)
      .map(res => {
        return res;
      })

  }
}
