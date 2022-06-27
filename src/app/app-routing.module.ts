import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ContentComponent } from "./shared/components/layout/content/content.component";
import { FullComponent } from "./shared/components/layout/full/full.component";
import { full } from "./shared/routes/full.routes";
import { content } from "./shared/routes/routes";

import { AdminGuard } from './shared/guard/admin.guard';
import {DefaultComponent} from './roles/SuperAdmin/default/default.component';
import {DefaultComponent as ClientDefaultComponent} from './roles/Client/default/default.component'
import {DefaultComponent as CustomerDefaultComponent } from './roles/Customer/default/default.component';
import {DefaultComponent as SecuriityDefaultComponent} from './roles/Security/default/default.component'
import {DefaultComponent as VisitorComponent} from './roles/Visitor/default/default.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: '',
    component: ContentComponent,
    canActivate: [AdminGuard],
    children: content
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [AdminGuard],
    children: full
  },   
  
  {
    path:'superadmin',
    component:DefaultComponent,
    canActivate:[AdminGuard],
    children:content
  },
  {   
    path:'client',
    component:ClientDefaultComponent,
    canActivate:[AdminGuard],
    children:content
  },
  {
    path:'customer',
    component:CustomerDefaultComponent,
    canActivate:[AdminGuard],
    children:content
  },
  {
    path:'security',
    component:SecuriityDefaultComponent,
    canActivate:[AdminGuard],
    children:content
  },
  {
    path:'visitor',
    component:VisitorComponent,
    canActivate:[AdminGuard],
    children:content
  },

  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})],
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
