import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { RegisterAccountFormService } from 'src/app/core/services/register-account-form.service';

@Component({
  selector: 'app-common-fields-personal-info',
  templateUrl: './common-fields-personal-info.component.html',
  styleUrls: ['./common-fields-personal-info.component.scss'],
})
export class CommonFieldsPersonalInfoComponent implements OnInit {
  public userDetails;
  public maxLength: number = 11;
  public applicationDetails;

  _personalInfoFormCommonFields: FormGroup;
  _submitted = false;

  get personalInfoFormCommonFieldControl() {
    return this._personalInfoFormCommonFields.controls;
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
      (registerAccountSubject) => (this.userDetails = registerAccountSubject)
    );
    this._commonFieldsFormService.newApplicationSubject
      .asObservable()
      .subscribe(
        (newApplicationSubject) =>
          (this.applicationDetails = newApplicationSubject)
      );
    this.createForm();

    this._personalInfoFormCommonFields.patchValue({
      owner_first_name: this.userDetails.owner_first_name,
      owner_last_name: this.userDetails.owner_last_name,
      owner_email_address: this.userDetails.owner_email_address,
      owner_suffix: this.userDetails.owner_suffix,
      owner_contact_number: this.userDetails.owner_contact_number,
      owner_house_number: this.userDetails.owner_house_number,
      owner_unit_number: this.userDetails.owner_unit_number,
      owner_floor_number: this.userDetails.owner_floor_number,
      owner_street: this.userDetails.owner_street,
      owner_barangay: this.userDetails.owner_barangay,
      owner_province: this.userDetails.owner_province,
      owner_municipality: this.userDetails.owner_municipality,
      owner_zip_code: this.userDetails.owner_zip_code,
      blank: this.userDetails.blank,
    });
    console.log(this._personalInfoFormCommonFields);
  }

  createForm() {
    this._personalInfoFormCommonFields = this._fb.group({
      owner_first_name: ['', Validators.required],
      owner_middle_name: [''],
      owner_last_name: ['', Validators.required],
      owner_suffix: [''],
      owner_tin_number: ['', Validators.required],
      owner_contact_number: [
        '',
        [Validators.required, Validators.maxLength(11)],
      ],
      owner_email_address: ['', Validators.required],
      owner_house_number: ['', Validators.required],
      owner_unit_number: ['', Validators.required],
      owner_floor_number: ['', Validators.required],
      owner_street: ['', Validators.required],
      owner_barangay: ['', Validators.required],
      owner_province: ['', Validators.required],
      owner_municipality: ['', Validators.required],
      owner_zip_code: ['', Validators.required],
      blank: [''],
    });
  }

  createUserDetails() {
    this.userDetails = {
      owner_first_name: this._personalInfoFormCommonFields.value
        .owner_first_name,
      owner_last_name: this._personalInfoFormCommonFields.value.owner_last_name,
      owner_suffix: this._personalInfoFormCommonFields.value.owner_suffix,
      owner_tin_number: this._personalInfoFormCommonFields.value
        .owner_tin_number,
      owner_contact_number: this._personalInfoFormCommonFields.value
        .owner_contact_number,
      owner_email_address: this._personalInfoFormCommonFields.value
        .owner_email_address,
      owner_house_number: this._personalInfoFormCommonFields.value
        .owner_house_number,
      owner_unit_number: this._personalInfoFormCommonFields.value
        .owner_unit_number,
      owner_floor_number: this._personalInfoFormCommonFields.value
        .owner_floor_number,
      owner_street: this._personalInfoFormCommonFields.value.owner_street,
      owner_barangay: this._personalInfoFormCommonFields.value.owner_barangay,
      owner_province: 'Benguet',
      owner_municipality: 'Baguio City',
      owner_zip_code: '2600',
      blank: this._personalInfoFormCommonFields.value.blank,
      is_representative: this.applicationDetails.is_representative

    };
  }

  dateToString() {
    if (this._personalInfoFormCommonFields.value.birthdate != null) {
      let dd = this._personalInfoFormCommonFields.value.birthdate.getDate();
      let mm = this._personalInfoFormCommonFields.value.birthdate.getMonth();
      let yyyy = this._personalInfoFormCommonFields.value.birthdate.getFullYear();
      let birthdateString = `${yyyy}-${mm}-${dd}`;
      this._personalInfoFormCommonFields.value.birthdate = birthdateString;
    }
  }

  onSubmit() {
    this._submitted = true;
    this.dateToString();

    this.createUserDetails();

    this._commonFieldsFormService.setCommonFields(this.userDetails);
    console.log(this.userDetails);
    this._router.navigateByUrl('/dashboard/new/step-two/project-site');
  }
}
