import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { AuthService } from 'src/app/core/services/auth.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { UserService } from 'src/app/core/services/user.service';
import { userDocuments } from 'src/app/core/variables/documents';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sanitary-permit-form',
  templateUrl: './sanitary-permit-form.component.html',
  styleUrls: ['./sanitary-permit-form.component.scss'],
})
export class SanitaryPermitFormComponent implements OnInit {
  public user;
  public userDetails;
  public formData = {};
  public mergedFormData;
  public userDocument = userDocuments[2];
  public isLoading: boolean = true;
  public applicationId;
  public applicationInfo;
  public sanitaryPermitForm: File;

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
        this.mergeFormData();
      });
  }
  mergeFormData() {
    this.mergeFormData = {
      ...this.applicationInfo.applicant_detail,
      ...this.applicationInfo.project_detail,
      ...this.applicationInfo.representative_detail,
    };
    console.log(this.applicationInfo);
    console.log(this.mergeFormData);
    this.isLoading = false;
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'sanitaryPermitForm':
        this.sanitaryPermitForm = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'sanitaryPermitForm':
        this.sanitaryPermitForm = null;
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
    if (this.sanitaryPermitForm) {
      uploadDocumentData['document_path'] = this.sanitaryPermitForm;
    }
    this.newApplicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        Swal.fire(
          'Success!',
          `${this.userDocument.name} uploaded!`,
          'success'
        ).then((result) => {
          this.isLoading = false;
          this.router.navigateByUrl(
            'dashboard/new/initial-forms/electrical-permit'
          );
        });
      });
  }
}
