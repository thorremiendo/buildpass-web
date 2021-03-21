import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AdminUsersModule } from './user-management/user-management.module';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '../layout/layout.module';
import { AdminUsersListComponent } from './user-management/user-list/user-list.component';
import { CoreModule } from '@angular/flex-layout';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    RouterModule,
    LayoutModule,
    CoreModule,
    AdminDashboardRoutingModule
  ]
})
export class AdminDashboardModule { }
