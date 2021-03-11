import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';
import { DashboardComponent } from './dashboard-layout/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'admin',
    children: [

      {
        path: '',
        component: DashboardComponent,
      },

      {
        path:'sign-in',
        component:AdminSignInComponent,
      }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
