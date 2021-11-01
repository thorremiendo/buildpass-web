import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { BarangayService } from '../../core/services/barangay.service';
import { RegisterAccountFormService, NewApplicationService } from '../../core/services';
import { AuthService } from '../../core/services/auth.service';
import { DataPrivacyComponent } from '../data-privacy/data-privacy.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public user;
  public selectedFile: File = null;
  public selectedPhoto: File = null;
  public selectedSelfie: File = null;
  public maxLength: number = 11;
  public isUpdating: boolean = false;
  private registrationDetails;
  public regions = [];
  public cities = [];
  public provinces = [];
  public selectedRegion;
  public selectedProvince;
  public selectedCity;

  _registrationForm: FormGroup;
  public barangay: Barangay[];
  _filteredBarangayOptions: Observable<Barangay[]>;
  _displayPhoto: string | ArrayBuffer = '';
  _displayIdPhoto: string | ArrayBuffer = '';
  _displaySelfiePhoto: string | ArrayBuffer = '';
  _submitted = false;

  get displayProfilePhoto(): string | ArrayBuffer {
    return this._displayPhoto ? this._displayPhoto : '';
  }

  get displayIDPhoto(): string | ArrayBuffer {
    return this._displayIdPhoto ? this._displayIdPhoto : '';
  }

  get displaySelfiePhoto(): string | ArrayBuffer {
    return this._displaySelfiePhoto ? this._displaySelfiePhoto : '';
  }

  get registrationFormControl() {
    return this._registrationForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _barangayService: BarangayService,
    private _registerAccountFormService: RegisterAccountFormService,
    private _place: NewApplicationService,
    private _authService: AuthService,
    private _dialog: MatDialog,
    private _router: Router,
    private _snackbar: MatSnackBar,
  ) {
    this._registrationForm = this._fb.group({
      first_name:['', Validators.required],
      middle_name:[''],
      last_name:['', Validators.required],
      suffix_name:[''],
      birthdate:['', Validators.required],
      marital_status:['', Validators.required],
      gender:['', Validators.required],
      home_address:['', Validators.required],
      barangay:['', Validators.required],
      contact_number:['', [Validators.required, Validators.maxLength(11),]],
      id_number:['', Validators.required],
      id_type:['', Validators.required],
    });
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
      this._registrationForm.patchValue({
        barangay: ''
      })
  }

  openFileChooser() {
    const element: HTMLElement = document.getElementById('photo') as HTMLElement;
    element.click();
  }

  openIdChooser() {
    const element: HTMLElement = document.getElementById('id-photo') as HTMLElement;
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

  dateToString(dateObject){
    if(dateObject != null){
      const birthdate = new Date(dateObject);
      let dd = birthdate.getDate();
      let mm = birthdate.getMonth() + 1;
      let yyyy = birthdate.getFullYear();
      return `${yyyy}-${mm}-${dd}`;
    }
  }
  
  ngOnInit(): void {
    this._registerAccountFormService.cast.subscribe(registerAccountSubject => {
      if (Object.keys(registerAccountSubject).length > 0) {
        this.registrationDetails = registerAccountSubject;
        this._registrationForm.patchValue({
          first_name: this.registrationDetails.first_name,
          last_name: this.registrationDetails.last_name
        });
      } else {
        this._router.navigateByUrl('/user/sign-up');
      }

      this._place.fetchRegions('').subscribe((res) => {
        this.regions = res.data;
      });
    });
  }

  checkBarangay(){
    if(this.selectedCity == 1591 ){
      if(this._registrationForm.value.barangay.name){
        return this._registrationForm.value.barangay.name;
      }
    }

    else return this._registrationForm.value.barangay;
  }

  onSubmit() {
    this._submitted = true;
    // console.log(this._registrationForm.value);
    // console.log(this.checkBarangay());

    if (this._registrationForm.valid && this.selectedFile && this.selectedPhoto && this.selectedSelfie) {
      const dialogRef = this._dialog.open(DataPrivacyComponent);
      dialogRef.afterClosed().subscribe(dataPrivacyFlag => {
        if (dataPrivacyFlag) {
          this.isUpdating = true;

          if (this.registrationDetails.provider == 'google') {
            const user = {
              first_name: this._registrationForm.value.first_name,
              middle_name: this._registrationForm.value.middle_name,
              last_name: this._registrationForm.value.last_name,
              suffix_name: this._registrationForm.value.suffix_name,
              birthdate: this.dateToString(this._registrationForm.value.birthdate),
              marital_status_id: this._registrationForm.value.marital_status,
              gender: this._registrationForm.value.gender,
              home_address: this._registrationForm.value.home_address,
              barangay: this.checkBarangay(),
              barangay_id: this._registrationForm.value.barangay.id ? this._registrationForm.value.barangay.id : 0,
              city_id: this.selectedCity, 
              province_id: this.selectedProvince, 
              region_id:this.selectedRegion,
              contact_number: this._registrationForm.value.contact_number,
              id_number: this._registrationForm.value.id_number,
              id_type: this._registrationForm.value.id_type,
              photo_path: this.selectedPhoto ? this.selectedPhoto : null,
              id_photo_path: this.selectedFile ? this.selectedFile : null,
              selfie_with_id_path: this.selectedSelfie ? this.selectedSelfie : null,
              firebase_uid: this.registrationDetails.firebase_uid,
              email_address: this.registrationDetails.email,
              emailVerified: this.registrationDetails.emailVerified,
              is_evaluator: false,
            };

            this._registerAccountFormService.submitRegisterAccountInfo(user).subscribe((res) => {
              this._authService.SendVerificationMail();
            });
          } else {
            this._authService
            .SignUp(this.registrationDetails)
            .then(result => {
              const user = {
                first_name: this._registrationForm.value.first_name,
                middle_name: this._registrationForm.value.middle_name,
                last_name: this._registrationForm.value.last_name,
                suffix_name: this._registrationForm.value.suffix_name,
                birthdate: this.dateToString(this._registrationForm.value.birthdate),
                marital_status_id: this._registrationForm.value.marital_status,
                gender: this._registrationForm.value.gender,
                home_address: this._registrationForm.value.home_address,
                barangay: this.checkBarangay(),
                barangay_id: this._registrationForm.value.barangay.id ? this._registrationForm.value.barangay.id : 0,
                city_id: this.selectedCity, 
                province_id: this.selectedProvince, 
                region_id:this.selectedRegion,
                contact_number: this._registrationForm.value.contact_number,
                id_number: this._registrationForm.value.id_number,
                id_type: this._registrationForm.value.id_type,
                photo_path: this.selectedPhoto ? this.selectedPhoto : null,
                id_photo_path: this.selectedFile ? this.selectedFile : null,
                selfie_with_id_path: this.selectedSelfie ? this.selectedSelfie : null,
                firebase_uid: result.user.uid,
                email_address: result.user.email,
                emailVerified: result.user.emailVerified,
                is_evaluator: false,
              };

              this._registerAccountFormService.submitRegisterAccountInfo(user).subscribe((res) => {
                this._authService.SendVerificationMail();
              });
            });
          }
        }
      });
    } else {
      setTimeout(function() {
        const noFile = document.querySelectorAll('.no-file');
        const invalidInput = document.querySelectorAll('.mat-form-field-invalid');
        if (noFile.length) {
          noFile[0].scrollIntoView();
        } else if (invalidInput.length) {
          invalidInput[0].scrollIntoView();
        }
      }, 50);
      this._snackbar.open('Please fill all required fields.', 'close', {
        duration: 3000,
      });
    }
  }
}

export interface Barangay {
  id: number
  b_id: number,
  name:string,
  locality_id: number;
  province_id: number; 
  zip_code: number;
  region_id: number;
  country_id: number; 
  created_at: string,
  updated_at: string;
}