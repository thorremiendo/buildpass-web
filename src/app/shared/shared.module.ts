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
import { AnnouncementListComponent } from './announcement/announcement-list/announcement-list.component';
import { AnnouncementFullComponent } from './announcement/announcement-full/announcement-full.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UploadedIdentificationComponent } from './uploaded-identification/uploaded-identification.component';

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
    AnnouncementListComponent,
    AnnouncementFullComponent,
    GeneralRemarksComponent,
    PasswordPromptComponent,
    ESignatureComponent,
    UploadedIdentificationComponent,
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
    AnnouncementListComponent,
    GeneralRemarksComponent,
    UploadedIdentificationComponent,
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
