import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { RegisterAccountFormService } from 'src/app/core/services/register-account-form.service';
import { BarangayService } from 'src/app/core/services/barangay.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';

//map
import { environment } from '../../../../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { Map } from 'mapbox-gl/dist/mapbox-gl';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { Marker } from 'mapbox-gl/dist/mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { UserService } from 'src/app/core/services/user.service';

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
  public projectDetails;
  public ownerDetails;
  public applicationDetails;
  public user;
  public userDetails;
  public isLoading: boolean = true;
  public projectDetailsForm: FormGroup;
  _submitted = false;
  public barangay: Barangay[];

  get projectDetailsFormControl() {
    return this.projectDetailsForm.controls;
  }
  _filteredBarangayOptions: Observable<Barangay[]>;

  //map
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
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
    private authService: AuthService,
    private userService: UserService
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
    // this.authService.currentUser.subscribe((currentUser) => {
    //   this.user = currentUser;
    //   console.log(this.user)
    //   this.userService.fetchUserInfo(this.user.user.uid).subscribe((result) => {
    //     this.userDetails = result.data;
    //     console.log(this.userDetails);
    //   });
    // });
    this.userService.cast.subscribe(userSubject => this.user = userSubject)
    console.log(this.user)
    // this.authService.getFireBaseData(this.user.user.uid).subscribe(result =>{
    //   this.evaluatorDetails = result.data();
    //   console.log(this.evaluatorDetails)
    // })
    this._registerAccountFormService.cast.subscribe(
      (registerAccountSubject) => (this.projectDetails = registerAccountSubject)
    );
    this.newApplicationFormService.commonFieldsSubject
      .asObservable()
      .subscribe(
        (commonFieldsSubject) => (this.ownerDetails = commonFieldsSubject)
      );
    this.newApplicationFormService.newApplicationSubject
      .asObservable()
      .subscribe(
        (newApplicationSubject) =>
          (this.applicationDetails = newApplicationSubject)
      );
    this.createForm();

    this.projectDetailsForm.patchValue({
      project_lot_number: this.projectDetails.project_lot_number,
      project_block_number: this.projectDetails.project_block_number,
      project_unit_number: this.projectDetails.project_unit_number,
      project_street: this.projectDetails.project_street,
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
      project_basement: this.projectDetails.project_basement,
      project_house_number: this.projectDetails.project_house_number,
    });

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
      project_municipality: [''],
      project_lot_area: ['', Validators.required],
      project_floor_area: ['', Validators.required],
      project_units: ['', Validators.required],
      project_storeys: ['', Validators.required],
      project_title: ['', Validators.required],
      project_cost: ['', Validators.required],
      project_tct_number: ['', Validators.required],
      project_td_number: ['', Validators.required],
      project_basement: ['', Validators.required],
    });
  }

  createprojectDetails() {
    this.projectDetails = {
      project_lot_number: this.projectDetailsForm.value.project_lot_number,
      project_block_number: this.projectDetailsForm.value.project_block_number,
      project_street: this.projectDetailsForm.value.project_street,
      project_unit_number: this.projectDetailsForm.value.project_unit_number,
      project_barangay: this.projectDetailsForm.value.project_barangay,
      project_basement: this.projectDetailsForm.value.project_basement,
      project_municipality: 'Baguio City',
      project_lot_area: this.projectDetailsForm.value.project_lot_area,
      project_floor_area: this.projectDetailsForm.value.project_floor_area,
      project_units: this.projectDetailsForm.value.project_units,
      project_storeys: this.projectDetailsForm.value.project_storeys,
      project_title: this.projectDetailsForm.value.project_title,
      project_cost: this.projectDetailsForm.value.project_cost,
      project_tct_number: this.projectDetailsForm.value.project_tct_number,
      project_td_number: this.projectDetailsForm.value.project_td_number,
      project_house_number: this.projectDetailsForm.value.project_house_number,
    };
  }

  onSubmit() {
    this.isLoading = true;
    this._submitted = true;
    this.createprojectDetails();
    console.log(this.projectDetailsForm.value.project_barangay)
    const body = {
      user_id: this.user.id,
      permit_type_id: this.applicationDetails.application_type,
      is_representative: this.applicationDetails.is_representative,
      rol_status_id: this.applicationDetails.is_lot_owner,
      construction_status_id: this.applicationDetails.construction_status,
      is_registered_owner: this.applicationDetails.registered_owner,
      applicant_first_name: this.ownerDetails.owner_first_name,
      appicant_middle_name: this.ownerDetails.owner_middle_name,
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
      project_house_number: this.projectDetailsForm.value.project_house_number,
      project_lot_number: this.projectDetailsForm.value.project_lot_number,
      project_block_number: this.projectDetailsForm.value.project_block_number,
      project_street_name: this.projectDetailsForm.value.project_street,
      project_number_of_units: this.projectDetailsForm.value
        .project_units,
      project_barangay: this.projectDetailsForm.value.project_barangay,
      project_number_of_basement: this.projectDetailsForm.value
        .project_basement,
      project_lot_area: this.projectDetailsForm.value.project_lot_area,
      project_total_floor_area: this.projectDetailsForm.value
        .project_floor_area,
      project_units: this.projectDetailsForm.value.project_unit_number,
      project_number_of_storey: this.projectDetailsForm.value.project_storeys,
      project_title: this.projectDetailsForm.value.project_title,
      project_cost_cap: this.projectDetailsForm.value.project_cost,
      project_tct_number: this.projectDetailsForm.value.project_tct_number,
      project_tax_dec_number: this.projectDetailsForm.value.project_td_number,
    };
    this.newApplicationFormService.setCommonFields(body);
    if (this.ownerDetails.is_representative == '2') {
      this.newApplicationSerivce.submitApplication(body).subscribe((res) => {
        Swal.fire('Success!', 'Application Details Submitted!', 'success').then(
          (result) => {
            this.isLoading = false;
            this._router.navigateByUrl(
              '/dashboard/new/initial-forms/zoning-clearance'
            );
          }
        );
      });
    } else {
      this.newApplicationSerivce.submitApplication(body).subscribe((res) => {
        Swal.fire('Success!', 'Application Details Submitted!', 'success').then(
          (result) => {
            this.isLoading = false;
            this._router.navigateByUrl(
              '/dashboard/new/step-two/representative'
            );
          }
        );
      });
    }
  }
}
