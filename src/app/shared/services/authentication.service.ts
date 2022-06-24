import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  
export class AuthenticationService {
    constructor(private http:HttpClient){

    }
SignIn(data:FormData){
    const url = `${environment.apiUrl}/login.php`;
    return this.http.post<any>(url,data);
}

getAuthToken():string {
    return localStorage.getItem('token')
    }

}