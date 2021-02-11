import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map'
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


export interface UserDetails {
  _id: string;
  email: string;
  username: string;
  companyid: string;
  exp: number;
  role: string;
}

 interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email?: string;
  password: string;
  username: string;
  role?: string;
  companyid?: string;

}

@Injectable()
export class AuthenticationService {
  api_url = environment.apiUrl;
  authUrl = `${this.api_url}${environment.api}/user/`;
  private token: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  public isAdmin(): boolean {
    const user = this.getUserDetails();
    if (user.role == 'Admin') {
      return true;
    } else {
      return false;
    }
  }

  public register(user: TokenPayload): Observable<any> {
  return this.request('post', 'register', user);
}

public login(user: TokenPayload): Observable<any> {
  return this.request('post', 'login', user);
}



private request(method: 'post'|'get', type: 'login'|'register', user?: TokenPayload): Observable<any> {
  let base;

  if (method === 'post') {
    base = this.http.post(this.authUrl+`${type}`, user);
  } else {
    base = this.http.get(this.authUrl+`${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }

  const request = base.pipe(
    map((data: TokenResponse) => {
      if (data.token) {
        this.saveToken(data.token);
      }
      return data;
    })
  );

  return request;
}


  private saveToken(token: string): void {
 localStorage.setItem('mean-token', token);
 this.token = token;
}

public getToken(): string {

 if (!this.token) {

   this.token = localStorage.getItem('mean-token');
 }
 return this.token;
}

public logout(): void {
  console.log(this.token);
 this.token = '';
console.log(localStorage.getItem('mean-token'));
localStorage.removeItem('mean-token');
 this.router.navigateByUrl('/');
}
}
