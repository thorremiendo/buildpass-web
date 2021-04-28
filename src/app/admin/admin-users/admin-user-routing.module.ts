import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserInfoComponent } from '../admin-user-info/admin-user-info.component';
import { AdminApplicantListComponent } from './admin-applicant-list/admin-applicant-list.component';
import { AdminEmployeeListComponent } from './admin-employee-list/admin-employee-list.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: "admin/dashboard/users",
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
      }

     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsersRoutingModule { }
