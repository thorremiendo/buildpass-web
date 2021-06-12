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
  public user;
  public userDetails;
  public maxLength: number = 11;
  public applicationDetails;
  public additionalPermits;
  public barangay: Barangay[];
  public isLoading: boolean = true;
  public formChange;
  tinMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
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
    this.isLoading = true;
    this.createForm();
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.patchUserDetails();
    }
    this._registerAccountFormService.cast.subscribe(
      (registerAccountSubject) => (this.userDetails = registerAccountSubject)
    );
    if (localStorage.getItem('newApplicationInfo')) {
      this.applicationDetails = JSON.parse(
        localStorage.getItem('newApplicationInfo')
      );
    } else {
      this.newApplicationFormService.newApplicationSubject
        .asObservable()
        .subscribe(
          (newApplicationSubject) =>
            (this.applicationDetails = newApplicationSubject)
        );
    }

    this.isLoading = false;
  }

  patchUserDetails() {
    this._personalInfoFormCommonFields.patchValue({
      owner_first_name: this.user.first_name,
      owner_middle_name: this.user.middle_name,
      owner_last_name: this.user.last_name,
      owner_contact_number: this.user.contact_number,
      owner_email_address: this.user.email_address,
    });
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
      owner_tin_number: [
        '',
        [Validators.required, Validators.pattern('[0-9 -]{11}')],
      ],
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
      owner_lot_number: [''],
      owner_block_number: [''],
      owner_purok: [''],
      owner_subdivision: [''],
      owner_barangay: ['', Validators.required],
      owner_province: [''],
      owner_municipality: [''],
      owner_zip_code: [''],
      blank: [''],
    });
    this.isLoading = false;
    this._personalInfoFormCommonFields.valueChanges.subscribe((data) => {
      this.formChange = data;
    });
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
      owner_lot_number: this._personalInfoFormCommonFields.value
        .owner_lot_number,
      owner_block_number: this._personalInfoFormCommonFields.value
        .owner_block_number,
      owner_purok: this._personalInfoFormCommonFields.value.owner_purok,
      owner_subdivision: this._personalInfoFormCommonFields.value
        .owner_subdivision,
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
