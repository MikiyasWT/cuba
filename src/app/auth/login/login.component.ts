import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../shared/services/authentication.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public show: boolean = false;
  public loginForm: FormGroup;
  public errorMessage: any;

  constructor(public authService: AuthenticationService,
              private fb: FormBuilder, 
              private router: Router,
              private jwtHelper: JwtHelperService) {
     
        this.loginForm = this.fb.group({
        contact_number: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  ngOnInit() {
  }

  showPassword() {
    this.show = !this.show;
  }
  


  // Simple Login
  login() {
   
    this.authService.SignIn(this.loginForm.value)
    .subscribe({
      next:(res:any) => {
            
            const token = res.token;
            //const token = localStorage.getItem('token');
            const decodedToken = (this.jwtHelper.decodeToken(token || ''));
            const role = decodedToken.data.role;
            const phone = decodedToken.data.contact_number;
            
            if(token){
              localStorage.setItem('token',token);
              localStorage.setItem("user",decodedToken);
              localStorage.setItem("role",role);
              localStorage.setItem("contact_number",phone);
              this.loginForm.reset();
              //this.router.navigate(['dashboard']);
              
              switch(role){
                case 'Super Admin': this.router.navigate(['superadmin/default']);
                                     break;
                case 'Admin': this.router.navigate(['superadmin/default']);
                                     break;                    
                case 'Client': this.router.navigate(['client']);
                                     break;                 
                case 'Customer': this.router.navigate(['dashboard/default']);
                                     break;            
                case 'Security': this.router.navigate(['dashboard/default']);
                                     break;                                   
              }
    
            }
            else {
                 this.loginForm.reset();
                  
            }
      },
      error:(err) =>{
        this.loginForm.reset();
        
      }
    });
    
  }

  logOut(){

    localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
  

}


