import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../services/authentication.service';
import {LoginComponent} from '../../../../../auth/login/login.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  providers:[LoginComponent]
})
export class MyAccountComponent implements OnInit {
  
  //public readonly phone_number:string = localStorage.getItem('contact_number');
  //public readonly roleType:string = localStorage.getItem('role');
  public readonly phone_number:string = this.authService.decodeToken(this.authService.getAuthToken()).data.contact_number;     
  public readonly roleType:string = this.authService.decodeToken(this.authService.getAuthToken()).data.roleType;
  public readonly username:string = this.authService.decodeToken(this.authService.getAuthToken()).data.name;
  
  constructor(public authService: AuthenticationService,
              private loginComp:LoginComponent) { }

  ngOnInit() {

  }
        SignOut(){
          this.loginComp.logOut();
        }
}



