import { BuildingPlansComponent } from './../new-application/building-plans/building-plans.component';
import { NoticeOfConstructionComponent } from './../new-application/forms/notice-of-construction/notice-of-construction.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuardService } from 'src/app/core/guard/user-guard.service';
import { ExistingApplicationsComponent } from '../existing-applications/existing-applications.component';
import { AffidavitFilesComponent } from '../new-application/affidavit-files/affidavit-files.component';
import { BuildingPermitFormsComponent } from '../new-application/building-permit-forms/building-permit-forms.component';
import { ChecklistSummaryComponent } from '../new-application/checklist-summary/checklist-summary.component';
import { ClearanceFormsComponent } from '../new-application/clearance-forms/clearance-forms.component';
import { DesignAnalysisFormsComponent } from '../new-application/design-analysis-forms/design-analysis-forms.component';
import { DocumentaryRequirementsComponent } from '../new-application/documentary-requirements/documentary-requirements.component';
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
import { ZoningClearanceFormComponent } from '../new-application/forms/zoning-clearance-form/zoning-clearance-form.component';
import { BuildingPermitFormComponent } from '../new-application/forms/building-permit-form/building-permit-form.component';
import { SanitaryPermitFormComponent } from '../new-application/forms/sanitary-permit-form/sanitary-permit-form.component';
import { ElectricalPermitFormComponent } from '../new-application/forms/electrical-permit-form/electrical-permit-form.component';
import { CivilEngineerAffidavitComponent } from '../new-application/forms/civil-engineer-affidavit/civil-engineer-affidavit.component';
import { GeodeticEngineerAffidavitComponent } from '../new-application/forms/geodetic-engineer-affidavit/geodetic-engineer-affidavit.component';
import { CommonFieldsComponent } from '../new-application/common-fields/common-fields-home/common-fields.component';
import { CommonFieldsPersonalInfoComponent } from '../new-application/common-fields/common-fields-personal-info/common-fields-personal-info.component';
import { CommonFieldsAddressInfoComponent } from '../new-application/common-fields/common-fields-address-info/common-fields-address-info.component';
import { CommonFieldsRepresentativeComponent } from '../new-application/common-fields/common-fields-representative/common-fields-representative.component';
import { UserEditProfileComponent } from '../user-edit-profile/user-edit-profile.component';
import { AdditionalPermitsComponent } from '../new-application/additional-permits/additional-permits.component';
import { ExcavationPermitComponent } from '../new-application/forms/excavation-permit/excavation-permit.component';
import { DemolitionPermitComponent } from '../new-application/forms/demolition-permit/demolition-permit.component';
import { FencingPermitComponent } from '../new-application/forms/fencing-permit/fencing-permit.component';
import { OtherPermitsComponent } from '../new-application/other-permits/other-permits.component';
import { ViewApplicationComponent } from '../view-application/view-application.component';
import { UserApplicationsTableComponent } from '../user-applications-table/user-applications-table.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    //canActivate: [UserGuardService],
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
                path: 'additional-permits',
                component: AdditionalPermitsComponent,
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
                children: [
                  {
                    path: 'zoning-clearance',
                    component: ZoningClearanceFormComponent,
                  },

                  {
                    path: 'building-permit',
                    component: BuildingPermitFormComponent,
                  },
                  {
                    path: 'sanitary-permit',
                    component: SanitaryPermitFormComponent,
                  },
                  {
                    path: 'notice-of-construction',
                    component: NoticeOfConstructionComponent,
                  },
                  {
                    path: 'electrical-permit',
                    component: ElectricalPermitFormComponent,
                  },
                  {
                    path: 'civil-engineer-affidavit',
                    component: CivilEngineerAffidavitComponent,
                  },
                  {
                    path: 'geodetic-engineer-affidavit',
                    component: GeodeticEngineerAffidavitComponent,
                  },
                  {
                    path: 'excavation-permit',
                    component: ExcavationPermitComponent,
                  },
                ],
              },
              {
                path: 'other-permits',
                component: OtherPermitsComponent,
              },
              {
                path: 'documentary-requirements',
                component: DocumentaryRequirementsComponent,
                data: {
                  title: 'Documentary Requirements',
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
                path: 'building-plans',
                component: BuildingPlansComponent,
                data: {
                  title: 'Building Plans',
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class UserDashboardRoutingModule {}
