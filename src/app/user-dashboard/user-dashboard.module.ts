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

import { ExistingApplicationsComponent } from './existing-applications/existing-applications.component';
import { UserFormsComponent } from './user-forms/user-forms.component';

import { StepOneComponent } from './new-application/step-one/step-one.component';
import { InitialFormsComponent } from './new-application/initial-forms/initial-forms.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CoreModule } from '../core/core.module';

import { BuildingPermitFormsComponent } from './new-application/building-permit-forms/building-permit-forms.component';
import { DesignAnalysisFormsComponent } from './new-application/design-analysis-forms/design-analysis-forms.component';
import { ProfessionalDetailsComponent } from './new-application/professional-details/professional-details.component';
import { ClearanceFormsComponent } from './new-application/clearance-forms/clearance-forms.component';
import { AffidavitFilesComponent } from './new-application/affidavit-files/affidavit-files.component';
import { OtherRequirementsComponent } from './new-application/other-requirements/other-requirements.component';
import { ChecklistSummaryComponent } from './new-application/checklist-summary/checklist-summary.component';
import { SuccessPageComponent } from './new-application/success-page/success-page.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MapComponent } from '../map/map.component';
import { DocumentaryRequirementsComponent } from './new-application/documentary-requirements/documentary-requirements.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { ZoningClearanceFormComponent } from './new-application/forms/zoning-clearance-form/zoning-clearance-form.component';
import { BuildingPermitFormComponent } from './new-application/forms/building-permit-form/building-permit-form.component';
import { SanitaryPermitFormComponent } from './new-application/forms/sanitary-permit-form/sanitary-permit-form.component';
import { ElectricalPermitFormComponent } from './new-application/forms/electrical-permit-form/electrical-permit-form.component';
import { CivilEngineerAffidavitComponent } from './new-application/forms/civil-engineer-affidavit/civil-engineer-affidavit.component';
import { GeodeticEngineerAffidavitComponent } from './new-application/forms/geodetic-engineer-affidavit/geodetic-engineer-affidavit.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserEditProfileComponent } from './user-edit-profile/user-edit-profile.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from '../../environments/environment';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AdditionalPermitsComponent } from './new-application/additional-permits/additional-permits.component';
import { ExcavationPermitComponent } from './new-application/forms/excavation-permit/excavation-permit.component';
import { DemolitionPermitComponent } from './new-application/forms/demolition-permit/demolition-permit.component';
import { FencingPermitComponent } from './new-application/forms/fencing-permit/fencing-permit.component';
import { OtherPermitsComponent } from './new-application/other-permits/other-permits.component';

@NgModule({
  declarations: [
    // UserHomeComponent,
    // DashboardComponent
    MapComponent,
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
    SuccessPageComponent,
    DocumentaryRequirementsComponent,
    ZoningClearanceFormComponent,
    BuildingPermitFormComponent,
    SanitaryPermitFormComponent,
    ElectricalPermitFormComponent,
    CivilEngineerAffidavitComponent,
    GeodeticEngineerAffidavitComponent,
    UserEditProfileComponent,
    AdditionalPermitsComponent,
    ExcavationPermitComponent,
    DemolitionPermitComponent,
    FencingPermitComponent,
    OtherPermitsComponent
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
    NgxExtendedPdfViewerModule,
    MatExpansionModule,
    PdfJsViewerModule,
    MatTabsModule,
    MatDatepickerModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox.accessToken,
    }),
    MatAutocompleteModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
})
export class UserModule {}
