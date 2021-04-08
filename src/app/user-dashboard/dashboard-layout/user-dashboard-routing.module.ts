import { UserGuardGuard } from './../../core/guard/user-guard.guard';
import { UserGuardService } from './../../core/guard/user-guard.service';
import { UserResolver } from './../../core/guard/user.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExistingApplicationsComponent } from '../existing-applications/existing-applications.component';
import { ChecklistSummaryComponent } from '../new-application/checklist-summary/checklist-summary.component';
import { StepOneComponent } from '../new-application/step-one/step-one.component';
import { SuccessPageComponent } from '../new-application/success-page/success-page.component';
import { UserFormsComponent } from '../user-forms/user-forms.component';
import { UserHomeComponent } from '../user-home/user-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonFieldsComponent } from '../new-application/common-fields/common-fields-home/common-fields.component';
import { CommonFieldsPersonalInfoComponent } from '../new-application/common-fields/common-fields-personal-info/common-fields-personal-info.component';
import { CommonFieldsAddressInfoComponent } from '../new-application/common-fields/common-fields-address-info/common-fields-address-info.component';
import { CommonFieldsRepresentativeComponent } from '../new-application/common-fields/common-fields-representative/common-fields-representative.component';
import { UserEditProfileComponent } from '../user-edit-profile/user-edit-profile.component';
import { ViewApplicationComponent } from '../view-application/view-application.component';
import { UserApplicationsTableComponent } from '../user-applications-table/user-applications-table.component';
import { BuildingPermitComponent } from '../new-application/building-permit/building-permit.component';
import { OccupancyPermitComponent } from '../new-application/occupancy-permit/occupancy-permit.component';
import { ExcavationPermitComponent } from '../new-application/excavation-permit/excavation-permit.component';
import { FencingPermitComponent } from '../new-application/fencing-permit/fencing-permit.component';
import { DemolitionPermitComponent } from '../new-application/demolition-permit/demolition-permit.component';
import { NewApplicationPageComponent } from '../new-application/new-application-page/new-application-page.component';
import { NewApplicationRouterComponent } from '../new-application/new-application-router/new-application-router.component';
import { ApplicationSummaryComponent } from 'src/app/shared/application-summary/application-summary.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [UserGuardGuard],
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
                path: 'step-two',
                component: CommonFieldsComponent,
                children: [
                  {
                    path: 'lot-owner',
                    component: CommonFieldsPersonalInfoComponent,
                  },

                  {
                    path: 'project-site',
                    component: CommonFieldsAddressInfoComponent,
                  },
                  {
                    path: 'representative',
                    component: CommonFieldsRepresentativeComponent,
                  },
                ],
              },
              {
                path: 'details/:id',
                component: ApplicationSummaryComponent,
              },
              {
                path: 'building-permit',
                component: BuildingPermitComponent,
              },
              {
                path: 'occupancy-permit',
                component: OccupancyPermitComponent,
              },
              {
                path: 'excavation-permit',
                component: ExcavationPermitComponent,
              },
              {
                path: 'fencing-permit',
                component: FencingPermitComponent,
              },
              {
                path: 'demolition-permit',
                component: DemolitionPermitComponent,
              },
              {
                path: 'summary/:id',
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
        children: [
          {
            path: '',
            component: UserApplicationsTableComponent,
            pathMatch: 'full',
          },
          {
            path: 'view/:id',
            component: ViewApplicationComponent,
          },
        ],
      },
      {
        path: 'forms',
        component: UserFormsComponent,
      },
      {
        path: 'edit-profile',
        component: UserEditProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 10],
    }),
  ],
  exports: [RouterModule],
})
export class UserDashboardRoutingModule {}
