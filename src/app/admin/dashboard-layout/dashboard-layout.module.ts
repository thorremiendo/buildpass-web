import { NgModule } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-layout.routing.module';
import { AdminUsersModule } from '../admin-users/admin-user.module';
import { DashboardLayoutModule } from 'src/app/layout/dashboard-layout/dashboard-layout.module';
import { AdminAnalyticsModule } from '../admin-analytics/admin-analytics.module';
import { UserFeedbackModule } from '../user-feedback/user-feedback.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    CommonModule,
    CoreModule,
    LayoutModule,
    RouterModule,
    DashboardLayoutModule,
    AdminDashboardRoutingModule,
    AdminUsersModule,
    AdminAnalyticsModule,
    UserFeedbackModule,
  ],
})
export class AdminDashboardModule {}
