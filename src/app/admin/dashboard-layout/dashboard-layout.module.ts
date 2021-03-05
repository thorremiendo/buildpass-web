import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from '@angular/flex-layout';
import { AdminDashboardRoutingModule } from './admin-dashboard-layout.routing.module';
import { RouterModule } from '@angular/router';
import { AdminUsersModule } from './admin-users/admin-user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from 'src/app/layout/layout.module';
import { UsersComponent } from './admin-users/users.component';
import { DashboardLayoutModule } from 'src/app/layout/dashboard-layout/dashboard-layout.module';
import { AdminAnalyticsModule } from '../admin-analytics/admin-analytics.module';





@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    CoreModule,
    LayoutModule,
    RouterModule,
    NgbModule,
    DashboardLayoutModule,
    AdminDashboardRoutingModule,
    AdminUsersModule,
    AdminAnalyticsModule,
  ]
})
export class AdminDashboardModule { }
