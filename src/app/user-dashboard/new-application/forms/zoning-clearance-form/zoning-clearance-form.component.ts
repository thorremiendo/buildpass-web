import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { AuthService } from 'src/app/core/services/auth.service';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { UserService } from 'src/app/core/services/user.service';
import { userDocuments } from 'src/app/core/variables/documents';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zoning-clearance-form',
  templateUrl: './zoning-clearance-form.component.html',
  styleUrls: ['./zoning-clearance-form.component.scss'],
})
export class ZoningClearanceFormComponent implements OnInit {
  public user;
  public userDetails;
  public formData = {};
  public userDocument = userDocuments[0];
  public zoningClearanceForm: File;
  public isLoading: boolean = true;
  public applicationInfo;
  constructor(
    private router: Router,
    private newApplicationFormSerivce: NewApplicationFormService,
    private newApplicationService: NewApplicationService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((currentUser) => {
      this.user = currentUser;
      this.userService.fetchUserInfo(this.user.user.uid).subscribe((result) => {
        this.userDetails = result.data;
        console.log(this.userDetails);
      });
    });
    this.newApplicationFormSerivce.newApplicationSubject
      .asObservable()
      .subscribe(
        (newApplicationSubject) =>
          (this.applicationInfo = newApplicationSubject)
      );
    this.newApplicationFormSerivce.commonFieldsSubject
      .asObservable()
      .subscribe(
        (commonFieldsSubject) => (this.formData = commonFieldsSubject)
      );
    this.isLoading = false;
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'zoningClearanceForm':
        this.zoningClearanceForm = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'zoningClearanceForm':
        this.zoningClearanceForm = null;
        break;
    }
  }
  callNext() {
    this.isLoading = true;
    const body = {
      application_type: this.applicationInfo.application_type,
      is_representative: this.applicationInfo.is_representative,
      is_lot_owner: this.applicationInfo.is_lot_owner,
      construction_status: this.applicationInfo.construction_status,
      registered_owner: this.applicationInfo.registered_owner,
    };

    const uploadDocumentData = {
      user_id: this.userDetails.id,
      document_id: this.userDocument.id,
      document_status: this.userDocument.status,
    };
    if (this.zoningClearanceForm) {
      uploadDocumentData['document_path'] = this.zoningClearanceForm;
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
          this.newApplicationFormSerivce.setApplicationInfo(body);
          this.router.navigateByUrl(
            'dashboard/new/initial-forms/building-permit'
          );
        });
      });
  }
}
