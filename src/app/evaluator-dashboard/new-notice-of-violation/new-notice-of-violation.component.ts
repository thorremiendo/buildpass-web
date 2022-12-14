import { Router } from '@angular/router';
import { PopOutNotificationsService } from './../../core/services/pop-out-notification.service';
import { NoticeOfViolationService } from './../../core/services/notice-of-violation.service';
import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/core/services/mapbox.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { Observable } from 'rxjs';
import { BarangayService } from 'src/app/core/services/barangay.service';

@Component({
  selector: 'app-new-notice-of-violation',
  templateUrl: './new-notice-of-violation.component.html',
  styleUrls: ['./new-notice-of-violation.component.scss'],
})
export class NewNoticeOfViolationComponent implements OnInit {
  public isLoading: boolean = false;

  userInfo;
  public barangay = [];
  public regions = [];
  public cities = [];
  public provinces = [];
  public complainantRegions = [];
  public complainantCities = [];
  public complainantProvinces = [];
  public selectedRegion;
  public selectedProvince;
  public selectedCity;
  complainantSelectedRegion;
  complainantSelectedProvince;
  complainantSelectedCity;
  public regionName;
  public provinceName;
  public cityName = null;
  _filteredBarangayOptions: Observable<[]>;
  get formControls() {
    return this.form.controls;
  }
  form: FormGroup;
  constructor(
    private mapService: MapService,
    private fb: FormBuilder,
    private newApplicationService: NewApplicationService,
    private novService: NoticeOfViolationService,
    private notif: PopOutNotificationsService,
    private router: Router
  ) {
    this.form = this.fb.group({
      respondent_first_name: ['', Validators.required],
      respondent_middle_name: ['', Validators.required],
      respondent_lastname_name: ['', Validators.required],
      respondent_house_number: ['', Validators.required],
      respondent_lot_number: ['', Validators.required],
      respondent_unit_number: ['', Validators.required],
      respondent_floor_number: ['', Validators.required],
      respondent_purok: ['', Validators.required],
      respondent_street: ['', Validators.required],
      respondent_subdivision: ['', Validators.required],
      respondent_region_id: ['', Validators.required],
      respondent_province_id: ['', Validators.required],
      respondent_city_id: ['', Validators.required],
      complainant_first_name: ['', Validators.required],
      complainant_middle_name: ['', Validators.required],
      complainant_lastname_name: ['', Validators.required],
      complainant_house_number: ['', Validators.required],
      complainant_lot_number: ['', Validators.required],
      complainant_unit_number: ['', Validators.required],
      complainant_floor_number: ['', Validators.required],
      complainant_purok: ['', Validators.required],
      complainant_street: ['', Validators.required],
      complainant_subdivision: ['', Validators.required],
      complainant_region_id: ['', Validators.required],
      complainant_province_id: ['', Validators.required],
      complainant_city_id: ['', Validators.required],
      structure_house_number: ['', Validators.required],
      structure_lot_number: ['', Validators.required],
      structure_unit_number: ['', Validators.required],
      structure_purok: ['', Validators.required],
      structure_street: ['', Validators.required],
      structure_subdivision: ['', Validators.required],
      structure_long: ['', Validators.required],
      structure_lat: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.mapService.buildMap();
    this.newApplicationService.fetchRegions('').subscribe((res) => {
      this.regions = res.data;
      this.complainantRegions = res.data;
      console.log(this.regions);
    });
  }

  onRegionSelect(e, type: string) {
    if (type == 'respondent') {
      this.newApplicationService
        .fetchProvince('', parseInt(e.value))
        .subscribe((res) => {
          this.provinces = res.data;
        });
    } else {
      this.newApplicationService
        .fetchProvince('', parseInt(e.value))
        .subscribe((res) => {
          this.complainantProvinces = res.data;
        });
    }
  }
  onProvinceSelect(e, type: string) {
    if (type == 'respondent') {
      this.newApplicationService
        .fetchCities(parseInt(e.value))
        .subscribe((res) => {
          this.cities = res.data;
        });
    } else {
      this.newApplicationService
        .fetchCities(parseInt(e.value))
        .subscribe((res) => {
          this.complainantCities = res.data;
        });
    }
  }
  onCitySelect(e, type: string) {
    this.getNames();
    console.log(this.selectedCity);
  }

  getNames() {
    this.regionName = this.regions.filter((e) => e.id == this.selectedRegion);
    this.provinceName = this.provinces.filter(
      (e) => e.id == this.selectedProvince
    );
    this.cityName = this.cities.filter((e) => e.id == this.selectedCity);
    console.log('ADDRESS');
    console.log(this.regionName, this.provinceName, this.cityName);
  }

  submitNov() {
    this.isLoading = true;
    let form = this.form.value;
    const body = {
      user_id: this.userInfo.id,
      respondent_first_name: form.respondent_first_name,
      respondent_middle_name: form.respondent_middle_name,
      respondent_lastname_name: form.respondent_lastname_name,
      respondent_house_number: form.respondent_house_number,
      respondent_lot_number: form.respondent_lot_number,
      respondent_unit_number: form.respondent_unit_number,
      respondent_floor_number: form.respondent_floor_number,
      respondent_purok: form.respondent_purok,
      respondent_street: form.respondent_street,
      respondent_subdivision: form.respondent_subdivision,
      respondent_region_id: this.selectedRegion,
      respondent_province_id: this.selectedProvince,
      respondent_city_id: this.selectedCity,
      complainant_first_name: form.complainant_first_name,
      complainant_middle_name: form.complainant_middle_name,
      complainant_lastname_name: form.complainant_lastname_name,
      complainant_house_number: form.complainant_house_number,
      complainant_lot_number: form.complainant_lot_number,
      complainant_unit_number: form.complainant_unit_number,
      complainant_floor_number: form.complainant_floor_number,
      complainant_purok: form.complainant_purok,
      complainant_street: form.complainant_street,
      complainant_subdivision: form.complainant_subdivision,
      complainant_region_id: this.complainantSelectedRegion,
      complainant_province_id: this.complainantSelectedProvince,
      complainant_city_id: this.complainantSelectedCity,
      structure_house_number: form.structure_house_number,
      structure_lot_number: form.structure_lot_number,
      structure_unit_number: form.structure_unit_number,
      structure_purok: form.structure_purok,
      structure_street: form.structure_street,
      structure_subdivision: form.structure_subdivision,
      structure_long: form.structure_long,
      structure_lat: form.structure_lat,
    };

    this.novService.addNov(body).subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
        this.notif.openSnackBar('Success!');
        this.router.navigate(['/evaluator/nov/new/details', res.data.id]);
      },
      (err) => {
        this.isLoading = false;
        this.notif.openSnackBar('An error occured! Please try again.');
      }
    );
  }
}
