import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-affidavit-files',
  templateUrl: './affidavit-files.component.html',
  styleUrls: ['./affidavit-files.component.scss'],
})
export class AffidavitFilesComponent implements OnInit {
  public geodeticEngineerAffidavit: File;
  public civilEngineerAffidavit: File;


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
      case 'geodeticEngineerAffidavit':
        this.geodeticEngineerAffidavit = file;
        break;
      case 'civilEngineerAffidavit':
        this.civilEngineerAffidavit = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'geodeticEngineerAffidavit':
        this.geodeticEngineerAffidavit = null;
        break;
      case 'civilEngineerAffidavit':
        this.civilEngineerAffidavit = null;
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
      sanitary_engineer_details: value.sanitary_engineer_details,
      zoning_compliance_certificate: value.zoning_compliance_certificate,
      fire_safety_evaluation: value.fire_safety_evaluation,
      wwms_certificate: value.wwms_certificate,
      barangay_clearance: value.barangay_clearance
    }
    if(this.geodeticEngineerAffidavit) {
      body["geodetic_engineer_affidavit"] = this.geodeticEngineerAffidavit
    }
    if(this.civilEngineerAffidavit) {
      body["civil_engineer_affidavit"] = this.civilEngineerAffidavit
    }
    this.newApplicationService.setApplicationInfo(body)
    this.router.navigateByUrl('/dashboard/new/other-requirements');
  }
}
