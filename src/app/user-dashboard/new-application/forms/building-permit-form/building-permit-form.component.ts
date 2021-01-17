import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { AuthService } from 'src/app/core/services/auth.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { UserService } from 'src/app/core/services/user.service';
import { userDocuments } from 'src/app/core/variables/documents';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-building-permit-form',
  templateUrl: './building-permit-form.component.html',
  styleUrls: ['./building-permit-form.component.scss'],
})
export class BuildingPermitFormComponent implements OnInit {
  public user;
  public userDetails;
  public formData = {};
  public mergedFormData;
  public userDocument = userDocuments[1];
  public isLoading: boolean = true;
  public applicationId;
  public applicationInfo;
  public buildingPermitForm: File;
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
        this.mergeFormData();
      });
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'buildingPermitForm':
        this.buildingPermitForm = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'buildingPermitForm':
        this.buildingPermitForm = null;
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
    if (this.buildingPermitForm) {
      uploadDocumentData['document_path'] = this.buildingPermitForm;
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
            'dashboard/new/initial-forms/sanitary-permit'
          );
        });
      });
  }
  mergeFormData() {
    const applicantDetails = this.applicationInfo.applicant_detail;
    const projectDetails = this.applicationInfo.project_detail;
    const repDetails = this.applicationInfo.representative_detail;

    this.formData = {
      applicant_first_name:
        applicantDetails.first_name == 'undefined'
          ? ''
          : applicantDetails.first_name,
      applicant_last_name:
        applicantDetails.last_name == 'undefined'
          ? ''
          : applicantDetails.last_name,
      applicant_middle_name:
        applicantDetails.middle_name == 'undefined'
          ? ''
          : applicantDetails.middle_name,
      applicant_suffix_name:
        applicantDetails.suffix_name == 'na'
          ? ' '
          : applicantDetails.suffix_name,
      applicant_tin_number:
        applicantDetails.tin_number == 'undefined'
          ? ''
          : applicantDetails.tin_number,
      applicant_contact_number:
        applicantDetails.contact_number == 'undefined'
          ? ''
          : applicantDetails.contact_number,
      applicant_email_address:
        applicantDetails.email_address == 'undefined'
          ? ''
          : applicantDetails.email_address,
      applicant_house_number:
        applicantDetails.house_number == 'undefined'
          ? ''
          : applicantDetails.house_number,
      applicant_unit_number:
        applicantDetails.unit_number == 'undefined'
          ? ''
          : applicantDetails.unit_number,
      applicant_floor_number:
        applicantDetails.floor_number == 'undefined'
          ? ''
          : applicantDetails.floor_number,
      applicant_street_name:
        applicantDetails.street_name == 'undefined'
          ? ''
          : applicantDetails.street_name,
      applicant_barangay:
        applicantDetails.barangay == 'undefined'
          ? ''
          : applicantDetails.barangay,
      applicant_province: 'Benguet',
      applicant_city: 'Baguio City',
      appicant_zipcode: '2600',
      project_house_number:
        projectDetails.house_number == 'undefined'
          ? ''
          : projectDetails.house_number,
      project_lot_number:
        projectDetails.lot_number == 'undefined'
          ? ''
          : projectDetails.lot_number,
      project_block_number:
        projectDetails.block_number == 'undefined'
          ? ''
          : projectDetails.lot_number,
      project_street_name:
        projectDetails.street_name == 'undefined'
          ? ''
          : projectDetails.street_name,
      project_number_of_units:
        projectDetails.number_of_units == 'undefined'
          ? ''
          : projectDetails.number_of_units,
      project_barangay:
        projectDetails.barangay == 'undefined' ? '' : projectDetails.barangay,
      project_number_of_basement:
        projectDetails.number_of_basement == 'undefined'
          ? ''
          : projectDetails.number_of_basement,
      project_lot_area:
        projectDetails.lot_area == 'undefined' ? '' : projectDetails.lot_area,
      project_total_floor_area:
        projectDetails.total_floor_area == 'undefined'
          ? ''
          : projectDetails.total_floor_area,
      project_units:
        projectDetails.number_of_units == 'undefined'
          ? ''
          : projectDetails.number_of_units,
      project_number_of_storey:
        projectDetails.number_of_storey == 'undefined'
          ? ''
          : projectDetails.number_of_storey,
      project_title:
        projectDetails.project_title == 'undefined'
          ? ''
          : projectDetails.project_title,
      project_cost_cap:
        projectDetails.project_cost_cap == 'undefined'
          ? ''
          : projectDetails.project_cost_cap,
      project_tct_number:
        projectDetails.tct_number == 'undefined'
          ? ''
          : projectDetails.tct_number,
      project_tax_dec_number:
        projectDetails.tax_dec_number == 'undefined'
          ? ''
          : projectDetails.tax_dec_number,
      project_province: 'Benguet',
      project_city: 'Baguio City',
      project_zipcode: '2600',
      // rep_full_name: `${repDetails.first_name} ${repDetails.last_name}`,
      // project_location: `${projectDetails.house_number}, ${projectDetails.street_name}, ${projectDetails.barangay}`,
    };
    if (repDetails) {
      this.formData['rep_first_name'] = repDetails.first_name
        ? repDetails.first_name
        : '';
      this.formData['rep_last_name'] = repDetails.last_name
        ? repDetails.last_name
        : '';
      this.formData['rep_middle_name'] = repDetails.middle_name
        ? repDetails.middle_name
        : '';
      this.formData['rep_suffix_name'] = repDetails.suffix_name
        ? repDetails.suffix_name
        : '';
      this.formData['rep_house_number'] = repDetails.house_number
        ? repDetails.house_number
        : '';
      this.formData['rep_street_name'] = repDetails.street_name
        ? repDetails.street_name
        : '';
      this.formData['rep_barangay'] = repDetails.barangay
        ? repDetails.barangay
        : '';
      this.formData['rep_contact_number'] = repDetails.contact_number
        ? repDetails.contact_number
        : '';
      this.formData['rep_province'] = 'Benguet';
      this.formData['rep_city'] = 'Baguio City';
      this.formData['rep_zipcode'] = '2600';
    }
    console.log(this.applicationInfo);
    console.log('formData:', this.formData);
    this.isLoading = false;
  }
}
