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
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public applicationDetailsFromService;
  public representativeDetails;
  public user;
  public userDetails;
  public isLoading: boolean = true;
  public permitTypeId;
  public barangay: Barangay[];
  public representativeDetailsForm: FormGroup;
  _submitted = false;
  public maxLength: number = 11;
  public prcFront: File;
  public prcBack: File;
  public validIdFront: File;
  public validIdBack: File;
  public regions = [];
  public cities = [];
  public provinces = [];
  public selectedRegion;
  public selectedProvince;
  public selectedCity;
  get representativeDetailsFormControl() {
    return this.representativeDetailsForm.controls;
  }
  _filteredBarangayOptions: Observable<Barangay[]>;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private newApplicationFormService: NewApplicationFormService,
    private newApplicationService: NewApplicationService,
    private barangayService: BarangayService,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
    this.barangayService.getBarangayInfo().subscribe((data) => {
      this.barangay = data;

      this._filteredBarangayOptions =
        this.representativeDetailsFormControl.representative_barangay.valueChanges.pipe(
          startWith(''),
          map((barangay) =>
            barangay ? this._filter(barangay) : this.barangay.slice()
          )
        );
    });
  }
  private _filter(value: string): Barangay[] {
    const filterValue = value.toLowerCase();

    return this.barangay.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  ngOnInit(): void {
    this.newApplicationService.fetchRegions('').subscribe((res) => {
      this.regions = res.data;
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    if (localStorage.getItem('commonFieldsInfo')) {
      this.ownerDetails = JSON.parse(localStorage.getItem('commonFieldsInfo'));
      this.isLoading = false;
    } else {
      this.newApplicationFormService.commonFieldsSubject
        .asObservable()
        .subscribe((commonFieldsSubject) => {
          this.ownerDetails = commonFieldsSubject;
        });
      this.isLoading = false;
    }
    if (localStorage.getItem('newApplicationInfo')) {
      this.applicationDetailsFromService = JSON.parse(
        localStorage.getItem('newApplicationInfo')
      );
      this.permitTypeId = this.applicationDetailsFromService.application_type;
    } else {
      this.newApplicationFormService.newApplicationSubject
        .asObservable()
        .subscribe((newApplicationSubject) => {
          this.applicationDetailsFromService = newApplicationSubject;
          this.permitTypeId =
            this.applicationDetailsFromService.application_type;
        });
    }
    this.createForm();
    if (this.ownerDetails.is_representative == 1) {
      this.patchDetails();
    }
  }

  onRegionSelect(e) {
    this.newApplicationService
      .fetchProvince('', parseInt(e.value))
      .subscribe((res) => {
        this.provinces = res.data;
      });
  }
  onProvinceSelect(e) {
    this.newApplicationService
      .fetchCities(parseInt(e.value))
      .subscribe((res) => {
        this.cities = res.data;
      });
  }
  onCitySelect(e) {
    console.log(this.selectedCity);
  }

  patchDetails() {
    console.log(this.user);
    this.representativeDetailsForm.patchValue({
      representative_first_name: this.user.first_name,
      representative_middle_name: this.user.middle_name,
      representative_last_name: this.user.last_name,
      representative_contact_no: this.user.contact_number,
      representative_email_address: this.user.email_address,
    });
  }

  createForm() {
    this.representativeDetailsForm = this._fb.group({
      representative_first_name: ['', Validators.required],
      prcNo: ['', Validators.required],
      ptcNo: ['', Validators.required],
      representative_last_name: ['', Validators.required],
      representative_middle_name: [''],
      representative_suffix: [''],
      representative_house_number: ['', Validators.required],
      representative_street_name: [''],
      representative_barangay: [''],
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
      rep_region_id: this.selectedRegion,
      rep_province_id: this.selectedProvince,
      rep_city_id: this.selectedCity,
      rep_barangay: value.representative_barangay
        ? value.representative_barangay
        : 'n/a',
      rep_contact_number: value.representative_contact_no,
      rep_email_address: value.representative_email_address,
      prc_no: value.prcNo,
      ptc_no: value.ptcNo,
      // prc_id_front_photo_path: this.prcFront,
      // prc_id_back_photo_path: this.prcBack,
      // id_front_photo_path: this.validIdFront,
      // id_back_photo_path: this.validIdBack,
      // id_type: '3',
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
        user_id: this.user.id,
        permit_type_id: this.applicationDetailsFromService.application_type,
        is_representative: this.applicationDetailsFromService.is_representative,
        rol_status_id: this.applicationDetailsFromService.is_lot_owner,
        old_permit_number: this.applicationDetailsFromService.old_permit_number,
        construction_status_id:
          this.applicationDetailsFromService.construction_status,
        is_registered_owner:
          this.applicationDetailsFromService.registered_owner,
        is_owned_by_corporation:
          this.applicationDetailsFromService.is_owned_by_corporation,
        is_property_have_coowners:
          this.applicationDetailsFromService.is_property_have_coowners,
        is_under_mortgage: this.applicationDetailsFromService.is_under_mortgage,
        is_within_subdivision:
          this.applicationDetailsFromService.is_within_subdivision,
        occupancy_classification_id:
          this.applicationDetailsFromService.occupancy_classification_id,
        applicant_first_name: this.ownerDetails.owner_first_name,
        applicant_middle_name: this.ownerDetails.owner_middle_name,
        applicant_last_name: this.ownerDetails.owner_last_name,
        applicant_suffix_name: this.ownerDetails.owner_suffix,
        applicant_tin_number: this.ownerDetails.owner_tin_number,
        applicant_contact_number: this.ownerDetails.owner_contact_number,
        applicant_email_address: this.ownerDetails.owner_email_address,
        applicant_house_number: this.ownerDetails.owner_house_number,
        applicant_unit_number: this.ownerDetails.owner_unit_number,
        applicant_floor_number: this.ownerDetails.owner_floor_number,
        applicant_street_name: this.ownerDetails.owner_street,
        applicant_barangay: this.ownerDetails.owner_barangay,
        applicant_lot_number: this.ownerDetails.owner_lot_number,
        applicant_block_number: this.ownerDetails.owner_block_number,
        applicant_subdivision: this.ownerDetails.owner_subdivision,
        applicant_purok: this.ownerDetails.owner_purok,
        applicant_region_id: this.ownerDetails.owner_region_id,
        applicant_province_id: this.ownerDetails.owner_province_id,
        applicant_city_id: this.ownerDetails.owner_city_id,

        ...this.representativeDetails,
      };
      this.newApplicationFormService.setCommonFields(body);
      this._router.navigateByUrl('/dashboard/new/step-two/project-site');
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'prcFront':
        this.prcFront = file;
        break;
      case 'prcBack':
        this.prcBack = file;
        break;
      case 'validIdFront':
        this.validIdFront = file;
        break;
      case 'validIdBack':
        this.validIdBack = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'prcFront':
        this.prcFront = null;
        break;
      case 'prcBack':
        this.prcBack = null;
        break;
      case 'validIdFront':
        this.validIdFront = null;
        break;
      case 'validIdBack':
        this.validIdBack = null;
        break;
    }
  }
}
