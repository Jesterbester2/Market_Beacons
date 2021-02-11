import UsEr from '../model/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  api_url = 'http://localhost:3000';
  userUrl = `${this.api_url}/api/user`;

  constructor(
    private http: HttpClient



  ) { }




  /*
  *
  * Creates new user entery in Database
  * url: post ./api/user
  *
  */

  createUser(user: UsEr): Observable<any> {
    //returns the observable of http post request
    return this.http.post(`${this.userUrl}`, user);
  }



  /*
  *
  * Sends Request to server for list users, returns list
  * url: get ./api/user
  *
  */

  getUser(): Observable<UsEr[]> {
    return this.http.get(this.userUrl)
      .map((res) => {
        //Maps the response object sent from the server


        //console.log(res["data"].docs);
        return res["data"] as UsEr[];
      });
  };

  /*
  *
  * Sends Request to server for user based on id, then updates based on body
  * url: put  ./api/user
  */

  editUser(user: UsEr) {
    let editUrl = `${this.userUrl}`
    //returns the observable of http put request
    return this.http.put(editUrl, user);
  }

  /*
  *
  * Sends Request to server for user based on id, then removes from collection
  * url: delete ./api/user/:id
  *
  */

  deleteUser(id: string): any {
    //Delete the object by the id
    let deleteUrl = `${this.userUrl}/${id}`
    return this.http.delete(deleteUrl)
      .map(res => {
        return res;
      })

  }
}
