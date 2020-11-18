import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from './step-one/step-one.component';
import { InitialFormsComponent } from './initial-forms/initial-forms.component';
import { RouterModule } from '@angular/router';
import { NewApplicationPageComponent } from './new-application-page/new-application-page.component';
import { NewApplicationRouterComponent } from './new-application-router/new-application-router.component';
import { BuildingPermitFormsComponent } from './building-permit-forms/building-permit-forms.component';
import { DesignAnalysisFormsComponent } from './design-analysis-forms/design-analysis-forms.component';
import { ProfessionalDetailsComponent } from './professional-details/professional-details.component';
import { ClearanceFormsComponent } from './clearance-forms/clearance-forms.component';
import { AffidavitFilesComponent } from './affidavit-files/affidavit-files.component';
import { OtherRequirementsComponent } from './other-requirements/other-requirements.component';
import { ChecklistSummaryComponent } from './checklist-summary/checklist-summary.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { MapComponent } from '../../map/map.component';
import { DocumentaryRequirementsComponent } from './documentary-requirements/documentary-requirements.component'



@NgModule({
  declarations: [MapComponent, StepOneComponent, InitialFormsComponent, NewApplicationPageComponent, NewApplicationRouterComponent, BuildingPermitFormsComponent, DesignAnalysisFormsComponent, ProfessionalDetailsComponent, ClearanceFormsComponent, AffidavitFilesComponent, OtherRequirementsComponent, ChecklistSummaryComponent, SuccessPageComponent, DocumentaryRequirementsComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class NewApplicationModule { }
