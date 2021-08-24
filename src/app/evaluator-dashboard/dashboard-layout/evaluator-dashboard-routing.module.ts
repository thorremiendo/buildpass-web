import { EsignatureGuard } from './../../core/guard/esignature.guard';
import { EsigPromptComponent } from './../../shared/esig-prompt/esig-prompt.component';
import { OldbpMasterlistComponent } from './../oldbp-masterlist/oldbp-masterlist.component';
import { OccupancyRequestsComponent } from './../occupancy-requests/occupancy-requests.component';
import { ESignatureComponent } from './../../shared/e-signature/e-signature.component';
import { DownloadableFormsComponent } from './../downloadable-forms/downloadable-forms.component';
import { UserGuardGuard } from './../../core/guard/user-guard.guard';
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
import { EvaluatorGuard } from 'src/app/core/guard/evaluator.guard';
import { EvaluatorAuthGuard } from 'src/app/core/guard/evaluator-guard';
import { FeedbackComponent } from 'src/app/shared/feedback/feedback.component';
import { ReportIssueComponent } from 'src/app/shared/report-issue/report-issue.component';

const routes: Routes = [
  {
    path: 'evaluator',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: EvaluatorHomeComponent,
        canActivate: [EvaluatorAuthGuard],
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
        path: 'esignature',
        component: ESignatureComponent,
      },
      {
        path: 'application/:id',
        component: ApplicationDetailsComponent,
      },
      {
        path: 'application/:id/:docId',
        component: EsigPromptComponent,
      },
      {
        path: 'application/sign/:id/:docId',
        component: ESignatureComponent,
        canActivate: [EsignatureGuard],
      },
      {
        path: 'edit-profile',
        component: EvaluatorEditProfileComponent,
      },
      {
        path: 'occupancy-requests',
        component: OccupancyRequestsComponent,
      },
      {
        path: 'master-list',
        component: OldbpMasterlistComponent,
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
        outlet: 'modal',
      },
      {
        path: 'report-issue',
        component: ReportIssueComponent,
        outlet: 'modal',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class EvaluatorDashboardRoutingModule {}
