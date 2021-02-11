import TaGs from '../model/tag.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class TagService {

  api_url = 'http://localhost:3000';
  tagsUrl = `${this.api_url}/api/tag`;

  constructor(
    private http: HttpClient
  ) { }




  /*
  *
  * Creates new tag entery in Database
  * url: post ./api/tag
  *
  */
  createTag(tag: TaGs): Observable<any> {
    //returns the observable of http post request
    return this.http.post(`${this.tagsUrl}`, tag);
  }




  /*
  *
  * Sends Request to server for list tags, returns list
  * url: get ./api/tag
  *
  */
  getTags(): Observable<TaGs[]> {
    return this.http.get(this.tagsUrl)
      .map(res => {
        //Maps the response object sent from the server
        //console.log(res["data"]);
        return res["data"] as TaGs[];
      })
  }



  /*
  *
  * Sends Request to server for tag based on id, then updates based on body
  * url: put  ./api/tag
  */

  editTags(tags: TaGs) {
    let editUrl = `${this.tagsUrl}`
    //returns the observable of http put request
    return this.http.put(editUrl, tags);
  }


  /*
  *
  * Sends Request to server for tag based on id, then removes from collection
  * url: delete ./api/tag/:id
  *
  */
  deleteTags(id: string): any {
    //Delete the object by the id
    let deleteUrl = `${this.tagsUrl}/${id}`
    return this.http.delete(deleteUrl)
      .map(res => {
        return res;
      })

  }
}
