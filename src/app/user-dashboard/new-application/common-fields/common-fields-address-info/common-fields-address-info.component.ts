import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { RegisterAccountFormService } from 'src/app/core/services/register-account-form.service';
import { BarangayService } from 'src/app/core/services/barangay.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';

//map
import { environment } from '../../../../../environments/environment';
import { Map } from 'mapbox-gl/dist/mapbox-gl';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { Marker } from 'mapbox-gl/dist/mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { UserService } from 'src/app/core/services/user.service';
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
  selector: 'app-common-fields-address-info',
  templateUrl: './common-fields-address-info.component.html',
  styleUrls: ['./common-fields-address-info.component.scss'],
})
export class CommonFieldsAddressInfoComponent implements OnInit {
  public maxLength: number = 2;
  public projectDetails;
  public ownerDetails;
  public applicationDetails;
  public user;
  public userDetails;
  public isLoading: boolean = true;
  public projectDetailsForm: FormGroup;
  _submitted = false;
  public barangay: Barangay[];
  public permitTypeId;
  public isExcavation;
  public applicationDetailsFromService;
  public isRepresentative;
  public useExistingInfo;

  get projectDetailsFormControl() {
    return this.projectDetailsForm.controls;
  }
  _filteredBarangayOptions: Observable<Barangay[]>;

  //map
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-v9';
  lat = 16.4136559;
  lng = 120.5893339;
  public marker: mapboxgl.Marker;
  public lnglat;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _registerAccountFormService: RegisterAccountFormService,
    private newApplicationFormService: NewApplicationFormService,
    private newApplicationSerivce: NewApplicationService,
    private barangayService: BarangayService,
    private userService: UserService,
    private excavationService: ExcavationPermitService
  ) {
    this.createForm();
    this.barangayService.getBarangayInfo().subscribe((data) => {
      this.barangay = data;

      this._filteredBarangayOptions = this.projectDetailsFormControl.project_barangay.valueChanges.pipe(
        startWith(''),
        map((barangay) =>
          barangay ? this._filter(barangay) : this.barangay.slice()
        )
      );
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.userService.cast.subscribe((userSubject) => (this.user = userSubject));
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
      if (this.applicationDetails.is_excavation == 1) {
        this.isExcavation = true;
        this.isRepresentative = this.applicationDetails.is_representative;
        this.permitTypeId = '3';
      }
      this.projectDetailsForm.patchValue({
        project_lot_number:
          this.applicationDetails.project_detail.lot_number == 'undefined'
            ? ''
            : this.applicationDetails.project_detail.lot_number,
        project_block_number:
          this.applicationDetails.project_detail.block_number == 'undefined'
            ? ''
            : this.applicationDetails.project_detail.block_number,
        project_unit_number:
          this.applicationDetails.project_detail.unit_number == 0
            ? ''
            : this.applicationDetails.project_detail.unit_number,
        project_street:
          this.applicationDetails.project_detail.street_name == 'undefined'
            ? ''
            : this.applicationDetails.project_detail.street_name,
        project_barangay:
          this.applicationDetails.project_detail.barangay == 'undefined'
            ? ''
            : this.applicationDetails.project_detail.barangay,
        project_lot_area:
          this.applicationDetails.project_detail.lot_area == 'undefined'
            ? ''
            : this.applicationDetails.project_detail.lot_area,
        project_floor_area:
          this.applicationDetails.project_detail.total_floor_area == 'undefined'
            ? ''
            : this.applicationDetails.project_detail.total_floor_area,
        project_units:
          this.applicationDetails.project_detail.number_of_units == 0
            ? ''
            : this.applicationDetails.project_detail.number_of_units,
        project_storeys:
          this.applicationDetails.project_detail.number_of_storey == 'undefined'
            ? 0
            : this.applicationDetails.project_detail.number_of_storey,
        project_title:
          this.applicationDetails.project_detail.project_title == 'undefined'
            ? ''
            : this.applicationDetails.project_detail.project_title,
        project_cost:
          this.applicationDetails.project_detail.project_cost_cap == 'undefined'
            ? ''
            : this.applicationDetails.project_detail.project_cost_cap,
        project_tct_number:
          this.applicationDetails.project_detail.tct_number == 'undefined'
            ? ''
            : this.applicationDetails.project_detail.tct_number,
        project_td_number:
          this.applicationDetails.project_detail.tax_dec_number == 'undefined'
            ? ''
            : this.applicationDetails.project_detail.tax_dec_number,
        project_basement:
          this.applicationDetails.project_detail.project_basement == 'undefined'
            ? ''
            : this.applicationDetails.project_detail.project_basement,
        project_house_number:
          this.applicationDetails.project_detail.number_of_basement == 0
            ? ''
            : this.applicationDetails.project_detail.number_of_basement,
        project_landmark:
          this.applicationDetails.project_detail.landmark == 'undefined'
            ? ''
            : this.applicationDetails.project_detail.landmark,
      });
    } else {
      this._registerAccountFormService.cast.subscribe(
        (registerAccountSubject) =>
          (this.projectDetails = registerAccountSubject)
      );
      this.newApplicationFormService.commonFieldsSubject
        .asObservable()
        .subscribe((commonFieldsSubject) => {
          this.ownerDetails = commonFieldsSubject;
          this.isRepresentative = this.ownerDetails.is_representative;
        });
      this.newApplicationFormService.newApplicationSubject
        .asObservable()
        .subscribe((newApplicationSubject) => {
          this.applicationDetailsFromService = newApplicationSubject;
          this.permitTypeId = this.applicationDetailsFromService.application_type;
        });
    }

    //map
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new Map({
      container: 'map',
      style: this.style,
      zoom: 16,
      center: [this.lng, this.lat],
    });
    // Add map controls
    this.marker = new Marker({
      draggable: true,
    })
      .setLngLat([this.lng, this.lat])
      .addTo(this.map); //

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: {
          draggable: true,
        },
      })
    );
    this.marker.on('dragend', this.onDragEnd);

    this.isLoading = false;
  }

  onDragEnd() {
    console.log('marker dragged');
  }

  private _filter(value: string): Barangay[] {
    const filterValue = value.toLowerCase();

    return this.barangay.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  createForm() {
    this.projectDetailsForm = this._fb.group({
      project_house_number: [''],
      project_lot_number: ['', Validators.required],
      project_block_number: [''],
      project_unit_number: [''],
      project_street: [''],
      project_barangay: ['', Validators.required],
      project_lot_area: ['', Validators.required],
      project_floor_area: ['', Validators.required],
      project_units: [''],
      project_storeys: ['', Validators.required],
      project_title: ['', Validators.required],
      project_cost: ['', Validators.required],
      project_tct_number: ['', Validators.required],
      project_td_number: ['', Validators.required],
      project_basement: [''],
      project_landmark: [''],
    });
  }

  createprojectDetails() {
    this.projectDetails = {
      project_house_number: this.projectDetailsForm.value.project_house_number,
      project_lot_number: this.projectDetailsForm.value.project_lot_number,
      project_block_number: this.projectDetailsForm.value.project_block_number,
      project_street_name: this.projectDetailsForm.value.project_street,
      project_number_of_units: this.projectDetailsForm.value.project_units
        ? this.projectDetailsForm.value.project_units
        : 0,
      project_barangay: this.projectDetailsForm.value.project_barangay,
      project_number_of_basement: this.projectDetailsForm.value.project_basement
        ? this.projectDetailsForm.value.project_basement
        : 0,
      project_lot_area: this.projectDetailsForm.value.project_lot_area,
      project_total_floor_area: this.projectDetailsForm.value
        .project_floor_area,
      project_units: this.projectDetailsForm.value.project_unit_number
        ? this.projectDetailsForm.value.project_unit_number
        : 0,
      project_number_of_storey: this.projectDetailsForm.value.project_storeys
        ? this.projectDetailsForm.value.project_storeys
        : 0,
      project_title: this.projectDetailsForm.value.project_title,
      project_cost_cap: this.projectDetailsForm.value.project_cost,
      project_tct_number: this.projectDetailsForm.value.project_tct_number,
      project_tax_dec_number: this.projectDetailsForm.value.project_td_number,
      project_landmark: this.projectDetailsForm.value.project_landmark,
    };
  }

  onSubmit() {
    this.isLoading = true;
    this._submitted = true;
    if (!this.isExcavation) {
      this.createprojectDetails();
    } else {
      this.projectDetails = this.applicationDetails.project_detail;
    }
    console.log(this.projectDetailsForm.value.project_barangay);
    const body = {
      user_id: this.user.id,
      permit_type_id: this.applicationDetailsFromService
        ? this.applicationDetailsFromService.application_type
        : this.applicationDetails.permit_type_id,
      is_representative: this.applicationDetailsFromService
        ? this.applicationDetailsFromService.is_representative
        : this.applicationDetails.is_representative,
      rol_status_id: this.applicationDetailsFromService
        ? this.applicationDetailsFromService.is_lot_owner
        : this.applicationDetails.rol_status_id,
      construction_status_id: this.applicationDetailsFromService
        ? this.applicationDetailsFromService.construction_status
        : this.applicationDetails.construction_status_id,
      is_registered_owner: this.applicationDetailsFromService
        ? this.applicationDetailsFromService.registered_owner
        : this.applicationDetails.is_registered_owner,
      applicant_first_name: this.ownerDetails
        ? this.ownerDetails.owner_first_name
        : this.applicationDetails.applicant_detail.first_name,
      applicant_middle_name: this.ownerDetails
        ? this.ownerDetails.owner_middle_name
        : this.applicationDetails.applicant_detail.middle_name,
      applicant_last_name: this.ownerDetails
        ? this.ownerDetails.owner_last_name
        : this.applicationDetails.applicant_detail.last_name,
      applicant_suffix_name: this.ownerDetails
        ? this.ownerDetails.owner_suffix
        : this.applicationDetails.applicant_detail.suffix_name,
      applicant_tin_number: this.ownerDetails
        ? this.ownerDetails.owner_tin_number
        : this.applicationDetails.applicant_detail.tin_number,
      applicant_contact_number: this.ownerDetails
        ? this.ownerDetails.owner_contact_number
        : this.applicationDetails.applicant_detail.contact_number,
      applicant_email_address: this.ownerDetails
        ? this.ownerDetails.owner_email_address
        : this.applicationDetails.applicant_detail.email_address,
      applicant_house_number: this.ownerDetails
        ? this.ownerDetails.owner_house_number
        : this.applicationDetails.applicant_detail.house_number,
      applicant_unit_number: this.ownerDetails
        ? this.ownerDetails.owner_unit_number
        : this.applicationDetails.applicant_detail.unit_number,
      applicant_floor_number: this.ownerDetails
        ? this.ownerDetails.owner_floor_number
        : this.applicationDetails.applicant_detail.floor_number,
      applicant_street_name: this.ownerDetails
        ? this.ownerDetails.owner_street
        : this.applicationDetails.applicant_detail.street_name,
      applicant_barangay: this.ownerDetails
        ? this.ownerDetails.owner_barangay
        : this.applicationDetails.applicant_detail.barangay,
      ...this.projectDetails,
    };
    if (this.isExcavation) {
      this.applicationDetails.permit_type_id = '3';
      body['main_permit_id'] = this.applicationDetails.id;
      body['permit_type_id'] = this.applicationDetails.permit_type_id;
    }
    if (!this.projectDetailsForm.valid) {
      Swal.fire('Notice!', 'Please fill out all required fields!', 'info').then(
        (result) => {
          this.isLoading = false;
        }
      );
    } else {
      if (this.isRepresentative == '2') {
        this.newApplicationSerivce.submitApplication(body).subscribe((res) => {
          Swal.fire(
            'Success!',
            'Application Details Submitted!',
            'success'
          ).then((result) => {
            this.isLoading = false;

            switch (this.permitTypeId) {
              case '1':
                this._router.navigateByUrl(
                  '/dashboard/new/initial-forms/zoning-clearance'
                );
                break;
              case '2':
                // occupancy permit
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
          });
        });
      } else {
        this.newApplicationFormService.setCommonFields(body);
        this._router.navigateByUrl('/dashboard/new/step-two/representative');
      }
    }
  }
}
