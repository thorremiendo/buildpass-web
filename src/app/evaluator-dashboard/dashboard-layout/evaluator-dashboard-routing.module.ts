import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationDetailsComponent } from '../application-details/application-details.component';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { ClosedTasksComponent } from '../closed-tasks/closed-tasks.component';
import { EvaluatorEditProfileComponent } from '../evaluator-edit-profile/evaluator-edit-profile.component';
import { EvaluatorHomeComponent } from '../evaluator-home/evaluator-home.component';
import { NewTasksComponent } from '../new-tasks/new-tasks.component';
import { OpenedTasksComponent } from '../opened-tasks/opened-tasks.component';
import { TableViewComponent } from '../table-view/table-view.component';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'evaluator',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: EvaluatorHomeComponent,
        children: [
          {
            path: 'table',
            component: TableViewComponent,
          },
    
          {
            path: 'calendar',
            component: CalendarViewComponent,
          },
        ],
      },
      {
        path: 'new-tasks',
        component: NewTasksComponent,
      },
      {
        path: 'opened-tasks',
        component: OpenedTasksComponent,
      },
      {
        path: 'closed-tasks',
        component: ClosedTasksComponent,
      },
      {
        path: 'application/:id',
        component: ApplicationDetailsComponent,
      },
      {
        path:'edit-profile',
        component: EvaluatorEditProfileComponent,

      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class EvaluatorDashboardRoutingModule {}
