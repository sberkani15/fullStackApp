import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private _http:Http) { }

  registerUser(user){
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post('http://localhost:3000/users/register', user , {headers:headers}).map(
      res=> res.json()
    )

  }

  authenticate(user){
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post('http://localhost:3000/users/authenticate', user , {headers:headers}).map(
      res=> res.json()
    )
  }

}
