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
      .subscribe((applicationId) => {
        this.applicationId = applicationId;
        if (!this.applicationId) {
          this.applicationId = localStorage.getItem('app_id');
          this.fetchApplicationInfo();
        } else {
          localStorage.setItem('app_id', this.applicationId);
          console.log('local app id', localStorage.getItem('app_id'));
          this.fetchApplicationInfo();
        }
      });
  }
  fetchApplicationInfo() {
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
        const authorizationLetter = userDocuments[20];
        this.handleUpload(this.authorizationLetter, authorizationLetter);
        break;
      case 'filingFeeReceipt':
        this.filingFeeReceipt = file;
        const filingFeeReceipt = userDocuments[21];
        this.handleUpload(this.filingFeeReceipt, filingFeeReceipt);
        break;
      case 'taxDeclaration':
        this.taxDeclaration = file;
        const taxDeclaration = userDocuments[22];
        this.handleUpload(this.taxDeclaration, taxDeclaration);
        break;
      case 'realPropertyTaxReceipt':
        this.realPropertyTaxReceipt = file;
        const realPropertyTaxReceipt = userDocuments[23];
        this.handleUpload(this.realPropertyTaxReceipt, realPropertyTaxReceipt);
        break;
      case 'siteLatestPicture':
        this.siteLatestPicture = file;
        const siteLatestPicture = userDocuments[24];
        this.handleUpload(this.siteLatestPicture, siteLatestPicture);
        break;
      case 'trueCopyTitle':
        this.trueCopyTitle = file;
        const trueCopyTitle = userDocuments[25];
        this.handleUpload(this.trueCopyTitle, trueCopyTitle);
        break;
      case 'lessorDocument':
        this.lessorDocument = file;
        const lessorDocument = userDocuments[26];
        this.handleUpload(this.lessorDocument, lessorDocument);
        break;
      case 'deedOfSale':
        this.deedOfSale = file;
        const deedOfSale = userDocuments[26];
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
    this.router.navigateByUrl('/dashboard/new/design-analysis');
  }
}
