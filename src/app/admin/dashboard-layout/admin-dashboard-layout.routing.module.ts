import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/admin/dashboard-layout/dashboard/dashboard.component';
import { ApplicationsListComponent } from 'src/app/shared/applications-list/applications-list.component';
import { AdminAnalyticsComponent } from '../admin-analytics/admin-analytics.component';
import { AdminAnnouncementComponent } from '../admin-announcement/admin-announcement.component';
import { AdminApplicationListComponent } from '../admin-application-list/admin-application-list.component';
import { UserFeedbackComponent } from '../user-feedback/user-feedback.component';

const routes: Routes = [
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'analytics',
        component: AdminAnalyticsComponent,
      },

      {
        path: 'announcement',
        component: AdminAnnouncementComponent,
      },

      {
        path: 'feedback',
        component: UserFeedbackComponent,
      },

      {
        path: 'application',
        component: AdminApplicationListComponent,
        children:[{
          path: ':id',
          component:ApplicationsListComponent,
        }]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
