import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CountToModule } from 'angular-count-to';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AgmCoreModule } from '@agm/core';


import {ClientRoutingModule} from './client-routing.module'
import {DefaultComponent} from './default/default.component'
import {CustomerComponent} from './customer/customer.component'
import {SecurityComponent} from './security/security.component'
import {VisitorComponent} from './visitor/visitor.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
 

@NgModule({
  declarations: [
    DefaultComponent,
    CustomerComponent,
    SecurityComponent,
    VisitorComponent
    ],
  imports: [
    CommonModule,
    ChartistModule,
    ChartsModule,
    NgApexchartsModule,
    SharedModule,
    CarouselModule,
    CKEditorModule,
    CountToModule,
    NgbModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    NgxDatatableModule,
    ClientRoutingModule,
    
  ]
})
export class ClientModule { }
