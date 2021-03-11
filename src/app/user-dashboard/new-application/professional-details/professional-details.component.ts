import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { UserService } from 'src/app/core';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import Swal from 'sweetalert2';
import { userDocuments } from 'src/app/core/variables/documents';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';

@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.component.html',
  styleUrls: ['./professional-details.component.scss'],
})
export class ProfessionalDetailsComponent implements OnInit {
  public civilEngineerDetails: File;
  public architectDetails: File;
  public sanitaryEngineerDetails: File;
  public mechanicalEngineer: File;
  public electricalEngineer: File;
  public user;
  public userDetails;
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
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.applicationId = JSON.parse(localStorage.getItem('app_id'));
    this.fetchApplicationInfo();
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
      case 'civilEngineerDetails':
        this.civilEngineerDetails = file;
        const civilEngineerDetails = userDocuments[33];
        this.handleUpload(this.civilEngineerDetails, civilEngineerDetails);
        break;
      case 'architectDetails':
        this.architectDetails = file;
        const architectDetails = userDocuments[34];
        this.handleUpload(this.architectDetails, architectDetails);
        break;
      case 'sanitaryEngineerDetails':
        this.sanitaryEngineerDetails = file;
        const sanitaryEngineerDetails = userDocuments[35];
        this.handleUpload(
          this.sanitaryEngineerDetails,
          sanitaryEngineerDetails
        );
        break;
      case 'mechanicalEngineer':
        this.mechanicalEngineer = file;
        const mechanicalEngineer = userDocuments[46];
        this.handleUpload(this.mechanicalEngineer, mechanicalEngineer);
        break;
      case 'electricalEngineer':
        this.electricalEngineer = file;
        const electricalEngineer = userDocuments[45];
        this.handleUpload(this.electricalEngineer, electricalEngineer);
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'civilEngineerDetails':
        this.civilEngineerDetails = null;
        break;
      case 'architectDetails':
        this.architectDetails = null;
        break;
      case 'sanitaryEngineerDetails':
        this.sanitaryEngineerDetails = null;
        break;
      case 'mechanicalEngineer':
        this.mechanicalEngineer = null;
        break;
      case 'electricalEngineer':
        this.electricalEngineer = null;
        break;
    }
  }
  callNext() {
    this.router.navigateByUrl('/dashboard/new/other-requirements');
  }
}
