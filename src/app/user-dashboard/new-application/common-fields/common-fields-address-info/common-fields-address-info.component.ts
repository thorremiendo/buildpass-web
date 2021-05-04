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
  public user;
  public userDetails;
  public isLoading: boolean = false;
  public projectDetailsForm: FormGroup;
  _submitted = false;
  public barangay: Barangay[];
  public permitTypeId;
  public applicationDetailsFromService;
  public isRepresentative;
  public projectFormChange;
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
    private newApplicationFormService: NewApplicationFormService,
    private newApplicationSerivce: NewApplicationService,
    private barangayService: BarangayService,
    private userService: UserService,
    private excavationService: ExcavationPermitService
  ) {
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
    this.initializeMap();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getCommonDetails();
    this.getApplicationDetails();

    this.isLoading = false;
  }
  getCommonDetails() {
    if (localStorage.getItem('commonFieldsInfo')) {
      this.ownerDetails = JSON.parse(localStorage.getItem('commonFieldsInfo'));
      this.isRepresentative = this.ownerDetails.is_representative;
    } else {
      this.newApplicationFormService.commonFieldsSubject
        .asObservable()
        .subscribe((commonFieldsSubject) => {
          this.ownerDetails = commonFieldsSubject;
          this.isRepresentative = this.ownerDetails.is_representative;
        });
    }
  }
  getApplicationDetails() {
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
          this.permitTypeId = this.applicationDetailsFromService.application_type;
        });
    }
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

  initializeMap() {
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
    this.projectDetailsForm.valueChanges.subscribe((data) => {
      this.projectFormChange = data;
    });
  }

  createprojectDetails() {
    const data = this.projectDetailsForm.value;
    this.projectDetails = {
      project_house_number: data.project_house_number,
      project_lot_number: data.project_lot_number,
      project_block_number: data.project_block_number,
      project_street_name: data.project_street,
      project_number_of_units: data.project_units ? data.project_units : 0,
      project_barangay: data.project_barangay,
      project_number_of_basement: data.project_basement
        ? data.project_basement
        : 0,
      project_lot_area: data.project_lot_area,
      project_total_floor_area: data.project_floor_area,
      project_units: data.project_unit_number ? data.project_unit_number : 0,
      project_number_of_storey: data.project_storeys ? data.project_storeys : 0,
      project_title: data.project_title,
      project_cost_cap: data.project_cost,
      project_tct_number: data.project_tct_number,
      project_tax_dec_number: data.project_td_number,
      project_landmark: data.project_landmark,
    };
  }

  onSubmit() {
    this.isLoading = true;
    this._submitted = true;

    this.createprojectDetails();

    const body = {
      user_id: this.user.id,
      permit_type_id: this.applicationDetailsFromService.application_type,
      is_representative: this.applicationDetailsFromService.is_representative,
      rol_status_id: this.applicationDetailsFromService.is_lot_owner,
      construction_status_id: this.applicationDetailsFromService
        .construction_status,
      is_registered_owner: this.applicationDetailsFromService.registered_owner,
      is_owned_by_corporation: this.applicationDetailsFromService
        .is_owned_by_corporation,
      is_property_have_coowners: this.applicationDetailsFromService
        .is_property_have_coowners,
      is_under_mortgage: this.applicationDetailsFromService.is_under_mortgage,
      is_within_subdivision: this.applicationDetailsFromService
        .is_within_subdivision,
      occupancy_classification_id: this.applicationDetailsFromService
        .occupancy_classification_id,
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
      ...this.projectDetails,
    };
    if (!this.projectDetailsForm.valid) {
      Swal.fire('Notice!', 'Please fill out all required fields!', 'info').then(
        (result) => {
          this.isLoading = false;
        }
      );
    } else {
      if (this.isRepresentative == '2') {
        this.newApplicationSerivce.submitApplication(body).subscribe((res) => {
          localStorage.setItem('app_id', res.data.id);
          Swal.fire(
            'Success!',
            'Application Details Submitted!',
            'success'
          ).then((result) => {
            this.isLoading = false;
            switch (this.permitTypeId) {
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
          });
        });
      } else {
        this.newApplicationFormService.setCommonFields(body);
        this._router.navigateByUrl('/dashboard/new/step-two/in-charge');
      }
    }
  }
}
