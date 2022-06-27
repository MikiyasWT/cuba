import { Component, OnInit } from '@angular/core';
import {ApipointsService} from '../Services/apipoints.service';
import {clients} from '../../../shared/model/client.model'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  data:any;
  cols = [
    { name: 'id', label: 'S.NO' },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
    { name: 'address', label: 'Adress' },
    { name: 'contact_number', label: 'Mobile' },
    { name: 'role', label: 'Role' },
    { name: 'created', label: 'Created' },
    { name: 'status', label: 'Status' },
    { name: 'client_name', label: 'client_name' },
  ];

  constructor(private api:ApipointsService,
              public router: Router,
              private toast: ToastrService) { }

  ngOnInit(): void {
          this.getListOfCustomers();
                console.log(this.data)
            
            }

            getListOfCustomers(){
    
      
              let datas=[]
              this.api.getCustomers().subscribe((res) => {
              
              if(res.status ===1){
                
                for (let i = 0; i < res.data.length; i++) {
                  let status;
                  if (res.data[i].status == 1) {
                    status = 'Active';
                  } else if(res.data[i].status ==0){
                    status = 'Inactive';
                  }
                  
          
               datas.push({
                    id: res.data[i].id,
                    name: res.data[i].name,
                    contact_number:res.data[i].contact_number,
                    email:res.data[i].email,
                    address: res.data[i].address,
                    status: status,
                    role:res.data[i].role,
                    created:res.data[i].created,
                    client_name:res.data[i].client_name
                  });
                }
              this.data=datas
          
              }
             
              });
          
              console.log(datas);
              
            }

            
    onEdit(customer: any) {
              this.router.navigate(['superadmin/editcustomer',customer.id]);
          } 
          
    onDelete(id:number){
            console.log(id);
            this.api.deleteCustomer(id)
            .subscribe({
              next:(res)=>{
               this.toast.success("deleted successfully")
              },
              error:(err)=>{
                this.toast.error("unable to delete")
              }
            })
          }

          
    onAddCustomer(){
            this.router.navigate(['superadmin/addcustomer']);
          }      
}




