import CoMpany from '../model/company.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {

  api_url = 'http://localhost:3000';
  companyUrl = `${this.api_url}/api/company`;

  constructor(
    private http: HttpClient
  ) { }



  /*
  *
  * Creates new company entery in Database
  * url: post ./api/company
  *
  */
  createCompany(company: CoMpany): Observable<any> {
    //returns the observable of http post request
    return this.http.post(`${this.companyUrl}`, company);
  }
  /*
  *
  * Sends Request to server for list companys, returns list
  * url: get ./api/company
  *
  */



  getCompany(): Observable<CoMpany[]> {
    return this.http.get(this.companyUrl)
      .map(res => {
        //Maps the response object sent from the server

        return res["data"] as CoMpany[];
      })
  }

  /*
  *
  * Sends Request to server for company based on id, then updates based on body
  * url: put  ./api/company
  */
  editCompany(company: CoMpany) {
    let editUrl = `${this.companyUrl}`
    //returns the observable of http put request
    return this.http.put(editUrl, company);
  }
  /*
  *
  * Sends Request to server for company based on id, then removes from collection
  * url: delete ./api/company/:id
  *
  */
  deleteCompany(id: string): any {
    //Delete the object by the id
    let deleteUrl = `${this.companyUrl}/${id}`
    return this.http.delete(deleteUrl)
      .map(res => {
        return res;
      })

  }
}
