import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultComponent} from './default/default.component';
import {VisitorsComponent} from './visitors/visitors.component'




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
        path:'visitor',
        component:VisitorsComponent,
         
      }
      
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
