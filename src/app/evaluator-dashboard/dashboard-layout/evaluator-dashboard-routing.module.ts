import { NoticeOfViolationSummaryComponent } from './../notice-of-violation-summary/notice-of-violation-summary.component';
import { DetailsNoticeOfViolationComponent } from './../details-notice-of-violation/details-notice-of-violation.component';
import { NoticeOfViolationFormsComponent } from './../notice-of-violation-forms/notice-of-violation-forms.component';
import { NoticeOfViolationOptionsComponent } from './../notice-of-violation-options/notice-of-violation-options.component';
import { NewNoticeOfViolationComponent } from './../new-notice-of-violation/new-notice-of-violation.component';
import { NoticeOfViolationComponent } from './../notice-of-violation/notice-of-violation.component';
import { SchedulingComponent } from './../scheduling/scheduling.component';
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
import { ApplicationInfoComponent } from 'src/app/shared/application-info/application-info.component';

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
      // {
      //   path: 'esignature',
      //   component: ESignatureComponent,
      // },
      {
        path: 'application/:id',
        component: ApplicationDetailsComponent,
      },
      {
        path: 'application/:id/test',
        component: ApplicationInfoComponent,
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
      {
        path: 'schedule',
        component: SchedulingComponent,
      },
      {
        path: 'nov',
        component: NoticeOfViolationComponent,
      },
      {
        path: 'nov/new',
        component: NewNoticeOfViolationComponent,
      },
      {
        path: 'nov/new/details/:id',
        component: DetailsNoticeOfViolationComponent,
      },
      {
        path: 'nov/new/form/:id',
        component: NoticeOfViolationFormsComponent,
      },
      {
        path: 'nov/view/:id',
        component: NoticeOfViolationSummaryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class EvaluatorDashboardRoutingModule {}
