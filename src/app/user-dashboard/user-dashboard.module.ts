import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home/user-home.component';
import { DashboardComponent } from './dashboard-layout/dashboard/dashboard.component';
import { UserDashboardRoutingModule } from './dashboard-layout/user-dashboard-routing.module';
import { DashboardLayoutModule } from '../layout/dashboard-layout/dashboard-layout.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '../layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { UserDashboardModule } from './dashboard-layout/dashboard-layout.module';
import { UserRoutingModule } from './user-routing.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { NewApplicationComponent } from './step-one/new-application.component';
import { ExistingApplicationsComponent } from './existing-applications/existing-applications.component';
import { UserFormsComponent } from './user-forms/user-forms.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { StepOneComponent } from './new-application/step-one/step-one.component';
import { InitialFormsComponent } from './new-application/initial-forms/initial-forms.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CoreModule } from '../core/core.module';
import { MatIconModule } from '@angular/material/icon';
import { BuildingPermitFormsComponent } from './new-application/building-permit-forms/building-permit-forms.component';
import { DesignAnalysisFormsComponent } from './new-application/design-analysis-forms/design-analysis-forms.component';
import { ProfessionalDetailsComponent } from './new-application/professional-details/professional-details.component';
import { ClearanceFormsComponent } from './new-application/clearance-forms/clearance-forms.component';
import { AffidavitFilesComponent } from './new-application/affidavit-files/affidavit-files.component';
import { OtherRequirementsComponent } from './new-application/other-requirements/other-requirements.component';
import { ChecklistSummaryComponent } from './new-application/checklist-summary/checklist-summary.component';
import {MatCardModule} from '@angular/material/card';
import { SuccessPageComponent } from './new-application/success-page/success-page.component';
import { MatTableModule } from '@angular/material/table'  
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    // UserHomeComponent,
    // DashboardComponent
    NewApplicationComponent,
    ExistingApplicationsComponent,
    UserFormsComponent,
    StepOneComponent,
    InitialFormsComponent,
    BuildingPermitFormsComponent,
    DesignAnalysisFormsComponent,
    ProfessionalDetailsComponent,
    ClearanceFormsComponent,
    AffidavitFilesComponent,
    OtherRequirementsComponent,
    ChecklistSummaryComponent,
    SuccessPageComponent
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    DashboardLayoutModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule,
    MatToolbarModule,
    FormsModule,
    LayoutModule,
    BrowserModule,
    UserDashboardModule,
    UserRoutingModule,
    MatCarouselModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    NgxDropzoneModule,
    CoreModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
  ],
})
export class UserModule {}
