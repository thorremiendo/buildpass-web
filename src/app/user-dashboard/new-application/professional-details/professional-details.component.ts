import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { UserService } from 'src/app/core';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import Swal from 'sweetalert2';
import { userDocuments } from 'src/app/core/variables/documents';

@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.component.html',
  styleUrls: ['./professional-details.component.scss'],
})
export class ProfessionalDetailsComponent implements OnInit {
  public civilEngineerDetails: File;
  public architectDetails: File;
  public sanitaryEngineerDetails: File;
  public user;
  public userDetails;
  public applicationId;
  public isLoading: boolean = true;
  public applicationInfo;
  constructor(
    private newApplicationService: NewApplicationService,
    private router: Router,
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
    }
  }
  callNext() {
    this.router.navigateByUrl('/dashboard/new/other-requirements');
  }
}
