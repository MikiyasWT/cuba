import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultComponent} from './default/default.component'
import {RequestPermissionComponent} from './request-permission/request-permission.component'

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
        path:'request',
        component:RequestPermissionComponent,
         
      }
      
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorRoutingModule { }
