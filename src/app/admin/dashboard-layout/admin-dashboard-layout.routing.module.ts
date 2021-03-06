import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/admin/dashboard-layout/dashboard/dashboard.component';
import { AdminAnalyticsComponent } from '../admin-analytics/admin-analytics.component';


const routes: Routes = [
  {
      path:"admin/dashboard",
      component:DashboardComponent,
      children:[{
        
        path:"analytics",
        component:AdminAnalyticsComponent
      }]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
