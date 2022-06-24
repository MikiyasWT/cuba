import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

const baseurl = `${environment.apiUrl}/`;

@Injectable({
  providedIn: 'root'
})

export class ApipointsService {
  
  constructor(private http:HttpClient){}
  //return this.http.post<any>(url,data);
  
  //client services
  getClients(){
     let url = baseurl+'get_client.php'
     return this.http.get<any>(url);
  }

  registerClient(data:FormData){
    let url = baseurl+'reg_client.php'
    return this.http.post<any>(url,data);
  }

  deleteClient(id:number){
    let url = baseurl+'del_client.php/?'+id;
    return this.http.delete<any>(url);
  }

  editClient(data:FormData){
    let url = baseurl+'edit_client.php';
    return this.http.put<any>(url,data);
  }


  //customer services



  //visitor services


  //security services
}





  


