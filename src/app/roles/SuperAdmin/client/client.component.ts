import { Component, OnInit } from '@angular/core';
import {ApipointsService} from '../Services/apipoints.service';
import {clients} from '../../../shared/model/client.model'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavService } from 'src/app/shared/services/nav.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  public data:any;
  cols = [
    { name: 'id', label: 'S.NO' },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
    { name: 'address', label: 'Adress' },
    { name: 'contact_number', label: 'Mobile' },
    { name: 'role', label: 'Role' },
    { name: 'created', label: 'Created' },
    { name: 'status', label: 'Status' },
  ];
  searchValue:string;
  
  //public clients!: any<object>;  

  constructor(private api:ApipointsService,
              public router: Router,
              private toast: ToastrService,
              ) { }
 
  ngOnInit(): void {
      this.getListOfClients();
      console.log(this.data)
  
  }

  getListOfClients(){
    
      
    let datas=[]
    this.api.getClients().subscribe((res) => {
    
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
        });
      }
    this.data=datas

    }
   
    });

    console.log(datas);
    
  }

  onEdit(client: any) {
    
    this.router.navigate(['superadmin/editclient',client.id]);
      
  }

  onDelete(id:number){
    console.log(id);
    this.api.deleteClient(id)
    .subscribe({
      next:(res)=>{
       this.toast.success("deleted successfully")
      },
      error:(err)=>{
        this.toast.success("unable to delete ")
      }
    })
  }

  onAddClient(){
    this.router.navigate(['superadmin/addclient']);
  }

 

}



