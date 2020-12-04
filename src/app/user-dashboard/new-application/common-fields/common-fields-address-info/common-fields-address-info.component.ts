import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { RegisterAccountFormService } from 'src/app/core/services/register-account-form.service';

//map
import { environment } from '../../../../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { Map } from 'mapbox-gl/dist/mapbox-gl';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { Marker } from 'mapbox-gl/dist/mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-common-fields-address-info',
  templateUrl: './common-fields-address-info.component.html',
  styleUrls: ['./common-fields-address-info.component.scss'],
})
export class CommonFieldsAddressInfoComponent implements OnInit {
  public projectDetails;
  public ownerDetails;

  public projectDetailsForm: FormGroup;
  _submitted = false;

  get projectDetailsFormControl() {
    return this.projectDetailsForm.controls;
  }
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
        (commonFieldsSubject) => (this.ownerDetails = commonFieldsSubject)
      );
    this.createForm();

    this.projectDetailsForm.patchValue({
      project_lot_number: this.projectDetails.project_lot_number,
      project_block_number: this.projectDetails.project_block_number,
      project_unit_number: this.projectDetails.project_unit_number,
      project_floor_number: this.projectDetails.project_floor_number,
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
        draggable: true
      }
      })
      );
    this.marker.on('dragend', this.onDragEnd);
  }
  onDragEnd() {
    console.log("marker dragged")
  }

  createForm() {
    this.projectDetailsForm = this._fb.group({
      project_lot_number: ['', Validators.required],
      project_block_number: ['', Validators.required],
      project_floor_number: [''],
      owner_tin_number: ['', Validators.required],
      project_street: ['', Validators.required],
      project_unit_number: ['', Validators.required],
      project_barangay: ['', Validators.required],
      project_municipality: ['', Validators.required],
      project_lot_area: ['', Validators.required],
      project_floor_area: ['', Validators.required],
      project_units: ['', Validators.required],
      project_storeys: ['', Validators.required],
      project_title: ['', Validators.required],
      project_cost: ['', Validators.required],
      project_tct_number: ['', Validators.required],
      project_td_number: ['', Validators.required],
    });
  }

  createprojectDetails() {
    this.projectDetails = {
      project_lot_number: this.projectDetailsForm.value.project_lot_number,
      project_block_number: this.projectDetailsForm.value.project_block_number,
      project_floor_number: this.projectDetailsForm.value.project_floor_number,
      project_street: this.projectDetailsForm.value.project_street,
      project_unit_number: this.projectDetailsForm.value.project_unit_number,
      project_barangay: this.projectDetailsForm.value.project_barangay,
      project_municipality: this.projectDetailsForm.value.project_municipality,
      project_lot_area: this.projectDetailsForm.value.project_lot_area,
      project_floor_area: this.projectDetailsForm.value.project_floor_area,
      project_units: this.projectDetailsForm.value.project_units,
      project_storeys: this.projectDetailsForm.value.project_storeys,
      project_title: this.projectDetailsForm.value.project_title,
      project_cost: this.projectDetailsForm.value.project_cost,
      project_tct_number: this.projectDetailsForm.value.project_tct_number,
      project_td_number: this.projectDetailsForm.value.project_td_number,
      owner_first_name: this.ownerDetails.owner_first_name,
      owner_last_name: this.ownerDetails.owner_last_name,
      owner_suffix: this.ownerDetails.owner_suffix,
      owner_tin_number: this.ownerDetails.owner_tin_number,
      owner_contact_number: this.ownerDetails.owner_contact_number,
      owner_email_address: this.ownerDetails.owner_email_address,
      owner_house_number: this.ownerDetails.owner_house_number,
      owner_unit_number: this.ownerDetails.owner_unit_number,
      owner_floor_number: this.ownerDetails.owner_floor_number,
      owner_street: this.ownerDetails.owner_street,
      owner_barangay: this.ownerDetails.owner_barangay,
      owner_province: 'Benguet',
      owner_municipality: 'Baguio City',
      owner_zip_code: '2600',
      blank: this.ownerDetails.blank,
      is_representative: this.ownerDetails.is_representative
    };
  }

  onSubmit() {
    this._submitted = true;

    this.createprojectDetails();

    this._commonFieldsFormService.setCommonFields(this.projectDetails);
    console.log(this.projectDetails);
    debugger
    if (this.ownerDetails.is_representative == 'No') {
      this._router.navigateByUrl(
        '/dashboard/new/initial-forms/zoning-clearance'
      );
    } else {
      this._router.navigateByUrl('/dashboard/new/step-two/representative');
    }
  }
}
