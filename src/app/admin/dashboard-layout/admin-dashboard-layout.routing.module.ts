import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/admin/dashboard-layout/dashboard/dashboard.component';
import { UsersComponent } from './admin-users/users.component';


const routes: Routes = [
  {
      path:"admin/dashboard",
      component:DashboardComponent,
      // children:[
      // {
      //     path: 'users',
      //     component:UsersComponent,
      // }]
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
