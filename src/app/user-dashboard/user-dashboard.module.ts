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
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CoreModule } from '../core/core.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ChecklistSummaryComponent } from './new-application/checklist-summary/checklist-summary.component';
import { SuccessPageComponent } from './new-application/success-page/success-page.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MapComponent } from '../map/map.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatBadgeModule } from '@angular/material/badge';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { UserApplicationsTableComponent } from './user-applications-table/user-applications-table.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FileUploadComponent } from './new-application/forms/file-upload/file-upload.component';
import { DashboardComponentsModule } from '../dashboard-components/dashboard-components.module';
import { MaterialModule } from '../material-module';

import { BuildingPermitComponent } from './new-application/building-permit/building-permit.component';
import { OccupancyPermitComponent } from './new-application/occupancy-permit/occupancy-permit.component';
import { ExcavationPermitComponent } from './new-application/excavation-permit/excavation-permit.component';
import { FencingPermitComponent } from './new-application/fencing-permit/fencing-permit.component';
import { DemolitionPermitComponent } from './new-application/demolition-permit/demolition-permit.component';

@NgModule({
  declarations: [
    // UserHomeComponent,
    // DashboardComponent
    MapComponent,
    ExistingApplicationsComponent,
    UserFormsComponent,
    StepOneComponent,
    ChecklistSummaryComponent,
    SuccessPageComponent,
    UserEditProfileComponent,
    ViewApplicationComponent,
    UserApplicationsTableComponent,
    FileUploadComponent,
    BuildingPermitComponent,
    OccupancyPermitComponent,
    ExcavationPermitComponent,
    FencingPermitComponent,
    DemolitionPermitComponent,
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
    MatBadgeModule,
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
    MatProgressBarModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    SweetAlert2Module.forRoot(),
    MaterialModule,

  ],
})
export class UserModule {}
