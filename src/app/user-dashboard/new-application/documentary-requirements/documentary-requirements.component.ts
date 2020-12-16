import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { AuthService, UserService } from 'src/app/core';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import Swal from 'sweetalert2';
import { userDocuments } from 'src/app/core/variables/documents';

@Component({
  selector: 'app-documentary-requirements',
  templateUrl: './documentary-requirements.component.html',
  styleUrls: ['./documentary-requirements.component.scss'],
})
export class DocumentaryRequirementsComponent implements OnInit {
  public user;
  public userDetails;
  public applicationId;
  public authorizationLetter: File;
  public filingFeeReceipt: File;
  public taxDeclaration: File;
  public realPropertyTaxReceipt: File;
  public siteLatestPicture: File;
  public trueCopyTitle: File;
  public lessorDocument: File;
  public deedOfSale: File;
  public isLoading: boolean = true;

  public applicationInfo;

  constructor(
    private router: Router,
    private newApplicationService: NewApplicationService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.cast.subscribe((userSubject) => (this.user = userSubject));
    console.log(this.user);
    this.newApplicationService.applicationId
      .asObservable()
      .subscribe((applicationId) => (this.applicationId = applicationId));
    console.log('application id:', this.applicationId);
    this.newApplicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationInfo = result.data;
        this.isLoading = false;
      });
  }

  handleUpload(file, documentInfo) {
    this.isLoading = true;
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.user.id,
      document_id: documentInfo.id,
      document_status: documentInfo.status,
    };
    if (file) {
      uploadDocumentData['document_path'] = file;
    }
    console.log(uploadDocumentData);
    this.newApplicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        Swal.fire('Success!', `Uploaded!`, 'success').then((result) => {
          this.isLoading = false;
          this.ngOnInit();
        });
      });
  }

  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'authorizationLetter':
        this.authorizationLetter = file;
        const authorizationLetter = userDocuments[4];
        this.handleUpload(this.authorizationLetter, authorizationLetter);
        break;
      case 'filingFeeReceipt':
        this.filingFeeReceipt = file;
        const filingFeeReceipt = userDocuments[5];
        this.handleUpload(this.filingFeeReceipt, filingFeeReceipt);
        break;
      case 'taxDeclaration':
        this.taxDeclaration = file;
        const taxDeclaration = userDocuments[6];
        this.handleUpload(this.taxDeclaration, taxDeclaration);
        break;
      case 'realPropertyTaxReceipt':
        this.realPropertyTaxReceipt = file;
        const realPropertyTaxReceipt = userDocuments[7];
        this.handleUpload(this.realPropertyTaxReceipt, realPropertyTaxReceipt);
        break;
      case 'siteLatestPicture':
        this.siteLatestPicture = file;
        const siteLatestPicture = userDocuments[8];
        this.handleUpload(this.siteLatestPicture, siteLatestPicture);
        break;
      case 'trueCopyTitle':
        this.trueCopyTitle = file;
        const trueCopyTitle = userDocuments[9];
        this.handleUpload(this.trueCopyTitle, trueCopyTitle);
        break;
      case 'lessorDocument':
        this.lessorDocument = file;
        const lessorDocument = userDocuments[10];
        this.handleUpload(this.lessorDocument, lessorDocument);
        break;
      case 'deedOfSale':
        this.deedOfSale = file;
        const deedOfSale = userDocuments[10];
        this.handleUpload(this.deedOfSale, deedOfSale);
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
    const value = this.applicationInfo;
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
      geodetic_engineer_affidavit: value.geodetic_engineer_affidavit,
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
    this.router.navigateByUrl('/dashboard/new/design-analysis');
  }
}
