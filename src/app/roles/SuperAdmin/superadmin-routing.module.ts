import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultComponent} from './default/default.component';
import {ClientComponent} from './client/client.component';
import {CustomerComponent} from './customer/customer.component';
import {SecurityComponent} from './security/security.component';
import {VisitorComponent} from './visitor/visitor.component'
import { AddclientComponent } from './client/addclient/addclient.component';
import {EditclientComponent} from './client/editclient/editclient.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DefaultComponent
      },
      {
        path: 'default',
        component: DefaultComponent
      },
      {
        path:'client',
        component:ClientComponent,
         
      }, 
      {
        path:'editclient/:id', 
        component:EditclientComponent
      },

      {
        path:'addclient', 
        component:AddclientComponent
      },
      
      {
        path:'customer',
        component:CustomerComponent
      },
      {
        path:'security',
        component:SecurityComponent
      },
      {
        path:'visitor',
        component:VisitorComponent
      }
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
