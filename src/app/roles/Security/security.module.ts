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


import { DefaultComponent } from './default/default.component';
import {VisitorsComponent} from './visitors/visitors.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {SecurityRoutingModule} from './security-routing.module'


@NgModule({
  declarations: [
    DefaultComponent,
    VisitorsComponent,
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
    SecurityRoutingModule,
    
  ]
})
export class SecurityModule { }
