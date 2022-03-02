import { ESignatureComponent } from './e-signature/e-signature.component';
import { PasswordPromptComponent } from './password-prompt/password-prompt.component';
import { GeneralRemarksComponent } from '../shared/general-remarks/general-remarks.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from './../material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionAnchorDirective } from './accordion/accordionanchor.directive';
import { AccordionDirective } from './accordion/accordion.directive';
import { AccordionLinkDirective } from './accordion/accordionlink.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuItems } from './menu-items/menu-items';
import { LoaderComponent } from './loader/loader.component';
import { DateAgoPipe } from '../core';
import { ApplicationTimelineComponent } from './application-timeline/application-timeline.component';
import { ApplicationFeesSummaryComponent } from './application-fees-summary/application-fees-summary.component';
import { RepresentativeDetailsComponent } from './representative-details/representative-details.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
};
import { SummaryFormsListComponent } from './summary-forms-list/summary-forms-list.component';
import { ApplicationSummaryComponent } from './application-summary/application-summary.component';
import { SupportingDocumentsComponent } from './supporting-documents/supporting-documents.component';
import { ApplicantDetailsComponent } from './applicant-details/applicant-details.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ApplicantBuildingPermitDocsComponent } from './applicant-building-permit-docs/applicant-building-permit-docs.component';
import { ApplicationsListComponent } from './applications-list/applications-list.component';
import { MatSelectModule } from '@angular/material/select';
import { FeedbackComponent } from './feedback/feedback.component';
import { UpdatePasswordDialogComponent } from './update-password-dialog/update-password-dialog.component';
import { ImageViewerModule } from 'ngx-image-viewer';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UploadedIdentificationComponent } from './uploaded-identification/uploaded-identification.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { OldBpDetailsComponent } from './old-bp-details/old-bp-details.component';
import { AssociateOldBpComponent } from './associate-old-bp/associate-old-bp.component';
import { PdfFormSaveComponent } from './pdf-form-save/pdf-form-save.component';
import { EsigPromptComponent } from './esig-prompt/esig-prompt.component';
import { PreviewDialogComponent } from './preview-dialog/preview-dialog.component';
import { AssociateBpEgppComponent } from './associate-bp-egpp/associate-bp-egpp.component';
import { EsigPdfPreviewComponent } from './esig-pdf-preview/esig-pdf-preview.component';
import { InspectionCardComponent } from './inspection-card/inspection-card.component';
import { InspectionDetailsComponent } from './inspection-details/inspection-details.component';
import { ApplicationInfoComponent } from './application-info/application-info.component';
import { ApplicationDocsComponent } from './application-docs/application-docs.component';
import { DocumentViewComponent } from './document-view/document-view.component';
import { DocumentRemarksComponent } from './document-remarks/document-remarks.component';
import { StepOneDialogComponent } from './step-one-dialog/step-one-dialog.component';
import { ReviewButtonComponent } from './review-button/review-button.component';
import { AdminEditDialogComponent } from './admin-edit-dialog/admin-edit-dialog.component';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective,
    LoaderComponent,
    DateAgoPipe,
    ApplicationTimelineComponent,
    ApplicationFeesSummaryComponent,
    RepresentativeDetailsComponent,
    SummaryFormsListComponent,
    ApplicationSummaryComponent,
    SupportingDocumentsComponent,
    ApplicantDetailsComponent,
    ProjectDetailsComponent,
    ApplicantBuildingPermitDocsComponent,
    ApplicationsListComponent,
    FeedbackComponent,
    UpdatePasswordDialogComponent,
    GeneralRemarksComponent,
    PasswordPromptComponent,
    ESignatureComponent,
    UploadedIdentificationComponent,
    ReportIssueComponent,
    OldBpDetailsComponent,
    AssociateOldBpComponent,
    PdfFormSaveComponent,
    EsigPromptComponent,
    PreviewDialogComponent,
    AssociateBpEgppComponent,
    EsigPdfPreviewComponent,
    InspectionCardComponent,
    InspectionDetailsComponent,
    ApplicationInfoComponent,
    ApplicationDocsComponent,
    DocumentViewComponent,
    DocumentRemarksComponent,
    StepOneDialogComponent,
    ReviewButtonComponent,
    AdminEditDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    MatSelectModule,
    FlexLayoutModule,
    NgxExtendedPdfViewerModule,
    ImageViewerModule.forRoot(),
    PdfViewerModule,
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective,
    LoaderComponent,
    DateAgoPipe,
    ApplicationTimelineComponent,
    ApplicationFeesSummaryComponent,
    RepresentativeDetailsComponent,
    SummaryFormsListComponent,
    ApplicationSummaryComponent,
    SupportingDocumentsComponent,
    ApplicantDetailsComponent,
    ProjectDetailsComponent,
    ApplicantBuildingPermitDocsComponent,
    ApplicationsListComponent,
    GeneralRemarksComponent,
    UploadedIdentificationComponent,
    PdfFormSaveComponent,
    PreviewDialogComponent,
    InspectionCardComponent,
    InspectionDetailsComponent,
    ApplicationInfoComponent,
    ApplicationDocsComponent,
    DocumentViewComponent,
    DocumentRemarksComponent,
    AdminEditDialogComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    MenuItems,
  ],
})
export class SharedModule {}
