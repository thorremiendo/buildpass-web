import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardLayoutModule } from '../../layout/dashboard-layout/dashboard-layout.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';



@NgModule({
  declarations: [DashboardComponent, UserHomeComponent],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    DashboardLayoutModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    MatCarouselModule.forRoot(),

    
  ]
})
export class UserDashboardModule { }
