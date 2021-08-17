import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { AdminAnalyticsRoutingModule } from './admin-analytics-routing.module';
import { AdminAnalyticsComponent } from './admin-analytics.component';
import { DashboardComponentsModule } from 'src/app/dashboard-components/dashboard-components.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MaterialModule } from 'src/app/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [AdminAnalyticsComponent],
  imports: [
    CommonModule,
    DashboardComponentsModule,
    NgxChartsModule,
    MaterialModule,
    FlexLayoutModule,
   
  ]
})
export class AdminAnalyticsModule { }
