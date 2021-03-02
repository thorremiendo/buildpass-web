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
      applicant_full_name: `${applicantDetails.first_name} ${applicantDetails.last_name}`.toUpperCase(),
      applicant_first_name:
        applicantDetails.first_name == 'undefined'
          ? 'N/A'
          : applicantDetails.first_name.toUpperCase(),
      applicant_last_name:
        applicantDetails.last_name == 'undefined'
          ? 'N/A'
          : applicantDetails.last_name.toUpperCase(),
      applicant_middle_name:
        applicantDetails.middle_name == 'undefined'
          ? 'N/A'
          : applicantDetails.middle_name.toUpperCase(),
      applicant_suffix_name:
        applicantDetails.suffix_name == 'na'
          ? ' '
          : applicantDetails.suffix_name.toUpperCase(),
      applicant_tin_number:
        applicantDetails.tin_number == 'undefined'
          ? 'N/A'
          : applicantDetails.tin_number,
      applicant_contact_number:
        applicantDetails.contact_number == 'undefined'
          ? 'N/A'
          : applicantDetails.contact_number,
      applicant_email_address:
        applicantDetails.email_address == 'undefined'
          ? 'N/A'
          : applicantDetails.email_address.toUpperCase(),
      applicant_house_number:
        applicantDetails.house_number == 'undefined'
          ? 'N/A'
          : applicantDetails.house_number.toUpperCase(),
      applicant_unit_number:
        applicantDetails.unit_number == 'undefined'
          ? 'N/A'
          : applicantDetails.unit_number,
      applicant_floor_number:
        applicantDetails.floor_number == 'undefined'
          ? 'N/A'
          : applicantDetails.floor_number,
      applicant_street_name:
        applicantDetails.street_name == 'undefined'
          ? 'N/A'
          : applicantDetails.street_name.toUpperCase(),
      applicant_barangay:
        applicantDetails.barangay == 'undefined'
          ? 'N/A'
          : applicantDetails.barangay.toUpperCase(),
      applicant_province: 'BENGUET',
      applicant_city: 'BAGUIO CITY',
      appicant_zipcode: '2600',
      project_house_number:
        projectDetails.house_number == 'undefined'
          ? 'N/A'
          : projectDetails.house_number,
      project_lot_number:
        projectDetails.lot_number == 'undefined'
          ? 'N/A'
          : projectDetails.lot_number,
      project_block_number:
        projectDetails.block_number == 'undefined'
          ? 'N/A'
          : projectDetails.block_number,
      project_street_name:
        projectDetails.street_name == 'undefined'
          ? 'N/A'
          : projectDetails.street_name.toUpperCase(),
      project_number_of_units:
        projectDetails.number_of_units == 'undefined'
          ? 'N/A'
          : projectDetails.number_of_units,
      project_barangay:
        projectDetails.barangay == 'undefined'
          ? 'N/A'
          : projectDetails.barangay.toUpperCase(),
      project_number_of_basement:
        projectDetails.number_of_basement == 'undefined'
          ? 'N/A'
          : projectDetails.number_of_basement,
      project_lot_area:
        projectDetails.lot_area == 'undefined'
          ? 'N/A'
          : projectDetails.lot_area,
      project_total_floor_area:
        projectDetails.total_floor_area == 'undefined'
          ? 'N/A'
          : projectDetails.total_floor_area,
      project_units:
        projectDetails.number_of_units == 'undefined'
          ? 'N/A'
          : projectDetails.number_of_units,
      project_number_of_storey:
        projectDetails.number_of_storey == 'undefined'
          ? 'N/A'
          : projectDetails.number_of_storey,
      untitled26:
        projectDetails.project_title == 'undefined'
          ? 'N/A'
          : projectDetails.project_title.toUpperCase(),
      project_tct_number:
        projectDetails.tct_number == 'undefined'
          ? 'N/A'
          : projectDetails.tct_number,
      project_tax_dec_number:
        projectDetails.tax_dec_number == 'undefined'
          ? 'N/A'
          : projectDetails.tax_dec_number,
      project_province: 'BENGUET',
      project_city: 'BAGUIO CITY',
      project_zipcode: '2600',
      untitled34:
        projectDetails.project_cost_cap == 'undefined'
          ? 0
          : `${NumberToWords.toWords(
              projectDetails.project_cost_cap == 'undefined'
                ? 0
                : projectDetails.project_cost_cap
            ).toUpperCase()} PESOS`,
      rep_first_name:
        repDetails == null ? 'N/A' : repDetails.first_name.toUpperCase(),
      rep_last_name:
        repDetails == null ? 'N/A' : repDetails.last_name.toUpperCase(),
      rep_middle_name:
        repDetails == null || repDetails.middle_name == ''
          ? 'N/A'
          : repDetails.middle_name.toUpperCase(),
      rep_suffix_name: repDetails == null ? 'N/A' : repDetails.suffix_name,
      rep_house_number: repDetails == null ? 'N/A' : repDetails.house_number,
      rep_street_name:
        repDetails == null || repDetails.street_name == ''
          ? 'N/A'
          : repDetails.street_name.toUpperCase(),
      rep_barangay: repDetails == null ? 'N/A' : repDetails.barangay,
      rep_contact_number:
        repDetails == null ? 'N/A' : repDetails.contact_number,
      rep_province: 'BENGUET',
      rep_city: 'BAGUIO CITY',
      rep_zipcode: '2600',
      //TODO: fix these untitled formnames on pdf
      untitled6: 'N/A',
      untitled8: 'N/A',
      untitled13: 'N/A',
      untitled14: 'N/A',
      untitled15: 'N/A',
      untitled16: 'N/A',
      //TODO: data binding
      existing_land_others: 'N/A',
      position_title: 'N/A',
      right_over_land_others: 'N/A',
      project_tenure_temporary: 'N/A',
      project_nature_others: 'N/A',
    };
    console.log(this.applicationInfo);
    console.log('formData:', this.formData);
    this.isLoading = false;
  }
}
