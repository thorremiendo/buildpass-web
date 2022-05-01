import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  AdminUserService,
  UserService,
  BarangayService,
  Position,
  Office,
  NewApplicationService,
  SnackBarService
} from '../../../core';

@Component({
  selector: 'app-admin-employee-view',
  templateUrl: './admin-employee-view.component.html',
  styleUrls: ['./admin-employee-view.component.scss'],
})
export class AdminEmployeeViewComponent implements OnInit {
  public selectedFile: File = null;
  public selectedPhoto: File = null;
  public selectedSelfie: File = null;
  public maxLength: number = 11;
  public isUpdating: boolean = false;
  public userInfo;

  public regions = [];
  public cities = [];
  public provinces = [];
  public selectedRegion;
  public selectedProvince;
  public selectedCity;

  _adminUpdateUserForm: FormGroup;
  public barangay: Barangay[];
  _office: string[] = Object.keys(Office)
    .map((key) => Office[key])
    .filter((k) => !(parseInt(k) >= 0));
  _position: string[] = Object.keys(Position)
    .map((key) => Position[key])
    .filter((k) => !(parseInt(k) >= 0));
  _filteredBarangayOptions: Observable<Barangay[]>;
  _filteredOfficeOptions: Observable<string[]>;
  _filteredPositionOptions: Observable<string[]>;
  _displayPhoto: string | ArrayBuffer = '';
  _displayIdPhoto: string | ArrayBuffer = '';
  _displaySelfiePhoto: string | ArrayBuffer = '';
  _submitted = false;

  get displayProfilePhoto(): string | ArrayBuffer {
    return this._displayPhoto ? this._displayPhoto : this.userInfo.photo_path;
  }

  get displayIDPhoto(): string | ArrayBuffer {
    return this._displayIdPhoto
      ? this._displayIdPhoto
      : this.userInfo.id_photo_path;
  }

  get displaySelfiePhoto(): string | ArrayBuffer {
    return this._displaySelfiePhoto ? this._displaySelfiePhoto : this.userInfo.selfie_with_id_path;
  }

  get adminUpdateUserFormControl() {
    return this._adminUpdateUserForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _barangayService: BarangayService,
    private _adminUserService: AdminUserService,
    private _place: NewApplicationService,
    private _snackbarService:SnackBarService,
    public dialogRef: MatDialogRef<AdminEmployeeViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  closeModal() {
    this.dialogRef.close();
  }

  createForm() {
    this._adminUpdateUserForm = this._fb.group({
      first_name: [],
      middle_name: [],
      last_name: [],
      suffix_name: [],
      birthdate: [],
      marital_status: [],
      gender: [],
      home_address: [],
      barangay: [],
      employee_no: [],
      office: [],
      position: [],
      contact_number: [Validators.maxLength(11)],
      id_number: [],
      id_type: [],
      email_address:[]
    });

    this.patchValue();
  }

  patchValue() {
    this._adminUpdateUserForm.patchValue({
      first_name: this.userInfo.first_name,
      middle_name: this.userInfo.middle_name,
      last_name: this.userInfo.last_name,
      suffix_name: this.userInfo.suffix_name,
      birthdate: this.userInfo.birthdate,
      marital_status: this.userInfo.marital_status_id,
      gender: this.userInfo.gender,
      home_address: this.userInfo.home_address,
      barangay: this.userInfo.barangay,
      contact_number: this.userInfo.contact_number,
      id_number: this.userInfo.id_number,
      id_type: this.userInfo.id_type,
      email_address: this.userInfo.email_address
    });

    if (this.userInfo.employee_detail) {
      this._adminUpdateUserForm.patchValue({
        employee_no: this.userInfo.employee_detail.employee_no,
        office: this.userInfo.employee_detail.office_id,
        position: this.userInfo.employee_detail.position,
      });
    }

    this.selectedPhoto = this.userInfo.photo_path;
    this.selectedSelfie = this.userInfo.selfie_with_id_path;
    this.selectedFile = this.userInfo.id_photo_path;
  }

  onRegionSelect(e) {
    this._place
      .fetchProvince('', parseInt(e.value))
      .subscribe((res) => {
        this.provinces = res.data;
      });
  }
  onProvinceSelect(e) {
    this._place
      .fetchCities(parseInt(e.value))
      .subscribe((res) => {
        this.cities = res.data;
      });
  }
  
  onCitySelect(e) {
    console.log(this.selectedCity);
    if(this.selectedCity == 1591 && this.barangay == null){
      this._barangayService.getBarangayInfo().subscribe(data => {
        this.barangay = data;
      });
    }
      this._adminUpdateUserForm.patchValue({
        barangay: ''
      })
  }


  openFileChooser() {
    const element: HTMLElement = document.getElementById(
      'photo'
    ) as HTMLElement;
    element.click();
  }

  openIdChooser() {
    const element: HTMLElement = document.getElementById(
      'id-photo'
    ) as HTMLElement;
    element.click();
  }

  openSelfieChooser() {
    const element: HTMLElement = document.getElementById('selfie-photo') as HTMLElement;
    element.click();
  }

  handlePhotoFileChange($event) {
    this.selectedPhoto = $event.target.files[0];
    this.readSelectedPhotoInfo();
  }

  handleIDFileChange($event) {
    this.selectedFile = $event.target.files[0];
    this.readSelectedIdInfo();
  }

  handleSelfieFileChange($event) {
    this.selectedSelfie = $event.target.files[0];
    this.readSelectedSelfieInfo();
  }

  readSelectedPhotoInfo() {
    if (this.selectedPhoto) {
      let reader = new FileReader();
      reader.onload = (res) => {
        this._displayPhoto = reader.result;
      };
      reader.readAsDataURL(this.selectedPhoto);
    }
  }

  readSelectedIdInfo() {
    if (this.selectedFile) {
      let reader = new FileReader();
      reader.onload = (res) => {
        this._displayIdPhoto = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  readSelectedSelfieInfo() {
    if (this.selectedSelfie) {
      let reader = new FileReader();
      reader.onload = (res) => {
        this._displaySelfiePhoto = reader.result;
      };
      reader.readAsDataURL(this.selectedSelfie);
    }
  }

  filterOffice(value: string): string[] {
    return this._office.filter((option) =>
      option.toLowerCase().includes(value)
    );
  }

  filterPosition(value: string): string[] {
    return this._position.filter((option) =>
      option.toLowerCase().includes(value)
    );
  }

  displayOfficeName(value: number) {
    if (value != null) {
      return this._office[value];
    }
  }

  dateToString(dateObject) {
    if (dateObject != null) {
      const birthdate = new Date(dateObject);
      let dd = birthdate.getDate();
      let mm = birthdate.getMonth() + 1;
      let yyyy = birthdate.getFullYear();
      return `${yyyy}-${mm}-${dd}`;
    }
  }

  checkBarangay(){
    if(this.selectedCity == 1591 ){
      if(this._adminUpdateUserForm.value.barangay.name){
        return this._adminUpdateUserForm.value.barangay.name;
      }
    }

    else return this._adminUpdateUserForm.value.barangay;
  }


  approveUser() {
    this.isUpdating = true;
    this._adminUserService
      .approveEmployee(this.userInfo.id)
      .subscribe((result) => {
        this.isUpdating = false;
      });
  }

  ngOnInit(): void {
    this.userInfo = this.data.data;
    console.log(this.userInfo);
    if (this.userInfo) {
      this.userInfo.marital_status_id = String(this.userInfo.marital_status_id);

      this.createForm();

      this._place.fetchRegions('').subscribe((res) => {
        this.regions = res.data;
      });

      this._filteredOfficeOptions =
        this.adminUpdateUserFormControl.office.valueChanges.pipe(
          startWith(''),
          map((value) => this.filterOffice(value))
        );

      this._filteredPositionOptions =
        this.adminUpdateUserFormControl.position.valueChanges.pipe(
          startWith(''),
          map((value) => this.filterPosition(value))
        );
    }
  }

  onSubmit() {
    let barangay_id;
    this._submitted = true;

    if (this._adminUpdateUserForm.valid) {
      this.isUpdating = true;

      // if(!this._adminUpdateUserForm.value.barangay.id){
      //   barangay_id = 0  
      // }

      // else{
      //   barangay_id = this._adminUpdateUserForm.value.barangay.id
      // }

      const user = {
        first_name: this._adminUpdateUserForm.value.first_name,
        middle_name: this._adminUpdateUserForm.value.middle_name,
        last_name: this._adminUpdateUserForm.value.last_name,
        suffix_name: this._adminUpdateUserForm.value.suffix_name,
        birthdate: this.dateToString(this._adminUpdateUserForm.value.birthdate),
        marital_status_id: this._adminUpdateUserForm.value.marital_status,
        gender: this._adminUpdateUserForm.value.gender,
        home_address: this._adminUpdateUserForm.value.home_address,
        barangay: this.checkBarangay(),
        barangay_id: this._adminUpdateUserForm.value.barangay?.id ? this._adminUpdateUserForm.value.barangay?.id : 0,
        employee_no: this._adminUpdateUserForm.value.employee_no,
        office_id: this._adminUpdateUserForm.value.office,
        position: this._adminUpdateUserForm.value.position,
        contact_number: this._adminUpdateUserForm.value.contact_number,
        id_number: this._adminUpdateUserForm.value.id_number,
        id_type: this._adminUpdateUserForm.value.id_type,
        photo_path: this.selectedPhoto ? this.selectedPhoto : null,
        id_photo_path: this.selectedFile ? this.selectedFile : null,
        selfie_with_id_path: this.selectedSelfie ? this.selectedSelfie : null,
        email_address: this._adminUpdateUserForm.value.email_address,
      };

      // console.log(user, this.userInfo.id)
      // console.log(this._adminUpdateUserForm.value.barangay)

      this._userService
        .updateUserInfo(user, this.userInfo.id)
        .subscribe((result) => {
          this.isUpdating = false;
        },
        (error)=>{
          const errorMessage = error.error.message;
          console.log(errorMessage, error)
          this._snackbarService.open(errorMessage,"close",3000)
        });
    }
    
  }
}

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
