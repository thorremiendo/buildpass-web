import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserHomeComponent } from '../user-home/user-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
      path: "dashboard/home",
      component: DashboardComponent,
      children: [
        {
          path: "",
          component: UserHomeComponent,
          pathMatch: "full",
        }
      ],
    },
  ];

  @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class UserDashboardRoutingModule {}