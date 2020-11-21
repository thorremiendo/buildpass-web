import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { RegisterAccountFormService } from '../../../core/services/register-account-form.service';

@Component({
  selector: 'app-common-fields-personal-info',
  templateUrl: './common-fields-personal-info.component.html',
  styleUrls: ['./common-fields-personal-info.component.scss'],
})
export class CommonFieldsPersonalInfoComponent implements OnInit {
  public userDetails;
  public maxLength: number = 11;

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

  createForm() {
    this._personalInfoFormCommonFields = this._fb.group({
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      suffix_name: [''],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['Filipino', Validators.required],
      marital_status: ['', Validators.required],
      tin_number: ['', Validators.required],
      contact_number: ['', [Validators.required, Validators.maxLength(11)]],
      email_address: ['', Validators.required],
    });
  }

  createUserDetails() {
    this.userDetails = {
      first_name: this._personalInfoFormCommonFields.value.first_name,
      middle_name: this._personalInfoFormCommonFields.value.middle_name,
      last_name: this._personalInfoFormCommonFields.value.last_name,
      suffix_name: this._personalInfoFormCommonFields.value.suffix_name,
      birthdate: this._personalInfoFormCommonFields.value.birthdate,
      gender: this._personalInfoFormCommonFields.value.gender,
      nationality: this._personalInfoFormCommonFields.value.nationality,
      marital_status: this._personalInfoFormCommonFields.value.marital_status,
      tin_number: this._personalInfoFormCommonFields.value.tin_number,
      contact_number: this._personalInfoFormCommonFields.value.contact_number,
      email: this._personalInfoFormCommonFields.value.email_address,
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
    this._router.navigateByUrl('/dashboard/new/initial-forms/zoning-clearance');
  }

  ngOnInit(): void {
    this._registerAccountFormService.cast.subscribe(
      (registerAccountSubject) => (this.userDetails = registerAccountSubject)
    );
    this.createForm();

    this._personalInfoFormCommonFields.patchValue({
      first_name: this.userDetails.first_name,
      last_name: this.userDetails.last_name,
      email_address: this.userDetails.email,
      suffix_name: this.userDetails.suffix_name,
      birthdate: this.userDetails.birthdate,
      gender: this.userDetails.gender,
      marital_status: this.userDetails.marital_status,
      contact_number: this.userDetails.contact_number,
    });
  }
}
