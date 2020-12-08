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
      case 'barangayClearance':
        this.barangayClearance = file;
        break;
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
      case 'barangayClearance':
        this.barangayClearance = null;
        break;
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
      construction_status: value.construction_status,
      zoning_clearance_form: value.zoning_clearance_form,
      building_permit_form: value.building_permit_form,
      sanitary_permit_form: value.sanitary_permit_form,
      electrical_permit_form: value.electrical_permit_form,
      geodetic_engineer_affidavit: this.applicationInfo.geodetic_engineer_affidavit,
      civil_engineer_affidavit: this.applicationInfo.civil_engineer_affidavit,
      authorization_letter: value.authorization_letter,
      filing_fee_receipt: value.filing_fee_receipt,
      tax_declaration: value.tax_declaration,
      real_property_tax_receipt: value.real_property_tax_receipt,
      site_latest_picture: value.site_latest_picture,
      true_copy_title: value.true_copy_title,
      lessor_document: value.lessor_document,
      building_plan: value.building_plan,
      structural_design: value.structural_design,
      electrical_design: value.electrical_design,
      soil_analaysis: value.soil_analaysis,
      civil_engineer_details: value.civil_engineer_details,
      architect_details: value.architect_details,
      sanitary_engineer_details: value.sanitary_engineer_details,
      deed_of_sale: value.deed_of_sale

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
    if (this.barangayClearance) {
      body['barangay_clearance'] = this.barangayClearance;
    }
    this.newApplicationService.setApplicationInfo(body);
    this.router.navigateByUrl('/dashboard/new/summary');
  }
}
