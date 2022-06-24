import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {ApipointsService} from '../../Services/apipoints.service'
@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.scss']
})
export class AddclientComponent implements OnInit {
  public addClientform!: FormGroup;
  constructor(public formbuilder:FormBuilder,
             private api:ApipointsService,
             public router: Router) { }

  ngOnInit(): void {
    let now = new Date();
    this.addClientform = this.formbuilder.group({
      name:["",Validators.required],   
      email:["",Validators.required],
      address:["",Validators.required],
      contact_number:["",Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)],
      password:["",Validators.required],
      status:["",Validators.required],
      
    });
  }

  addClient(){
    
    if(!this.addClientform.invalid){
      console.log(this.addClientform.value)
      
      this.api.registerClient(this.addClientform.value)
      .subscribe({
        next:(res)=>{
          console.log(res)
          this.addClientform.reset();
          this.router.navigate(['superadmin/client'])
        },
        error:(err)=>{
          console.log(err)
          console.log("failed to add client")
        }
      })
    }

    return;
    
  }

}
