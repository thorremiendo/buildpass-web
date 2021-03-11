import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopCardComponent } from './top-card/top-card.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { TopCardTwoComponent } from './top-card-two/top-card-two.component';



@NgModule({
  declarations: [
    TopCardComponent,
    BarChartComponent,
    DonutChartComponent,
    TopCardTwoComponent],

  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    
    MatIconModule,
    MatCardModule,
    MaterialModule,
    FlexLayoutModule,
    ChartsModule,
    NgApexchartsModule
  ],

  exports:[
    TopCardComponent,
    BarChartComponent,
    DonutChartComponent,
    TopCardTwoComponent,

  ]
   
})
export class DashboardComponentsModule { }
