import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExistingApplicationsComponent } from '../existing-applications/existing-applications.component';
import { AffidavitFilesComponent } from '../new-application/affidavit-files/affidavit-files.component';
import { BuildingPermitFormsComponent } from '../new-application/building-permit-forms/building-permit-forms.component';
import { ChecklistSummaryComponent } from '../new-application/checklist-summary/checklist-summary.component';
import { ClearanceFormsComponent } from '../new-application/clearance-forms/clearance-forms.component';
import { DesignAnalysisFormsComponent } from '../new-application/design-analysis-forms/design-analysis-forms.component';
import { InitialFormsComponent } from '../new-application/initial-forms/initial-forms.component';
import { NewApplicationPageComponent } from '../new-application/new-application-page/new-application-page.component';
import { NewApplicationRouterComponent } from '../new-application/new-application-router/new-application-router.component';
import { OtherRequirementsComponent } from '../new-application/other-requirements/other-requirements.component';
import { ProfessionalDetailsComponent } from '../new-application/professional-details/professional-details.component';
import { StepOneComponent } from '../new-application/step-one/step-one.component';
import { SuccessPageComponent } from '../new-application/success-page/success-page.component';
import { UserFormsComponent } from '../user-forms/user-forms.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../../core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UserHomeComponent,
        pathMatch: 'full',
        data: {
          title: 'Dashboard',
          urls: [{ title: 'Home', url: '/dashboard' }, { title: 'Dashboard' }],
        },
      },
      {
        path: 'new',
        component: NewApplicationPageComponent,
        children: [
          {
            path: '',
            component: NewApplicationRouterComponent,
            children: [
              {
                path: 'step-one',
                component: StepOneComponent,
                data: {
                  title: 'Step One',
                  urls: [
                    {
                      title: 'New Application',
                      url: '/dashboard/new/step-one',
                    },
                    { title: 'Step One' },
                  ],
                },
              },
              {
                path: 'initial-forms',
                component: InitialFormsComponent,
                data: {
                  title: 'Initial Forms',
                  urls: [
                    {
                      title: 'New Application',
                      url: '/dashboard/new/step-one',
                    },
                    { title: 'Initial Forms' },
                  ],
                },
              },
              {
                path: 'building-permit-forms',
                component: BuildingPermitFormsComponent,
                data: {
                  title: 'Building Permit Forms',
                  urls: [
                    {
                      title: 'New Application',
                      url: '/dashboard/new/step-one',
                    },
                    { title: 'Building Permit Forms' },
                  ],
                },
              },
              {
                path: 'design-analysis',
                component: DesignAnalysisFormsComponent,
                data: {
                  title: 'Design Analysis',
                  urls: [
                    {
                      title: 'New Application',
                      url: '/dashboard/new/step-one',
                    },
                    { title: 'Design Analysis' },
                  ],
                },
              },
              {
                path: 'professional-details',
                component: ProfessionalDetailsComponent,
                data: {
                  title: 'Professional Details',
                  urls: [
                    {
                      title: 'New Application',
                      url: '/dashboard/new/step-one',
                    },
                    { title: 'Professional Details' },
                  ],
                },
              },
              {
                path: 'clearances',
                component: ClearanceFormsComponent,
                data: {
                  title: 'Clearance Forms',
                  urls: [
                    {
                      title: 'New Application',
                      url: '/dashboard/new/step-one',
                    },
                    { title: 'Clearance Forms' },
                  ],
                },
              },
              {
                path: 'affidavits',
                component: AffidavitFilesComponent,
                data: {
                  title: 'Affidavits',
                  urls: [
                    {
                      title: 'New Application',
                      url: '/dashboard/new/step-one',
                    },
                    { title: 'Affidavits' },
                  ],
                },
              },
              {
                path: 'other-requirements',
                component: OtherRequirementsComponent,
                data: {
                  title: 'Other Requirements',
                  urls: [
                    {
                      title: 'New Application',
                      url: '/dashboard/new/step-one',
                    },
                    { title: 'Other Requirements' },
                  ],
                },
              },
              {
                path: 'summary',
                component: ChecklistSummaryComponent,
                data: {
                  title: 'Checklist',
                  urls: [
                    {
                      title: 'New Application',
                      url: '/dashboard/new/step-one',
                    },
                    { title: 'Checklist' },
                  ],
                },
              },
              {
                path: 'success',
                component: SuccessPageComponent,
                data: {
                  title: 'Application Submitted',
                  urls: [
                    {
                      title: 'New Application',
                      url: '/dashboard/new/step-one',
                    },
                    { title: 'Application Submitted' },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        path: 'applications',
        component: ExistingApplicationsComponent,
      },
      {
        path: 'forms',
        component: UserFormsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class UserDashboardRoutingModule {}
