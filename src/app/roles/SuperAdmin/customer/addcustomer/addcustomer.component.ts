import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { ApipointsService } from '../../Services/apipoints.service';
@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.scss']
})
export class AddcustomerComponent implements OnInit {

  public addCustomerform!: FormGroup;
  constructor(public formbuilder:FormBuilder,
             private api:ApipointsService,
             public router: Router,
             private toast: ToastrService) { }

  ngOnInit(): void {
    let now = new Date();
    this.addCustomerform = this.formbuilder.group({
      username:["",Validators.required],
      name:["",Validators.required],   
      email:["",Validators.required],
      address:["",Validators.required],
      contact_number:["",Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)],
      password:["",Validators.required],
      status:["",Validators.required],
      client_id:["",Validators.required],
      created:[now]
      
    });


      this.addCustomerform.controls['status'].setValue('0')
    
    }

  addCustomer(){
    let usernameValidation =  this.addCustomerform.controls['username'].value.length > 2 || this.addCustomerform.controls['username'].value.length < 15;
    let nameValidation =  this.addCustomerform.controls['name'].value.length > 2 || this.addCustomerform.controls['name'].value.length < 15;  
    let emailValidation =  this.addCustomerform.controls['email'].value.length > 8 || this.addCustomerform.controls['name'].value.length < 30; 
    let addressValidation =  this.addCustomerform.controls['address'].value.length > 2 || this.addCustomerform.controls['address'].value.length < 15; 
    let phoneLength = this.addCustomerform.controls['contact_number'].value.toString().length;
    let contactNumberValidation = false;
    if(phoneLength == 10){
      contactNumberValidation = true
    }
    let passwordValidation =  this.addCustomerform.controls['password'].value.length > 5 || this.addCustomerform.controls['address'].value.length < 20; 
    
    let clientIdLength = this.addCustomerform.controls['client_id'].value.toString().length;
    let clientIdValidation = false
    if(clientIdLength > 0 && clientIdLength <5){
      clientIdValidation = true
    }
     
    if(this.addCustomerform.dirty){
          if(usernameValidation && nameValidation && emailValidation && addressValidation && contactNumberValidation && passwordValidation && clientIdValidation)
          { 
           console.log(this.addCustomerform.value)

              this.api.registerCustomer(this.addCustomerform.value)
              .subscribe({
                next:(res)=>{
                  console.log(res)
                  this.addCustomerform.reset();
                  this.toast.success("customer added succesfully")
                  this.router.navigate(['superadmin/customer'])
                },
                error:(err)=>{
                  this.toast.error("registration has failed")
                  console.log("failed to add customer")

                }
              })
         }
      }

    return;
    
  }
}
