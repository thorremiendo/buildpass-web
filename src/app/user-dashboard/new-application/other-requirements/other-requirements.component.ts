import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-other-requirements',
  templateUrl: './other-requirements.component.html',
  styleUrls: ['./other-requirements.component.scss'],
})
export class OtherRequirementsComponent implements OnInit {
  public environmentalCompliance: File;
  public governmentClearance: File;
  public chspCertificate: File;

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
      case 'environmentalCompliance':
        this.environmentalCompliance = file;
        break;
      case 'governmentClearance':
        this.governmentClearance = file;
        break;
      case 'chspCertificate':
        this.chspCertificate = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'environmentalCompliance':
        this.environmentalCompliance = null;
        break;
      case 'governmentClearance':
        this.governmentClearance = null;
        break;
      case 'chspCertificate':
        this.chspCertificate = null;
        break;
    }
  }
  callNext() {
    const value = this.applicationInfo;
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
      sanitary_engineer_details: value.sanitary_engineer_details,
      zoning_compliance_certificate: value.zoning_compliance_certificate,
      fire_safety_evaluation: value.fire_safety_evaluation,
      wwms_certificate: value.wwms_certificate,
      barangay_clearance: value.barangay_clearance,
      geodetic_engineer_affidavit: value.geodetic_engineer_affidavit,
      civil_engineer_affidavit: value.civil_engineer_affidavit
    };
    if (this.environmentalCompliance) {
      body['environmental_compliance'] = this.environmentalCompliance;
    }
    if (this.governmentClearance) {
      body['government_clearance'] = this.governmentClearance;
    }
    if (this.chspCertificate) {
      body['chsp_certificate'] = this.chspCertificate;
    }
    this.newApplicationService.setApplicationInfo(body);
    this.router.navigateByUrl('/dashboard/new/summary');
  }
}
