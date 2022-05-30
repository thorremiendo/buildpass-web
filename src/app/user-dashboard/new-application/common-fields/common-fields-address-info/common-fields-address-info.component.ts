import { AppTitleService } from './../../../../core/services/app-title.service';
import { OccupancyService } from './../../../../core/services/occupancy.service';
import { MapService } from './../../../../core/services/mapbox.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { RegisterAccountFormService } from 'src/app/core/services/register-account-form.service';
import { BarangayService } from 'src/app/core/services/barangay.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public applicationDetails;
  public isRepresentative;
  public projectFormChange;
  get projectDetailsFormControl() {
    return this.projectDetailsForm.controls;
  }
  _filteredBarangayOptions: Observable<Barangay[]>;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private newApplicationFormService: NewApplicationFormService,
    private newApplicationSerivce: NewApplicationService,
    private barangayService: BarangayService,
    private mapService: MapService,
    private snackBar: MatSnackBar,
    private occupancyService: OccupancyService,
    private appTitle: AppTitleService
  ) {
    this.barangayService.getBarangayInfo().subscribe((data) => {
      this.barangay = data;
      this._filteredBarangayOptions =
        this.projectDetailsFormControl.project_barangay.valueChanges.pipe(
          startWith(''),
          map((barangay) =>
            barangay ? this._filter(barangay) : this.barangay.slice()
          )
        );
    });
  }

  ngOnInit(): void {
    this.appTitle.setTitle('BuildPASS');
    this.createForm();
    // this.initializeMap();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.applicationDetails = JSON.parse(
      localStorage.getItem('commonFieldsInfo')
    );
    this.permitTypeId = this.applicationDetails.permit_type_id;
    this.mapService.buildMap();
    this.isLoading = false;
    if (
      window.localStorage.getItem('lng') &&
      window.localStorage.getItem('lat')
    ) {
      this.mapService.flyTo(
        parseFloat(window.localStorage.getItem('lng')),
        parseFloat(window.localStorage.getItem('lat'))
      );
    }
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
      project_subdivision: [''],
      project_purok: [''],
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
      no_of_attic: [''],
      no_of_roof_deck: [''],

      // inspector_name: ['', Validators.required],
      // inspector_profession: ['', Validators.required],
      // inspector_prc_no: ['', Validators.required],
    });
    this.projectDetailsForm
      .get('project_barangay')
      .valueChanges.subscribe((data) => {
        this.mapService.removeMarker();
        this.projectFormChange = data;
        console.log(this.projectDetailsForm.value.project_barangay);
        setTimeout(() => {
          this.mapService
            .fetchProjectLocation(
              this.projectDetailsForm.value.project_barangay
            )
            .subscribe((res) => console.log(res));
        }, 2000);
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
      project_subdivision: data.project_subdivision,
      no_of_attic: data.no_of_attic ? data.no_of_attic : 0,
      no_of_roof_deck: data.no_of_roof_deck ? data.no_of_roof_deck : 0,
      // inspector_name: data.inspector_name,
      // inspector_profession: data.inspector_profession,
      // inspector_prc_no: data.inspector_prc_no,
      project_long: this.mapService.lng,
      project_lat: this.mapService.lat,
    };
  }

  onSubmit() {
    this.isLoading = true;
    this._submitted = true;
    this.createprojectDetails();
    const info = JSON.parse(localStorage.getItem('newApplicationInfo'));
    const oldBpInputs = info.old_bp_inputs;

    const body = {
      ...this.applicationDetails,
      ...this.projectDetails,
    };
    if (!this.projectDetailsForm.valid) {
      Swal.fire('Notice!', 'Please fill out all required fields!', 'info').then(
        (result) => {
          this.isLoading = false;
        }
      );
    } else {
      this.newApplicationSerivce.submitApplication(body).subscribe((res) => {
        localStorage.setItem('app_id', res.data.id);
        oldBpInputs.forEach((input) => {
          const body = {
            user_id: res.data.user_id,
            old_permit_number: input.input,
          };
          this.occupancyService
            .associateOldBp(res.data.id, body)
            .subscribe((res) => {
              console.log('added');
            });
        });
        this.saveRoute(res.data.id);
      });
    }
  }
  saveRoute(id) {
    const body = {
      user_id: this.user.id,
      application_id: id,
      url: '/dashboard/new/building-permit',
    };
    this.newApplicationSerivce.saveAsDraft(body).subscribe((res) => {
      Swal.fire('Success!', 'Application Details Submitted!', 'success')
        .then((result) => {
          localStorage.removeItem('newApplicationInfo');
          localStorage.removeItem('commonFieldsInfo');
          localStorage.removeItem('lng');
          localStorage.removeItem('lat');

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
        })
        .catch((e) => {
          this.openSnackBar('An error occured. Please try again.');
          this._router.navigateByUrl('dashboard/new/step-one');
        });
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
