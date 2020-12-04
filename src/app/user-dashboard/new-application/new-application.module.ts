import '../../../polyfills'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { GeodeticEngineerAffidavitComponent } from './forms/geodetic-engineer-affidavit/geodetic-engineer-affidavit.component';
import {environment} from '../../../environments/environment'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { MatTabsModule } from '@angular/material/tabs';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonFieldsRepresentativeComponent } from './common-fields/common-fields-representative/common-fields-representative.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';


@NgModule({
  declarations: 
  [
    MapComponent, 
    StepOneComponent, 
    InitialFormsComponent, 
    NewApplicationPageComponent, 
    NewApplicationRouterComponent, 
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
    GeodeticEngineerAffidavitComponent, CommonFieldsRepresentativeComponent, 
  ],

  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox.accessToken
    })
    
  ]
})
export class NewApplicationModule { }
