import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import {AuthenticationService} from '../../shared/services/authentication.service'; 
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt'; 
import { ToastrService } from 'ngx-toastr';

 
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
  public incorrectInput:boolean = false;
  public invalidForm: boolean =false;

  constructor(public authService: AuthenticationService, 
              private fb: FormBuilder,  
              private router: Router, 
              private jwtHelper: JwtHelperService,
              ) { 
      
       


      this.loginForm = new FormGroup({
        contact_number: new FormControl(),
        password:new FormControl("",Validators.min(6)),
        
     });
  } 
 
  ngOnInit() { 
     if(localStorage.getItem('user')){
        switch(this.authService.decodeToken(this.authService.getAuthToken()).data.role){
                  case 'Super Admin': this.router.navigate(['superadmin/default']); 
                            break; 
                  case 'Admin': this.router.navigate(['client/default']); 
                            break;                     
                  case 'Client': this.router.navigate(['client/default']); 
                            break;                  
                  case 'Customer': this.router.navigate(['customer/default']); 
                            break;             
                  case 'Security': this.router.navigate(['security/default']); 
                            break;  
           }
       }
  } 
 
  showPassword() { 
    this.show = !this.show; 
  } 
   
 
 
  // Simple Login 
  login($event) { 
    $event.preventDefault();
    let phoneValidation:boolean =  false;
    let phoneLength = this.loginForm.controls['contact_number'].value.toString().length
    console.log("phone length")
    console.log(phoneLength)
    
    if (typeof +this.loginForm.controls['contact_number'].value === "number" && !isNaN(+this.loginForm.controls['contact_number'].value)){
        if(phoneLength == 10 && phoneLength != 0 && phoneLength !=null && phoneLength !=''){
          phoneValidation = true;
          this.invalidPhoneMessage = false;
          
        }
       
        
    }
    else {
      this.invalidPhoneMessage = true;
      
    }
    
    // let passwordLength = this.loginForm.controls['password'].value.toString().length
    // console.log("password")
    // console.log(passwordLength)

    let passwordValidation:boolean = false;
    let passwordLength = this.loginForm.controls['password'].value.length
    console.log("passlength")
    console.log(passwordLength)
   
    if(passwordLength > 5 && passwordLength < 30 && this.loginForm.controls['password'].value != '' && this.loginForm.controls['password'].value != null){
        passwordValidation = true;
    }
    

    if(this.loginForm.dirty && this.loginForm.valid && passwordValidation && phoneValidation){
      this.authService.SignIn(this.loginForm.value) 
      .subscribe({ 
        next:(res:any) => { 
  
                if(!res.token){
                    
                    this.loginForm.reset();
                    this.incorrectInput = true;
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
                  case 'Admin': this.router.navigate(['client/default']); 
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
          this.incorrectInput= true
          
        } 
      }); 
    }

     return 
  } 
 
  logOut(){ 
 
    localStorage.removeItem('user'); 
    localStorage.clear(); 
    this.router.navigate(['auth/login']); 
  } 
   
 
}