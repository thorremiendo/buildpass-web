import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { UserService } from 'src/app/core';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import Swal from 'sweetalert2';
import { userDocuments } from 'src/app/core/variables/documents';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';

@Component({
  selector: 'app-building-plans',
  templateUrl: './building-plans.component.html',
  styleUrls: ['./building-plans.component.scss'],
})
export class BuildingPlansComponent implements OnInit {
  public siteDevelopmentPlan: File;
  public structuralPlan: File;
  public sanitaryPlan: File;
  public electricalPlan: File;
  public electronicsPlan: File;
  public applicationInfo;
  public user;
  public userDetails;
  public applicationId;
  public isLoading: boolean = true;
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
      case 'siteDevelopmentPlan':
        this.siteDevelopmentPlan = file;
        const siteDevelopmentPlan = userDocuments[58];
        this.handleUpload(this.siteDevelopmentPlan, siteDevelopmentPlan);
        break;
      case 'structuralPlan':
        this.structuralPlan = file;
        const structuralPlan = userDocuments[60];
        this.handleUpload(this.structuralPlan, structuralPlan);
        break;
      case 'sanitaryPlan':
        this.sanitaryPlan = file;
        const sanitaryPlan = userDocuments[62];
        this.handleUpload(this.sanitaryPlan, sanitaryPlan);
        break;
      case 'electricalPlan':
        this.electricalPlan = file;
        const electricalPlan = userDocuments[61];
        this.handleUpload(this.electricalPlan, electricalPlan);
        break;
      case 'electronicsPlan':
        this.electronicsPlan = file;
        const electronicsPlan = userDocuments[63];
        this.handleUpload(this.electronicsPlan, electronicsPlan);
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'siteDevelopmentPlan':
        this.siteDevelopmentPlan = null;
        break;
      case 'structuralPlan':
        this.structuralPlan = null;
        break;
      case 'sanitaryPlan':
        this.sanitaryPlan = null;
        break;
      case 'electricalPlan':
        this.electricalPlan = null;
        break;
      case 'electronicsPlan':
        this.electronicsPlan = null;
        break;
    }
  }
  callNext() {
    this.router.navigateByUrl('/dashboard/new/professional-details');
  }
}
