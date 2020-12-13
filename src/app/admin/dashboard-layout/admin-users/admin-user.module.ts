import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { DashboardLayoutModule } from 'src/app/layout/dashboard-layout/dashboard-layout.module';
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminUsersFiltersComponent } from './admin-users-filters/admin-users-filters.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { AdminUsersTableComponent } from './admin-users-table/admin-users-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AdminUserInfoComponent } from '../../admin-user-info/admin-user-info.component';


@NgModule({
  declarations: [
    UsersComponent,
    AdminUsersListComponent,
    AdminUsersFiltersComponent,
    AdminUsersTableComponent,
    AdminUserInfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminUsersRoutingModule,
    DashboardLayoutModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    FormsModule,
    MatProgressBarModule,
    ReactiveFormsModule
  ],

})
export class AdminUsersModule { }
