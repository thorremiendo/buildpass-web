import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAnalyticsComponent } from './admin-analytics.component';

const routes: Routes = [{
  path:"admin/dashboard/analytics",
  component:AdminAnalyticsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAnalyticsRoutingModule { }
