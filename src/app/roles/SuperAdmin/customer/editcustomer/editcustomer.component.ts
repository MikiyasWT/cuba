import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApipointsService } from '../../Services/apipoints.service';

@Component({
  selector: 'app-editcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.scss']
})
export class EditcustomerComponent implements OnInit {
  public editCustomerform!:FormGroup
  selectedID: any;
  row: any[];
  data: any[];

  constructor(public formbuilder: FormBuilder,
    private api:ApipointsService,
    public route:ActivatedRoute,
    public router: Router,
    private toast: ToastrService) { 

    this.selectedID = this.route.snapshot.paramMap.get('id');

    }

  ngOnInit(): void {

    this.editCustomerform = new FormGroup({
      username: new FormControl(),
      id:new FormControl(),
      name:new FormControl(),
      contact_number:new FormControl(),
      address:new FormControl(),
      email:new FormControl(),
      status:new FormControl()
   });

   let datas=[]

   this.api.getCustomers()
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
         username:res.data[i].username,
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

     
   
   this.editCustomerform.controls['id'].setValue(eid);  
   this.editCustomerform.controls['name'].setValue(ename);
   this.editCustomerform.controls['email'].setValue(eemail);
   this.editCustomerform.controls['address'].setValue(eaddress);
   this.editCustomerform.controls['contact_number'].setValue(econtact_number);
   this.editCustomerform.controls['status'].setValue("1");
   if(estatus === "Inactive"){
     this.editCustomerform.controls['status'].setValue("0");
   } 

   

   this.editCustomerform.controls['id'].disable();

   
   //this.initalValues = this.editClientform.value;
   },
   (err)=>{
       console.log(err)
   })
   

  }

  editCustomer(){

    let nameValidation =  this.editCustomerform.controls['name'].value.length > 2 || this.editCustomerform.controls['name'].value.length < 15; 
    let phoneLength = this.editCustomerform.controls['contact_number'].value.toString().length;
    let contactNumberValidation = false;
    if(phoneLength == 10){
      contactNumberValidation = true
    }
    let emailValidation = this.editCustomerform.controls['email'].value.length > 8 && this.editCustomerform.controls['email'].value.length < 50; 
    
    let addressValidation = this.editCustomerform.controls['address'].value.length > 3 && this.editCustomerform.controls['address'].value.length < 50; 

    if(this.editCustomerform.dirty){
      if(nameValidation && contactNumberValidation && emailValidation && addressValidation){
       console.log("this.editCustomerform.getRawValue()")
       console.log(this.editCustomerform.getRawValue())

       
       this.api.editCustomer(this.editCustomerform.getRawValue())
       .subscribe({
         next:(res)=>{
           console.log(res)
           this.editCustomerform.reset();
           this.toast.success("Updated successfully")
           this.router.navigate(['superadmin/customer'])
         },
         error:(err)=>{
           console.log(err)
           this.toast.error("unable to update customer")
           console.log("failed to Update customer")
         }
       })
      }
   }

   return 

  }

}



