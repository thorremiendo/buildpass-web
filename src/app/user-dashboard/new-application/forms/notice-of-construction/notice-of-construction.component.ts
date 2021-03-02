import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { UserService } from 'src/app/core/services/user.service';
import { userDocuments } from 'src/app/core/variables/documents';
import Swal from 'sweetalert2';
import * as NumberToWords from 'number-to-words';
@Component({
  selector: 'app-notice-of-construction',
  templateUrl: './notice-of-construction.component.html',
  styleUrls: ['./notice-of-construction.component.scss'],
})
export class NoticeOfConstructionComponent implements OnInit {
  public user;
  public userDetails;
  public formData = {};
  public mergedFormData;
  public userDocument = userDocuments[47];
  public isLoading: boolean = true;
  public applicationId;
  public applicationInfo;
  public noticeOfConstruction: File;
  constructor(
    private router: Router,
    private newApplicationService: NewApplicationService,
    private authService: AuthService,
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
  fetchApplicationInfo() {
    this.newApplicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationInfo = result.data;
        this.mergeFormData();
      });
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'noticeOfConstruction':
        this.noticeOfConstruction = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'noticeOfConstruction':
        this.noticeOfConstruction = null;
        break;
    }
  }
  callNext() {
    this.isLoading = true;
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.user.id,
      document_id: this.userDocument.id,
      document_status: this.userDocument.status,
    };
    if (this.noticeOfConstruction) {
      uploadDocumentData['document_path'] = this.noticeOfConstruction;
    }
    this.newApplicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        this.isLoading = false;
        Swal.fire(
          'Success!',
          `${this.userDocument.name} uploaded!`,
          'success'
        ).then((result) => {
          this.router.navigateByUrl(
            'dashboard/new/initial-forms/electrical-permit'
          );
        });
      });
  }

  mergeFormData() {
    const applicantDetails = this.applicationInfo.applicant_detail;
    const projectDetails = this.applicationInfo.project_detail;
    const repDetails = this.applicationInfo.representative_detail;

    this.formData = {
      user_full_name: `${applicantDetails.first_name} ${applicantDetails.last_name}`.toUpperCase(),
      applicant_first_name:
        applicantDetails.first_name == 'undefined'
          ? 'N/A'
          : applicantDetails.first_name.toUpperCase(),
      lot_number:
        projectDetails.lot_number == 'undefined'
          ? 'N/A'
          : projectDetails.lot_number.toUpperCase(),
      block_no:
        projectDetails.block_number == 'undefined'
          ? 'N/A'
          : projectDetails.block_number.toUpperCase(),
      lot_address:
        projectDetails.street_name == 'undefined'
          ? 'N/A'
          : projectDetails.street_name.toUpperCase(),
      oct_tct_no:
        projectDetails.tct_number == 'undefined'
          ? 'N/A'
          : projectDetails.tct_number.toUpperCase(),
      project_name:
        projectDetails.project_title == 'undefined'
          ? 'N/A'
          : projectDetails.project_title.toUpperCase(),
    };
    console.log(this.applicationInfo);
    console.log('formData:', this.formData);
    this.isLoading = false;
  }
}
