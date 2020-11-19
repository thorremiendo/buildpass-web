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
import { DocumentaryRequirementsComponent } from './documentary-requirements/documentary-requirements.component';
import { ZoningClearanceFormComponent } from './forms/zoning-clearance-form/zoning-clearance-form.component';
import { BuildingPermitFormComponent } from './forms/building-permit-form/building-permit-form.component';
import { SanitaryPermitFormComponent } from './forms/sanitary-permit-form/sanitary-permit-form.component';
import { ElectricalPermitFormComponent } from './forms/electrical-permit-form/electrical-permit-form.component';
import { CivilEngineerAffidavitComponent } from './forms/civil-engineer-affidavit/civil-engineer-affidavit.component';
import { GeodeticEngineerAffidavitComponent } from './forms/geodetic-engineer-affidavit/geodetic-engineer-affidavit.component'



@NgModule({
  declarations: [MapComponent, StepOneComponent, InitialFormsComponent, NewApplicationPageComponent, NewApplicationRouterComponent, BuildingPermitFormsComponent, DesignAnalysisFormsComponent, ProfessionalDetailsComponent, ClearanceFormsComponent, AffidavitFilesComponent, OtherRequirementsComponent, ChecklistSummaryComponent, SuccessPageComponent, DocumentaryRequirementsComponent, ZoningClearanceFormComponent, BuildingPermitFormComponent, SanitaryPermitFormComponent, ElectricalPermitFormComponent, CivilEngineerAffidavitComponent, GeodeticEngineerAffidavitComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class NewApplicationModule { }
