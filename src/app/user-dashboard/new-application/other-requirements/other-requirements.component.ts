import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import Swal from 'sweetalert2';
import { userDocuments } from 'src/app/core/variables/documents';
import { UserService } from 'src/app/core';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
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
  public user;
  public applicationId;
  public isLoading: boolean = true;
  public applicationInfo;
  constructor(
    private newApplicationService: NewApplicationService,
    private router: Router,
    private userService: UserService,
    private applicationService: ApplicationInfoService
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
  callSaveAsDraft() {
    const body = {
      application_status_id: 6,
    };
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        this.saveRoute();
      });
  }
  saveRoute() {
    const body = {
      user_id: this.user.id,
      application_id: this.applicationId,
      url: this.router.url,
    };
    this.newApplicationService.saveAsDraft(body).subscribe((res) => {
      console.log(res);
      Swal.fire('Success!', `Application Saved as Draft!`, 'success').then(
        (result) => {
          this.router.navigateByUrl('/dashboard');
        }
      );
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
        this.isLoading = false;
        Swal.fire('Success!', `Uploaded!`, 'success').then((result) => {
          this.ngOnInit();
        });
      });
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'barangayClearance':
        this.barangayClearance = file;
        const barangayClearance = userDocuments[20];
        this.handleUpload(this.barangayClearance, barangayClearance);
        break;
      case 'environmentalCompliance':
        this.environmentalCompliance = file;
        const environmentalCompliance = userDocuments[39];
        this.handleUpload(
          this.environmentalCompliance,
          environmentalCompliance
        );
        break;
      case 'governmentClearance':
        this.governmentClearance = file;
        const governmentClearance = userDocuments[40];
        this.handleUpload(this.governmentClearance, governmentClearance);
        break;
      case 'chspCertificate':
        this.chspCertificate = file;
        const chspCertificate = userDocuments[41];
        this.handleUpload(this.chspCertificate, chspCertificate);
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
    this.router.navigateByUrl('/dashboard/new/initial-forms/excavation-permit');
  }
}
