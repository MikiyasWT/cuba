import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'; 
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
  public invalidPhoneMessage:boolean = false;
  public invalidPasswordMessage:boolean = false;

  constructor(public authService: AuthenticationService, 
              private fb: FormBuilder,  
              private router: Router, 
              private jwtHelper: JwtHelperService) { 
      
       


      this.loginForm = new FormGroup({
        contact_number: new FormControl(),
        password:new FormControl(),
        
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

              if(!res.token){
                this.loginForm.reset();
                  //this.invalidPhoneMessage = true
                  this.invalidPasswordMessage = true
                  this.loginForm.reset("",{onlySelf:true})
                  return
              }
             
            const token = res.token; 
            localStorage.setItem("user",token);
            const decodedToken = (this.jwtHelper.decodeToken(token || '')); 
            const role = decodedToken.data.role; 
            //const token = localStorage.getItem('token'); 
            
            //const role = decodedToken.data.role; 
            //const phone = decodedToken.data.contact_number; 
            
            
            if(token){  
              this.loginForm.reset(); 
              //this.router.navigate(['dashboard']); 
               
              switch(role){ 
                case 'Super Admin': this.router.navigate(['superadmin/default']); 
                                     break; 
                case 'Admin': this.router.navigate(['superadmin/default']); 
                                     break;                     
                case 'Client': this.router.navigate(['client/default']); 
                                     break;                  
                case 'Customer': this.router.navigate(['customer/default']); 
                                     break;             
                case 'Security': this.router.navigate(['security/default']); 
                                     break;                                    
              } 
     
            }  
      }, 
      error:(err) =>{ 
       
        this.loginForm.reset();
        //this.invalidPhoneMessage = true //on purpose
        this.invalidPasswordMessage = true
        
      } 
    }); 
     
  } 
 
  logOut(){ 
 
    localStorage.removeItem('user'); 
    localStorage.clear(); 
    this.router.navigate(['auth/login']); 
  } 
   
 
}