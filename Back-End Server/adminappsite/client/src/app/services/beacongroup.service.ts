import BeAcongrp from '../model/beacongroup.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class BeacongroupService {

  api_url = 'http://localhost:3000';
  beacongroupUrl = `${this.api_url}/api/beacongroup`;

  constructor(
    private http: HttpClient
  ) { }


  /*
  *
  * Creates new beacongroup entery in Database
  * url: post ./api/beacongroup
  *
  */
  createBeacongrp(beacongroup: BeAcongrp): Observable<any> {
    //returns the observable of http post request
    return this.http.post(`${this.beacongroupUrl}`, beacongroup);
  }
  /*
  *
  * Sends Request to server for list beacongroups, returns list
  * url: get ./api/beacongroup
  *
  */


  getBeacongrp(): Observable<BeAcongrp[]> {
    return this.http.get(this.beacongroupUrl)
      .map(res => {
        //Maps the response object sent from the server

        return res["data"] as BeAcongrp[];
      })
  }

  /*
  *
  * Sends Request to server for beacongroup based on id, then updates based on body
  * url: put  ./api/beacongroup
  */
  editBeacongroup(beacongroup: BeAcongrp) {
    let editUrl = `${this.beacongroupUrl}`
    //returns the observable of http put request
    return this.http.put(editUrl, beacongroup);
  }


  /*
  *
  * Sends Request to server for beacongroup based on id, then removes from collection
  * url: delete ./api/beacongroup/:id
  *
  */
  deleteBeacongroup(id: string): any {
    //Delete the object by the id
    let deleteUrl = `${this.beacongroupUrl}/${id}`
    return this.http.delete(deleteUrl)
      .map(res => {
        return res;
      })

  }
}
