import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { EvaluatorRoutingModule } from './evaluator-routing.module';
import { EvaluatorHomeComponent } from './evaluator-home/evaluator-home.component';
import { NewTasksComponent } from './new-tasks/new-tasks.component';
import { OpenedTasksComponent } from './opened-tasks/opened-tasks.component';
import { ClosedTasksComponent } from './closed-tasks/closed-tasks.component';
import { EvaluatorDashboardRoutingModule } from './dashboard-layout/evaluator-dashboard-routing.module';
import { EvaluatorDashboardModule } from './dashboard-layout/dashboard-layout.module';
import { DashboardLayoutModule } from '../layout/dashboard-layout/dashboard-layout.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '../layout/layout.module';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { TableViewComponent } from './table-view/table-view.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { EvaluatorRegistrationComponent } from './evaluator-registration/evaluator-registration.component';
import { EvaluatorSignInComponent } from './evaluator-sign-in/evaluator-sign-in.component';
import { EvaluatorPersonalInfoComponent } from './evaluator-personal-info/evaluator-personal-info.component';
import { EvaluatorEmployeeInfoComponent } from './evaluator-employee-info/evaluator-employee-info.component';
import { EvaluatorsSummaryComponent } from './evaluators-summary/evaluators-summary.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatExpansionModule } from '@angular/material/expansion';
import { CbaoEvaluatorComponent } from './cbao-evaluator/cbao-evaluator.component';
import { CpdoEvaluatorComponent } from './cpdo-evaluator/cpdo-evaluator.component';
import { CepmoEvaluatorComponent } from './cepmo-evaluator/cepmo-evaluator.component';
import { BfpEvaluatorComponent } from './bfp-evaluator/bfp-evaluator.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { EvaluatorIdentificationComponent } from './evaluator-identification/evaluator-identification.component';
import { EvaluatorEditProfileComponent } from './evaluator-edit-profile/evaluator-edit-profile.component';
import { ZoningCertificateComponent } from './zoning-certificate/zoning-certificate.component';
import { FireClearanceComponent } from './fire-clearance/fire-clearance.component';
import { WwwmsCertificateComponent } from './wwwms-certificate/wwwms-certificate.component';
import { ReleaseBldgPermitComponent } from './release-bldg-permit/release-bldg-permit.component';
import { FeesDialogComponent } from './fees-dialog/fees-dialog.component';
import { ViewFeesComponent } from './view-fees/view-fees.component';
import { CbaoFeesTableComponent } from './cbao-fees-table/cbao-fees-table.component';
import { CpdoFeesTableComponent } from './cpdo-fees-table/cpdo-fees-table.component';
import { BfpFeesTableComponent } from './bfp-fees-table/bfp-fees-table.component';
import { CepmoFeesTableComponent } from './cepmo-fees-table/cepmo-fees-table.component';
import { LocaleCurrencyInputModule } from 'locale-currency-input';
import { RemarksHistoryTableComponent } from './remarks-history-table/remarks-history-table.component';
import { DashboardComponentsModule } from '../dashboard-components/dashboard-components.module';
import { BfpResidentialChecklistComponent } from './bfp-residential-checklist/bfp-residential-checklist.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialModule } from '../material-module';
import { UploadSupportingDocumentsComponent } from './upload-supporting-documents/upload-supporting-documents.component';
import { TechnicalEvaluationComponent } from './technical-evaluation/technical-evaluation.component';
import { DownloadableFormsComponent } from './downloadable-forms/downloadable-forms.component';
import { TechnicalFindingsComponent } from './technical-findings/technical-findings.component';
import { MatSortModule } from '@angular/material/sort';
import { OtherPermitsComponent } from './other-permits/other-permits.component';

@NgModule({
  declarations: [
    EvaluatorHomeComponent,
    NewTasksComponent,
    OpenedTasksComponent,
    ClosedTasksComponent,
    TableViewComponent,
    CalendarViewComponent,
    ApplicationDetailsComponent,
    EvaluatorRegistrationComponent,
    EvaluatorSignInComponent,
    EvaluatorPersonalInfoComponent,
    EvaluatorEmployeeInfoComponent,
    EvaluatorsSummaryComponent,
    CbaoEvaluatorComponent,
    CpdoEvaluatorComponent,
    CepmoEvaluatorComponent,
    BfpEvaluatorComponent,
    ProjectDetailsComponent,
    FormDetailsComponent,
    EvaluatorsSummaryComponent,
    EvaluatorIdentificationComponent,
    EvaluatorEditProfileComponent,
    ZoningCertificateComponent,
    FireClearanceComponent,
    WwwmsCertificateComponent,
    ReleaseBldgPermitComponent,
    FeesDialogComponent,
    ViewFeesComponent,
    CbaoFeesTableComponent,
    CpdoFeesTableComponent,
    BfpFeesTableComponent,
    CepmoFeesTableComponent,
    RemarksHistoryTableComponent,
    BfpResidentialChecklistComponent,
    UploadSupportingDocumentsComponent,
    TechnicalEvaluationComponent,
    DownloadableFormsComponent,
    TechnicalFindingsComponent,
    OtherPermitsComponent,
  ],

  imports: [
    CommonModule,
    EvaluatorRoutingModule,
    EvaluatorDashboardRoutingModule,
    EvaluatorDashboardModule,
    DashboardLayoutModule,
    RouterModule,
    SharedModule,
    BrowserModule,
    LayoutModule,
    CoreModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    LocaleCurrencyInputModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatRippleModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatBadgeModule,
    MatProgressBarModule,
    DashboardComponentsModule,
    NgxExtendedPdfViewerModule,
    MatProgressSpinnerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatDialogModule,
    DashboardComponentsModule,
    MaterialModule,
    MatSortModule,
  ],

  exports: [TechnicalEvaluationComponent],
})
export class EvaluatorModule {}
