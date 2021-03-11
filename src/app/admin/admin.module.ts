import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardLayoutModule } from '../layout/dashboard-layout/dashboard-layout.module';
import { DashboardComponent } from './dashboard-layout/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.service';
import { AdminDashboardRoutingModule } from './dashboard-layout/admin-dashboard-layout.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '../layout/layout.module';
import { UsersComponent } from './dashboard-layout/admin-users/users.component';
import { AdminUsersModule } from './dashboard-layout/admin-users/admin-user.module';
import { CoreModule } from '@angular/flex-layout';
import { AdminDashboardModule } from './dashboard-layout/dashboard-layout.module';
import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';
import { MaterialModule } from '../material-module';




@NgModule({
  declarations: [ AdminSignInComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    DashboardLayoutModule,
    RouterModule,
    LayoutModule,
    CoreModule,
    ReactiveFormsModule,

    AdminRoutingModule,
    AdminDashboardRoutingModule,
    AdminUsersModule,
    AdminDashboardModule,
    MaterialModule,
   
    
    
  ],

  providers: [
    AdminRoutingModule,

  ]
})
export class AdminModule { }
