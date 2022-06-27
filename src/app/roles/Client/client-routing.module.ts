import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerComponent} from './customer/customer.component'
import {DefaultComponent} from './default/default.component'
import {SecurityComponent} from './security/security.component'
import {VisitorComponent} from './visitor/visitor.component'

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
        path:'customer',
        component:CustomerComponent,
         
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
export class ClientRoutingModule { }



