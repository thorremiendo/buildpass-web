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
      representative_middle_initial: this.projectDetails.representative_middle_initial,
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
      representative_middle_initial: [''],
      representative_suffix: ['', Validators.required],
      representative_house_number: ['', Validators.required],
      representative_street_name: [''],
      representative_barangay: ['', Validators.required],
      representative_province: ['', Validators.required]
    });
  }
  createprojectDetails() {
    this.representativeDetails = {
      representative_first_name: this.representativeDetailsForm.value.representative_first_name,
      representative_last_name: this.representativeDetailsForm.value.representative_last_name,
      representative_middle_initial: this.representativeDetailsForm.value.representative_middle_initial,
      representative_suffix: this.representativeDetailsForm.value.representative_suffix,
      representative_house_number: this.representativeDetailsForm.value.representative_house_number,
      representative_street_name: this.representativeDetailsForm.value.representative_street_name,
      representative_barangay: this.representativeDetailsForm.value.representative_barangay,
      representative_province: "Baguio City",
      project_lot_number: this.projectDetails.project_lot_number,
      project_block_number: this.projectDetails.project_block_number,
      project_floor_number: this.projectDetails.project_floor_number,
      project_street: this.projectDetails.project_street,
      project_unit_number: this.projectDetails.project_unit_number,
      project_barangay: this.projectDetails.project_barangay,
      project_municipality: this.projectDetails.project_municipality,
      project_lot_area: this.projectDetails.project_lot_area,
      project_floor_area: this.projectDetails.project_floor_area,
      project_units: this.projectDetails.project_units,
      project_storeys: this.projectDetails.project_storeys,
      project_title: this.projectDetails.project_title,
      project_cost: this.projectDetails.project_cost,
      project_tct_number: this.projectDetails.project_tct_number,
      project_td_number: this.projectDetails.project_td_number,
      owner_first_name: this.projectDetails.owner_first_name,
      owner_last_name: this.projectDetails.owner_last_name,
      owner_suffix: this.projectDetails.owner_suffix,
      owner_tin_number: this.projectDetails.owner_tin_number,
      owner_contact_number: this.projectDetails.owner_contact_number,
      owner_email_address: this.projectDetails.owner_email_address,
      owner_house_number: this.projectDetails.owner_house_number,
      owner_unit_number: this.projectDetails.owner_unit_number,
      owner_floor_number: this.projectDetails.owner_floor_number,
      owner_street: this.projectDetails.owner_street,
      owner_barangay: this.projectDetails.owner_barangay,
      owner_province: "Benguet",
      owner_municipality: "Baguio City",
      owner_zip_code: "2600",
      blank: this.projectDetails.blank

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
