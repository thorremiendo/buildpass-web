import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserInfoComponent } from '../admin-user-info/admin-user-info.component';
import { AdminApplicantListComponent } from './admin-applicant-list/admin-applicant-list.component';
import { AdminEmployeeListComponent } from './admin-employee-list/admin-employee-list.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
 
  {
    path: 'admin/dashboard/users',
    component: UsersComponent,
    children: [
      {
        path: 'employees',
        component: AdminEmployeeListComponent,
      },

      {
        path: 'applicants',
        component: AdminApplicantListComponent,
      },

      {
        path: ':uid',
        component: AdminUserInfoComponent,
      },
    ],
  },
 
  {
    path: 'admin/employees',
    redirectTo: 'admin/dashboard/users/employees',
    pathMatch: 'full',
  },

  {
    path: 'admin/applicants',
    redirectTo: 'admin/dashboard/users/applicants',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUsersRoutingModule {}
