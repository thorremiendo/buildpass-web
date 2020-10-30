import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home/user-home.component';
import { DashboardComponent } from './dashboard-layout/dashboard/dashboard.component';
import { UserDashboardRoutingModule } from './dashboard-layout/user-dashboard-routing.module';
import { DashboardLayoutModule } from '../layout/dashboard-layout/dashboard-layout.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '../layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { UserDashboardModule } from './dashboard-layout/dashboard-layout.module';
import { UserRoutingModule } from './user-routing.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { NewApplicationComponent } from './new-application/new-application.component';
import { ExistingApplicationsComponent } from './existing-applications/existing-applications.component';
import { UserFormsComponent } from './user-forms/user-forms.component';



@NgModule({
  declarations: [
    // UserHomeComponent, 
    // DashboardComponent
  NewApplicationComponent,
    ExistingApplicationsComponent,
    UserFormsComponent],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    DashboardLayoutModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule,
    MatToolbarModule,
    FormsModule,
    LayoutModule,
    BrowserModule,
    UserDashboardModule,
    UserRoutingModule,
    MatCarouselModule.forRoot(),

  ]
})
export class UserModule { }
