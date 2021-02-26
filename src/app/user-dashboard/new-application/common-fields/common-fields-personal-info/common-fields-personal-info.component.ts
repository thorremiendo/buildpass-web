import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { RegisterAccountFormService } from 'src/app/core/services/register-account-form.service';
import { BarangayService } from 'src/app/core/services/barangay.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ExcavationPermitService } from 'src/app/core/services/excavation-permit.service';

export interface Barangay {
  id: number;
  b_id: number;
  name: string;
  locality_id: number;
  province_id: number;
  zip_code: number;
  region_id: number;
  country_id: number;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-common-fields-personal-info',
  templateUrl: './common-fields-personal-info.component.html',
  styleUrls: ['./common-fields-personal-info.component.scss'],
})
export class CommonFieldsPersonalInfoComponent implements OnInit {
  public userDetails;
  public maxLength: number = 11;
  public applicationDetails;
  public additionalPermits;
  public barangay: Barangay[];
  public isLoading: boolean = true;
  public useExistingInfo;
  _personalInfoFormCommonFields: FormGroup;
  _submitted = false;

  get personalInfoFormCommonFieldControl() {
    return this._personalInfoFormCommonFields.controls;
  }
  _filteredBarangayOptions: Observable<Barangay[]>;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _registerAccountFormService: RegisterAccountFormService,
    private newApplicationFormService: NewApplicationFormService,
    private barangayService: BarangayService,
    private excavationService: ExcavationPermitService
  ) {
    this.createForm();
    this.barangayService.getBarangayInfo().subscribe((data) => {
      this.barangay = data;

      this._filteredBarangayOptions = this.personalInfoFormCommonFieldControl.owner_barangay.valueChanges.pipe(
        startWith(''),
        map((barangay) =>
          barangay ? this._filter(barangay) : this.barangay.slice()
        )
      );
    });
  }

  ngOnInit(): void {
    this.createForm();

    this._registerAccountFormService.cast.subscribe(
      (registerAccountSubject) => (this.userDetails = registerAccountSubject)
    );
    this.excavationService.useExistingInfoSubject
      .asObservable()
      .subscribe(
        (useExistingInfoSubject) =>
          (this.useExistingInfo = useExistingInfoSubject)
      );

    if (this.useExistingInfo == '1') {
      this.applicationDetails = JSON.parse(
        localStorage.getItem('applicationDetails')
      );

      this._personalInfoFormCommonFields.patchValue({
        owner_first_name:
          this.applicationDetails.applicant_detail.first_name == 'undefined'
            ? ''
            : this.applicationDetails.applicant_detail.first_name,
        owner_middle_name:
          this.applicationDetails.applicant_detail.middle_name == 'undefined'
            ? ''
            : this.applicationDetails.applicant_detail.middle_name,
        owner_last_name:
          this.applicationDetails.applicant_detail.last_name == 'undefined'
            ? ''
            : this.applicationDetails.applicant_detail.last_name,
        owner_email_address:
          this.applicationDetails.applicant_detail.email_address == 'undefined'
            ? ''
            : this.applicationDetails.applicant_detail.email_address,
        owner_suffix: '',
        owner_contact_number:
          this.applicationDetails.applicant_detail.contact_number == 'undefined'
            ? ''
            : this.applicationDetails.applicant_detail.contact_number,
        owner_house_number:
          this.applicationDetails.applicant_detail.house_number == 'undefined'
            ? ''
            : this.applicationDetails.applicant_detail.house_number,
        owner_unit_number:
          this.applicationDetails.applicant_detail.unit_number == 'undefined'
            ? ''
            : this.applicationDetails.applicant_detail.unit_number,
        owner_floor_number:
          this.applicationDetails.applicant_detail.floor_number == 'undefined'
            ? ''
            : this.applicationDetails.applicant_detail.street_name,
        owner_street:
          this.applicationDetails.applicant_detail.street_name == 'undefined'
            ? ''
            : this.applicationDetails.applicant_detail.street_name,
        owner_barangay:
          this.applicationDetails.applicant_detail.barangay == 'undefined'
            ? ''
            : this.applicationDetails.applicant_detail.barangay,
        owner_province: 'Benguet',
        owner_municipality: 'Baguio City',
        owner_zip_code: '2600',
        owner_tin_number:
          this.applicationDetails.applicant_detail.tin_number == 'undefined'
            ? ''
            : this.applicationDetails.applicant_detail.tin_number,
        blank: this.userDetails.blank,
      });
    } else {
      this.newApplicationFormService.newApplicationSubject
        .asObservable()
        .subscribe(
          (newApplicationSubject) =>
            (this.applicationDetails = newApplicationSubject)
        );
    }

    console.log(this.applicationDetails);

    console.log(this._personalInfoFormCommonFields);
  }

  private _filter(value: string): Barangay[] {
    const filterValue = value.toLowerCase();

    return this.barangay.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
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
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.pattern('(09)[0-9 ]{9}'),
        ],
      ],
      owner_email_address: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      owner_house_number: [''],
      owner_unit_number: [''],
      owner_floor_number: [''],
      owner_street: [''],
      owner_barangay: ['', Validators.required],
      owner_province: [''],
      owner_municipality: [''],
      owner_zip_code: [''],
      blank: [''],
    });
    this.isLoading = false;
  }

  createUserDetails() {
    this.userDetails = {
      owner_first_name: this._personalInfoFormCommonFields.value
        .owner_first_name,
      owner_middle_name: this._personalInfoFormCommonFields.value
        .owner_middle_name,
      owner_last_name: this._personalInfoFormCommonFields.value.owner_last_name,
      owner_suffix: this._personalInfoFormCommonFields.value.owner_suffix
        ? this._personalInfoFormCommonFields.value.owner_suffix
        : 'na',
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
      is_representative: this.applicationDetails.is_representative,
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

    this.newApplicationFormService.setCommonFields(this.userDetails);
    console.log(this.userDetails);
    if (!this._personalInfoFormCommonFields.valid) {
      Swal.fire(
        'Notice!',
        `Please fill out all required fields!`,
        'info'
      ).then((result) => {});
    } else {
      Swal.fire('Success!', ``, 'success').then((result) => {
        this._router.navigateByUrl('/dashboard/new/step-two/project-site');
      });
    }
  }
}
