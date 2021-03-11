import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { AuthService } from 'src/app/core/services/auth.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { UserService } from 'src/app/core/services/user.service';
import { userDocuments } from 'src/app/core/variables/documents';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-civil-engineer-affidavit',
  templateUrl: './civil-engineer-affidavit.component.html',
  styleUrls: ['./civil-engineer-affidavit.component.scss'],
})
export class CivilEngineerAffidavitComponent implements OnInit {
  public civilEngineerAffidavit: File;
  public isLoading: boolean = true;
  public applicationId;
  public applicationInfo;
  public user;
  public userDetails;
  public userDocument = userDocuments[37];

  constructor(
    private router: Router,
    private newApplicationService: NewApplicationService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.newApplicationService.applicationId
      .asObservable()
      .subscribe((applicationId) => (this.applicationId = applicationId));
    console.log('application id:', this.applicationId);
    this.newApplicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationInfo = result.data;
      });
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'civilEngineerAffidavit':
        this.civilEngineerAffidavit = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'civilEngineerAffidavit':
        this.civilEngineerAffidavit = null;
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
    if (this.civilEngineerAffidavit) {
      uploadDocumentData['document_path'] = this.civilEngineerAffidavit;
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
            'dashboard/new/initial-forms/geodetic-engineer-affidavit'
          );
        });
      });
  }
}
