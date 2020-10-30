import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ExistingApplicationsComponent } from '../existing-applications/existing-applications.component';
import { NewApplicationComponent } from '../new-application/new-application.component';
import { UserFormsComponent } from '../user-forms/user-forms.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
      path: "dashboard",
      component: DashboardComponent,
      children: [
        {
          path: "",
          component: UserHomeComponent,
          pathMatch: "full",
        },
        {
          path: "new",
          component: NewApplicationComponent
        },
        {
          path: "applications",
          component: ExistingApplicationsComponent
        },
        {
          path: "forms",
          component: UserFormsComponent
        }

      ],
    },
  ];

  @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class UserDashboardRoutingModule {}