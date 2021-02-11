import UpLoad from '../model/upload.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {AuthenticationService } from '../services/auth.service';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class UploadService {

  api_url = environment.apiUrl;
  uploadUrl = `${this.api_url}/api/upload`;
  userUploadUrl = `${this.api_url}/api/upload/user`;

  constructor(
    private auth: AuthenticationService,
    private http: HttpClient
  ) { }


  /*
  *
  * Creates new upload entery in Database
  * url: post ./api/upload
  *
  */
postFile(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.post(this.uploadUrl, formData, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }})

    }


  getUserUploads(): Observable<UpLoad[]>{
    return this.http.get(this.userUploadUrl,  { headers: { Authorization: `Bearer ${this.auth.getToken()}` }})
      .map(res => {
        //Maps the response object sent from the server
console.log(res["data"]);
        return res["data"] as UpLoad[];
      })
  }





}
