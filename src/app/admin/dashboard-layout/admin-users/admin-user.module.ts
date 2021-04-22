import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsersRoutingModule } from './admin-user-routing.module';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { DashboardLayoutModule } from 'src/app/layout/dashboard-layout/dashboard-layout.module';
import { AdminEmployeeListComponent } from './admin-employee-list/admin-employee-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminEmployeeFiltersComponent } from './admin-employee-filters/admin-employee-filters.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminUserInfoComponent } from '../../admin-user-info/admin-user-info.component';
import { AdminEmployeeCreateComponent } from './admin-employee-create/admin-employee-create.component';
import { AdminEmployeeViewComponent } from './admin-employee-view/admin-employee-view.component';
import { MaterialModule } from 'src/app/material-module';


@NgModule({
  declarations: [
    UsersComponent,
    AdminEmployeeListComponent,
    AdminEmployeeFiltersComponent,
    AdminUserInfoComponent,
    AdminEmployeeCreateComponent,
    AdminEmployeeViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminUsersRoutingModule,
    DashboardLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
   

    Ng2SearchPipeModule,
    NgxPaginationModule
  ],

})
export class AdminUsersModule { }
