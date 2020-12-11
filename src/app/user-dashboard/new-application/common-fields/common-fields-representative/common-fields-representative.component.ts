import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { RegisterAccountFormService } from 'src/app/core/services/register-account-form.service';


@Component({
  selector: 'app-common-fields-representative',
  templateUrl: './common-fields-representative.component.html',
  styleUrls: ['./common-fields-representative.component.scss']
})
export class CommonFieldsRepresentativeComponent implements OnInit {
  public projectDetails;
  public representativeDetails;

  public representativeDetailsForm: FormGroup;
  _submitted = false;

  get representativeDetailsFormControl() {
    return this.representativeDetailsForm.controls;
  }
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _registerAccountFormService: RegisterAccountFormService,
    private _commonFieldsFormService: NewApplicationFormService
  ) { 
    this.createForm();

  }

  ngOnInit(): void {
    this._registerAccountFormService.cast.subscribe(
      (registerAccountSubject) => (this.projectDetails = registerAccountSubject)
    );
    this._commonFieldsFormService.commonFieldsSubject
    .asObservable()
    .subscribe(
      (commonFieldsSubject) => (this.projectDetails = commonFieldsSubject)
    );
    this.createForm();

    this.representativeDetailsForm.patchValue({
      representative_first_name: this.projectDetails.representative_first_name,
      representative_last_name: this.projectDetails.representative_last_name,
      representative_middle_name: this.projectDetails.representative_middle_name,
      representative_suffix: this.projectDetails.representative_suffix,
      representative_house_number: this.projectDetails.representative_house_number,
      representative_street_name: this.projectDetails.representative_street_name,
      representative_barangay: this.projectDetails.representative_barangay,
      representative_province: this.projectDetails.representative_province,
    });
  }
  createForm() {
    this.representativeDetailsForm = this._fb.group({
      representative_first_name: ['', Validators.required],
      representative_last_name: ['', Validators.required],
      representative_middle_name: [''],
      representative_suffix: ['', Validators.required],
      representative_house_number: ['', Validators.required],
      representative_street_name: [''],
      representative_barangay: ['', Validators.required],
      representative_province: ['', Validators.required]
    });
  }
  createprojectDetails() {
    this.representativeDetails = {
      rep_first_name: this.representativeDetailsForm.value.representative_first_name,
      rep_last_name: this.representativeDetailsForm.value.representative_last_name,
      rep_middle_name: this.representativeDetailsForm.value.representative_middle_name,
      rep_suffix_name: this.representativeDetailsForm.value.representative_suffix,
      rep_house_number: this.representativeDetailsForm.value.representative_house_number,
      rep_street_name: this.representativeDetailsForm.value.representative_street_name,
      rep_barangay: this.representativeDetailsForm.value.representative_barangay,
      applicant_first_name: this.projectDetails.applicant_first_name,
      applicant_last_name: this.projectDetails.applicant_last_name,
      applicant_suffix_name: this.projectDetails.applicant_suffix_name,
      applicant_tin_number: this.projectDetails.applicant_tin_number,
      applicant_contact_number: this.projectDetails.applicant_contact_number,
      applicant_email_address: this.projectDetails.applicant_email_address,
      applicant_house_number: this.projectDetails.applicant_house_number,
      applicant_unit_number: this.projectDetails.applicant_unit_number,
      applicant_floor_number: this.projectDetails.applicant_floor_number,
      applicant_street_name: this.projectDetails.applicant_street_name,
      applicant_barangay: this.projectDetails.applicant_barangay,
      project_house_number: this.projectDetails.value.project_house_number,
      project_lot_number: this.projectDetails.value.project_lot_number,
      project_block_number: this.projectDetails.value.project_block_number,
      project_street_name: this.projectDetails.value.project_street_name,
      project_number_of_units: this.projectDetails.value
        .project_number_of_units,
      project_barangay: this.projectDetails.value.project_barangay,
      project_number_of_basement: this.projectDetails.value
        .project_number_of_basement,
      project_lot_area: this.projectDetails.value.project_lot_area,
      project_total_floor_area: this.projectDetails.value
        .project_total_floor_area,
      project_units: this.projectDetails.value.project_units,
      project_number_of_storey: this.projectDetails.value.project_number_of_storey,
      project_title: this.projectDetails.value.project_title,
      project_cost_cap: this.projectDetails.value.project_cost_cap,
      project_tct_number: this.projectDetails.value.project_tct_number,
      project_tax_dec_number: this.projectDetails.value.project_tax_dec_number,

    };
  }
  onSubmit() {
    this._submitted = true;

    this.createprojectDetails();

    this._commonFieldsFormService.setCommonFields(this.representativeDetails);
    console.log(this.representativeDetails);
    this._router.navigateByUrl('/dashboard/new/initial-forms/zoning-clearance');
  }

}
