import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-documentary-requirements',
  templateUrl: './documentary-requirements.component.html',
  styleUrls: ['./documentary-requirements.component.scss'],
})
export class DocumentaryRequirementsComponent implements OnInit {
  public authorizationLetter: File;
  public filingFeeReceipt: File;
  public taxDeclaration: File;
  public realPropertyTaxReceipt: File;
  public siteLatestPicture: File;
  public trueCopyTitle: File;
  public lessorDocument: File;

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
      case 'authorizationLetter':
        this.authorizationLetter = file;
        break;
      case 'filingFeeReceipt':
        this.filingFeeReceipt = file;
        break;
      case 'taxDeclaration':
        this.taxDeclaration = file;
        break;
      case 'realPropertyTaxReceipt':
        this.realPropertyTaxReceipt = file;
        break;
      case 'siteLatestPicture':
        this.siteLatestPicture = file;
        break;
      case 'trueCopyTitle':
        this.trueCopyTitle = file;
        break;
      case 'lessorDocument':
        this.lessorDocument = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'authorizationLetter':
        this.authorizationLetter = null;
        break;
      case 'filingFeeReceipt':
        this.filingFeeReceipt = null;
        break;
      case 'taxDeclaration':
        this.taxDeclaration = null;
        break;
      case 'realPropertyTaxReceipt':
        this.realPropertyTaxReceipt = null;
        break;
      case 'siteLatestPicture':
        this.siteLatestPicture = null;
        break;
      case 'trueCopyTitle':
        this.trueCopyTitle = null;
        break;
      case 'lessorDocument':
        this.lessorDocument = null;
        break;
    }
  }

  callNext() {
    const body = {
      application_type: this.applicationInfo.application_type,
      is_representative: this.applicationInfo.is_representative,
      is_lot_owner: this.applicationInfo.is_lot_owner,
      construction_status: this.applicationInfo.construction_status,
      zoning_clearance_form: this.applicationInfo.zoning_clearance_form,
      building_permit_form: this.applicationInfo.building_permit_form,
      sanitary_permit_form: this.applicationInfo.sanitary_permit_form,
      electrical_permit_form: this.applicationInfo.electrical_permit_form,
      geodetic_engineer_affidavit: this.applicationInfo.geodetic_engineer_affidavit,
      civil_engineer_affidavit: this.applicationInfo.civil_engineer_affidavit
    }
    if(this.authorizationLetter) {
      body["authorization_letter"] = this.authorizationLetter
    }
    if(this.filingFeeReceipt) {
      body["filing_fee_receipt"] = this.filingFeeReceipt
    }
    if(this.taxDeclaration) {
      body["tax_declaration"] = this.taxDeclaration
    }
    if(this.realPropertyTaxReceipt) {
      body["real_property_tax_receipt"] = this.realPropertyTaxReceipt
    }
    if(this.siteLatestPicture) {
      body["site_latest_picture"] = this.siteLatestPicture
    }
    if(this.trueCopyTitle) {
      body["true_copy_title"] = this.trueCopyTitle
    }if(this.lessorDocument) {
      body["lessor_document"] = this.lessorDocument
    }
    this.newApplicationService.setApplicationInfo(body)
    this.router.navigateByUrl('/dashboard/new/design-analysis')
  }
}

