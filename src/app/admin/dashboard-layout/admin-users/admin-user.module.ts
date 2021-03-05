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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminUserInfoComponent } from '../../admin-user-info/admin-user-info.component';
import { AdminUsersCreateComponent } from './admin-users-create/admin-users-create.component';
import { AdminUsersViewComponent } from './admin-users-view/admin-users-view.component';


@NgModule({
  declarations: [
    UsersComponent,
    AdminUsersListComponent,
    AdminUsersFiltersComponent,
    AdminUserInfoComponent,
    AdminUsersCreateComponent,
    AdminUsersViewComponent,
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
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSelectModule,

    Ng2SearchPipeModule,
    NgxPaginationModule
  ],

})
export class AdminUsersModule { }
