import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { RegisterAccountFormService } from 'src/app/core/services/register-account-form.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';
import { AuthService, BarangayService } from 'src/app/core';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';

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
  selector: 'app-common-fields-representative',
  templateUrl: './common-fields-representative.component.html',
  styleUrls: ['./common-fields-representative.component.scss'],
})
export class CommonFieldsRepresentativeComponent implements OnInit {
  public projectDetails;
  public ownerDetails;
  public applicationDetails;
  public representativeDetails;
  public user;
  public userDetails;
  public isLoading: boolean = true;
  public barangay: Barangay[];
  public representativeDetailsForm: FormGroup;
  _submitted = false;
  public maxLength: number = 11;

  get representativeDetailsFormControl() {
    return this.representativeDetailsForm.controls;
  }
  _filteredBarangayOptions: Observable<Barangay[]>;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _registerAccountFormService: RegisterAccountFormService,
    private newApplicationFormService: NewApplicationFormService,
    private newApplicationService: NewApplicationService,
    private barangayService: BarangayService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.createForm();
    this.barangayService.getBarangayInfo().subscribe((data) => {
      this.barangay = data;

      this._filteredBarangayOptions = this.representativeDetailsFormControl.representative_barangay.valueChanges.pipe(
        startWith(''),
        map((barangay) =>
          barangay ? this._filter(barangay) : this.barangay.slice()
        )
      );
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (localStorage.getItem('commonFieldsInfo')) {
      this.applicationDetails = JSON.parse(
        localStorage.getItem('commonFieldsInfo')
      );
      this.isLoading = false;
    } else {
      this.newApplicationFormService.commonFieldsSubject
        .asObservable()
        .subscribe((commonFieldsSubject) => {
          this.applicationDetails = commonFieldsSubject;
        });
      this.isLoading = false;
    }

    this.createForm();
  }
  private _filter(value: string): Barangay[] {
    const filterValue = value.toLowerCase();

    return this.barangay.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  createForm() {
    this.representativeDetailsForm = this._fb.group({
      representative_first_name: ['', Validators.required],
      representative_last_name: ['', Validators.required],
      representative_middle_name: [''],
      representative_suffix: [''],
      representative_house_number: ['', Validators.required],
      representative_street_name: [''],
      representative_barangay: ['', Validators.required],
      representative_contact_no: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.pattern('(09)[0-9 ]{9}'),
        ],
      ],
      representative_email_address: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }
  createRepresentativeDetails() {
    const value = this.representativeDetailsForm.value;
    this.representativeDetails = {
      rep_first_name: value.representative_first_name,
      rep_last_name: value.representative_last_name,
      rep_middle_name: value.representative_middle_name,
      rep_suffix_name: value.representative_suffix,
      rep_house_number: value.representative_house_number,
      rep_street_name: value.representative_street_name,
      rep_barangay: value.representative_barangay,
      rep_contact_number: value.representative_contact_no,
      rep_email_address: value.representative_email_address,
    };
  }
  onSubmit() {
    this.isLoading = true;
    this._submitted = true;
    this.createRepresentativeDetails();
    if (!this.representativeDetailsForm.valid) {
      Swal.fire('Notice!', 'Please fill out all required fields!', 'info').then(
        (result) => {
          this.isLoading = false;
        }
      );
    } else {
      const body = {
        ...this.representativeDetails,
        ...this.applicationDetails,
      };
      this.newApplicationService.submitApplication(body).subscribe((res) => {
        Swal.fire('Success!', 'Application Details Submitted!', 'success').then(
          (result) => {
            this.isLoading = false;
            switch (this.applicationDetails.permit_type_id) {
              case '1':
                this._router.navigateByUrl('/dashboard/new/building-permit');
                break;
              case '2':
                this._router.navigateByUrl('/dashboard/new/occupancy-permit');
                break;
              case '3':
                this._router.navigateByUrl('/dashboard/new/excavation-permit');
                break;
              case '4':
                this._router.navigateByUrl('/dashboard/new/fencing-permit');
                break;
              case '5':
                this._router.navigateByUrl('/dashboard/new/demolition-permit');
                break;
            }
          }
        );
      });
    }
  }
}
