import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApipointsService } from '../../Services/apipoints.service';


@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.scss']
})
export class EditclientComponent implements OnInit {
  public editClientform!: FormGroup;
  constructor(public formbuilder: FormBuilder,
              private api:ApipointsService,
              public router: Router) { 

    let obj = this.router.getCurrentNavigation()?.extras?.state?.data;
    console.log(obj);
    console.log(this.router.getCurrentNavigation().extras.state.data);
              }

  ngOnInit(): void {
    
    this.editClientform = this.formbuilder.group({
      name:["",Validators.required],   
      email:["",Validators.required],
      address:["",Validators.required],
      contact_number:["",Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)],
      status:["",Validators.required],
    });
    

    // let client = this.router.getCurrentNavigation().extras.state.client;
    // this.editClientform.controls['name'].setValue(client.name);
    // this.editClientform.controls['email'].setValue(client.email);
    // this.editClientform.controls['address'].setValue(client.address);
    // this.editClientform.controls['contact_number'].setValue(client.contact_number);
    // this.editClientform.controls['status'].setValue(client.status);

  }

  

  editClient(){
    if(!this.editClientform.invalid){
      console.log(this.editClientform.value)
      
      this.api.editClient(this.editClientform.value)
      .subscribe({
        next:(res)=>{
          console.log(res)
          this.editClientform.reset();
          this.router.navigate(['superadmin/client'])
        },
        error:(err)=>{
          console.log(err)
          console.log("failed to Update client")
        }
      })
    }

    return;
  }


}
