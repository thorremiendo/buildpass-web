import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { AuthService } from 'src/app/core/services/auth.service';
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
  public mergedFormData;
  public userDocument = userDocuments[0];
  public zoningClearanceForm: File;
  public isLoading: boolean = true;
  public applicationId;
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
        this.mergeFormData();
      });
  }

  mergeFormData() {
    const applicantDetails = this.applicationInfo.applicant_detail
    const projectDetails = this.applicationInfo.project_detail
    const repDetails = this.applicationInfo.representative_detail

    this.formData = {
      owner_contact_number: applicantDetails.contact_number,
      owner_first_name: applicantDetails.first_name,
      owner_middle_name: applicantDetails.middle_name,
      owner_last_name: applicantDetails.last_name,
      owner_municipality: "Baguio City",
      owner_street: applicantDetails.street_name,
      owner_house_number: applicantDetails.house_number,
      owner_barangay: applicantDetails.barangay,
      project_barangay: projectDetails.barangay,
      project_cost: projectDetails.project_cost_cap,
      project_floor_area: projectDetails.floor_number,
      project_lot_area: projectDetails.lot_area,
      project_lot_number: projectDetails.lot_number,
      project_municipality: "Baguio City",
      project_street: projectDetails.street_name
    };
    console.log(this.applicationInfo);
    console.log('formData:', this.formData);
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
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.user.id,
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
          this.router.navigateByUrl(
            'dashboard/new/initial-forms/building-permit'
          );
        });
      });
  }
}
