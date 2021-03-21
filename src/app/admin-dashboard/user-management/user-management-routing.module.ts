import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: "admin/dashboard/users",
    component: AdminUsersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminUsersRoutingModule { }
