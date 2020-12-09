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
  public deedOfSale: File;

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
      case 'deedOfSale':
        this.deedOfSale = file;
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
      case 'deedOfSale':
        this.deedOfSale = null;
        break;
    }
  }

  callNext() {
    const value = this.applicationInfo
    const body = {
      application_type: value.application_type,
      is_representative: value.is_representative,
      is_lot_owner: value.is_lot_owner,
      construction_status: value.construction_status,
      registered_owner: value.registered_owner,
      zoning_clearance_form: value.zoning_clearance_form,
      building_permit_form: value.building_permit_form,
      sanitary_permit_form: value.sanitary_permit_form,
      electrical_permit_form: value.electrical_permit_form,
      geodetic_engineer_affidavit: value
        .geodetic_engineer_affidavit,
      civil_engineer_affidavit: value.civil_engineer_affidavit,
      excavation_permit: value.excavation_permit,
      demolition_permit: value.demolition_permit,
      fencing_permit: value.fencing_permit,
    };
    if (this.authorizationLetter) {
      body['authorization_letter'] = this.authorizationLetter;
    }
    if (this.filingFeeReceipt) {
      body['filing_fee_receipt'] = this.filingFeeReceipt;
    }
    if (this.taxDeclaration) {
      body['tax_declaration'] = this.taxDeclaration;
    }
    if (this.realPropertyTaxReceipt) {
      body['real_property_tax_receipt'] = this.realPropertyTaxReceipt;
    }
    if (this.siteLatestPicture) {
      body['site_latest_picture'] = this.siteLatestPicture;
    }
    if (this.trueCopyTitle) {
      body['true_copy_title'] = this.trueCopyTitle;
    }
    if (this.lessorDocument) {
      body['lessor_document'] = this.lessorDocument;
    }
    if (this.deedOfSale) {
      body['deed_of_sale'] = this.deedOfSale;
    }
    this.newApplicationService.setApplicationInfo(body);
    this.router.navigateByUrl('/dashboard/new/design-analysis');
  }
}
