import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-building-permit-forms',
  templateUrl: './building-permit-forms.component.html',
  styleUrls: ['./building-permit-forms.component.scss'],
})
export class BuildingPermitFormsComponent implements OnInit {
  public buildingPermitForm: File;
  public sanitaryPermitForm: File;
  public electricalPermitForm: File;

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
      case 'buildingPermitForm':
        this.buildingPermitForm = file;
        break;
      case 'sanitaryPermitForm':
        this.sanitaryPermitForm = file;
        break;
      case 'electricalPermitForm':
        this.electricalPermitForm = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'buildingPermitForm':
        this.buildingPermitForm = null;
        break;
      case 'sanitaryPermitForm':
        this.sanitaryPermitForm = null;
        break;
      case 'electricalPermitForm':
        this.electricalPermitForm = null;
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
      latest_picture_of_site: value.latest_picture_of_site
    }
    if(this.buildingPermitForm) {
      body["building_permit_form"] = this.buildingPermitForm
    }
    if(this.sanitaryPermitForm) {
      body["sanitary_permit_form"] = this.sanitaryPermitForm
    }
    if(this.electricalPermitForm) {
      body["electrical_permit_form"] = this.electricalPermitForm
    }
    this.newApplicationService.setApplicationInfo(body)
    this.router.navigateByUrl('/dashboard/new/design-analysis');
  }
}
