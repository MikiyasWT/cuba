import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApipointsService } from '../../Services/apipoints.service';


@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.scss']
})
export class EditclientComponent implements OnInit {
  public editClientform!: FormGroup;
  //public initalValues:[];
  row: any[];
  data: any[];
  selectedID: any;
  
  constructor(public formbuilder: FormBuilder,
              private api:ApipointsService,
              public route:ActivatedRoute,
              public router: Router,
              private toast: ToastrService) { 
    
    this.selectedID = this.route.snapshot.paramMap.get('id');
    
              }
 
  ngOnInit(): void {

    this.editClientform = this.formbuilder.group({
      id:["",Validators.required],
      name:["",Validators.required], 
      contact_number:["",Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)],  
      status:["",Validators.required],
      address:["",Validators.required],
      email:["",Validators.required,Validators.maxLength(50)], 
    });



    
    // let client = this.router.getCurrentNavigation().extras.state.client;
 
    let datas=[]

    this.api.getClients()
    .subscribe((res)=>{
      for (let i = 0; i < res.data.length; i++) {
        let status;
        if (res.data[i].status == 1) {
          status = 'Active';
        } else {
          status = 'Inactive';
        }
        datas.push({
          id: res.data[i].id,
          name: res.data[i].name,
          contact_number: res.data[i].contact_number,
          status: status,
          address: res.data[i].address,
          email: res.data[i].email
        });
      }

      this.row=datas.filter(data => data.id==this.selectedID)
      this.data = datas;
      
      let tempid = this.row.filter(data =>data.id )
      let tempname = this.row.filter(data => data.name)
      let tempcontact_number = this.row.filter(data => data.contact_number)
      let tempstatus = this.row.filter(data => data.status)
      let tempaddress = this.row.filter(data => data.address)
      let tempemail = this.row.filter(data => data.email)

      let eid = tempid[0]['id']
      let ename = tempname[0]['name'];
      let econtact_number = tempcontact_number[0]['contact_number'];
      let estatus = tempstatus[0]['status'];
      let eaddress = tempaddress[0]['address']
      let eemail = tempemail[0]['email'];

      
    
    this.editClientform.controls['id'].setValue(eid);  
    this.editClientform.controls['name'].setValue(ename);
    this.editClientform.controls['email'].setValue(eemail);
    this.editClientform.controls['address'].setValue(eaddress);
    this.editClientform.controls['contact_number'].setValue(econtact_number);
    if(econtact_number.value === "Inactive"){
      this.editClientform.controls['status'].setValue("0");
    }
    this.editClientform.controls['status'].setValue("1");

    this.editClientform.controls['id'].disable();

    //this.initalValues = this.editClientform.value;
    },
    (err)=>{
        console.log(err)
    })
    
           
  }

  

  editClient(){
    //to validate whether changes were made or not
    // if (this.initalValues === this.editClientform.value) {
    //          return false;
    //     }
      
    console.log(this.editClientform.controls['status'].value);
    
    //validating field are not empty
   
    let nameValidation =  this.editClientform.controls['name'].value.length > 2 || this.editClientform.controls['name'].value.length < 15; 
    console.log("name")
    console.log(nameValidation)
    let contactNumberValidation = this.editClientform.controls['contact_number'].value.length > 0 && this.editClientform.controls['contact_number'].value.length <=10;
    console.log("contact")
    console.log(contactNumberValidation);
    let emailValidation = this.editClientform.controls['email'].value.length < 8 && this.editClientform.controls['email'].value.length > 50; 
    console.log("email")
    console.log(emailValidation)
    let addressValidation = this.editClientform.controls['address'].value.length < 3 && this.editClientform.controls['address'].value.length > 50; 
    console.log("address")
    console.log(addressValidation)

    if(!this.editClientform.invalid){

      console.log("this.editClientform.getRawValue()")
      console.log(this.editClientform.getRawValue())
      
      this.api.editClient(this.editClientform.getRawValue())
      .subscribe({
        next:(res)=>{
          console.log(res)
          this.editClientform.reset();
          this.toast.success("Updated successfully")
          this.router.navigate(['superadmin/client'])
        },
        error:(err)=>{
          console.log(err)
          this.toast.error("unable to update client")
          console.log("failed to Update client")
        }
      })
    }

    return;
  }


}
