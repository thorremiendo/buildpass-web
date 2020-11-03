import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-clearance-forms',
  templateUrl: './clearance-forms.component.html',
  styleUrls: ['./clearance-forms.component.scss'],
})
export class ClearanceFormsComponent implements OnInit {
  public zoningComplianceCertificate: File;
  public fireSafetyEvaluation: File;
  public wwmsCertificate: File;
  public barangayClearance: File;
  public applicationInfo;
  constructor(
    private newApplicationService: NewApplicationFormService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newApplicationService.newApplicationSubject
      .asObservable()
      .subscribe(
        (newApplicationSubject) =>
          (this.applicationInfo = newApplicationSubject)
      );
    console.log(this.applicationInfo);
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'zoningComplianceCertificate':
        this.zoningComplianceCertificate = file;
        break;
      case 'fireSafetyEvaluation':
        this.fireSafetyEvaluation = file;
        break;
      case 'wwmsCertificate':
        this.wwmsCertificate = file;
        break;
      case 'barangayClearance':
        this.barangayClearance = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'zoningComplianceCertificate':
        this.zoningComplianceCertificate = null;
        break;
      case 'fireSafetyEvaluation':
        this.fireSafetyEvaluation = null;
        break;
      case 'wwmsCertificate':
        this.wwmsCertificate = null;
        break;
      case 'barangayClearance':
        this.barangayClearance = null;
        break;
    }
  }
  callNext() {
    const value = this.applicationInfo
    const body = {
      application_type: value.application_type,
      is_representative: value.is_representative,
      is_lot_owner: value.is_lot_owner,
      filing_fee_receipt: value.filing_fee_receipt,
      zoning_clearance_form: value.zoning_clearance_form,
      special_power_of_attorney: value.special_power_of_attorney,
      true_copy_of_title: value.true_copy_of_title,
      contract_of_lease: value.contract_of_lease,
      tax_declaration: value.tax_declaration,
      real_property_tax_receipt: value.real_property_tax_receipt,
      latest_picture_of_site: value.latest_picture_of_site,
      building_permit_form: value.building_permit_form,
      sanitary_permit_form: value.sanitary_permit_form,
      electrical_permit_form: value.electrical_permit_form,
      building_plan: value.building_plan,
      structural_design: value.structural_design,
      electrical_design: value.electrical_design,
      soil_analaysis: value.soil_analaysis,
      civil_engineer_details: value.civil_engineer_details,
      architect_details: value.architect_details,
      sanitary_engineer_details: value.sanitary_engineer_details
    }
    if(this.zoningComplianceCertificate) {
      body["zoning_compliance_certificate"] = this.zoningComplianceCertificate
    }
    if(this.fireSafetyEvaluation) {
      body["fire_safety_evaluation"] = this.fireSafetyEvaluation
    }
    if(this.wwmsCertificate) {
      body["wwms_certificate"] = this.wwmsCertificate
    }
    if(this.barangayClearance) {
      body["barangay_clearance"] = this.barangayClearance
    }
    this.newApplicationService.setApplicationInfo(body)
    this.router.navigateByUrl('/dashboard/new/affidavits');
  }
}
