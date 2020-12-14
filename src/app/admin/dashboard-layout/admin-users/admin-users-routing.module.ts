import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserInfoComponent } from '../../admin-user-info/admin-user-info.component';
import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: "admin/dashboard/users",
    component: UsersComponent,
    children: [
      {
        path: '',
        component: AdminUsersListComponent,
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
