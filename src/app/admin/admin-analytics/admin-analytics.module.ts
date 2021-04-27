import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { AdminAnalyticsRoutingModule } from './admin-analytics-routing.module';
import { AdminAnalyticsComponent } from './admin-analytics.component';
import { DashboardComponentsModule } from 'src/app/dashboard-components/dashboard-components.module';


@NgModule({
  declarations: [AdminAnalyticsComponent],
  imports: [
    CommonModule,
    DashboardComponentsModule,
  ]
})
export class AdminAnalyticsModule { }
