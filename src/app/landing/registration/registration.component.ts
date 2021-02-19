import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BarangayService } from '../../core/services/barangay.service';
import { RegisterAccountFormService } from '../../core/services/register-account-form.service';
import { AuthService } from '../../core/services/auth.service';
import { DataPrivacyComponent } from '../data-privacy/data-privacy.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public selectedFile: File = null;
  public selectedPhoto: File = null;
  public maxLength: number = 11;
  public isUpdating: boolean = false;
  private firebaseDetails;

  _registrationForm: FormGroup;
  _barangay: Barangay[];
  _filteredBarangayOptions: Observable<Barangay[]>;
  _displayPhoto: string | ArrayBuffer = '';
  _displayIdPhoto: string | ArrayBuffer = '';
  _submitted = false;

  get displayProfilePhoto(): string | ArrayBuffer {
    return this._displayPhoto ? this._displayPhoto : "https://baguio-visita.s3-ap-southeast-1.amazonaws.com/default-avatar.png";
  }

  get displayIDPhoto(): string | ArrayBuffer {
    return this._displayIdPhoto ? this._displayIdPhoto : '';
  }

  get registrationFormControl() {
    return this._registrationForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _barangayService: BarangayService,
    private _registerAccountFormService: RegisterAccountFormService,
    private _authService: AuthService,
    private _dialog: MatDialog,
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

  openFileChooser() {
    const element: HTMLElement = document.getElementById('photo') as HTMLElement;
    element.click();
  }

  openIdChooser() {
    const element: HTMLElement = document.getElementById('id-photo') as HTMLElement;
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

  filterBarangays(value: string): Barangay[] {
    return this._barangay.filter(option => option.name.toLowerCase().includes(value));
  }

  displayBarangayName(value: number) {
    if (value != null) {
      return this._barangay[value-1].name;
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
      this.firebaseDetails = registerAccountSubject;
      this._registrationForm.patchValue({
        first_name: this.firebaseDetails.first_name,
        last_name: this.firebaseDetails.last_name
      });
    });

    this._barangayService.getBarangayInfo().subscribe(data => {
      this._barangay = data;
      this._filteredBarangayOptions = this.registrationFormControl.barangay.valueChanges
      .pipe(
        startWith(''),
        map(barangay => barangay ? this.filterBarangays(barangay) : this._barangay.slice())
      );
    });
  }

  onSubmit() {
    this._submitted = true;

    if (this._registrationForm.valid && this.selectedFile && this.selectedPhoto) {
      const dialogRef = this._dialog.open(DataPrivacyComponent);
      dialogRef.afterClosed().subscribe(result => {
        this.isUpdating = true;
        
        const user = {
          first_name: this._registrationForm.value.first_name,
          middle_name: this._registrationForm.value.middle_name,
          last_name: this._registrationForm.value.last_name,
          suffix_name: this._registrationForm.value.suffix_name,
          birthdate: this.dateToString(this._registrationForm.value.birthdate),
          marital_status_id: this._registrationForm.value.marital_status,
          gender: this._registrationForm.value.gender,
          home_address: this._registrationForm.value.home_address,
          barangay: this._registrationForm.value.barangay,
          contact_number: this._registrationForm.value.contact_number,
          id_number: this._registrationForm.value.id_number,
          id_type: this._registrationForm.value.id_type,
          photo_path: this.selectedPhoto ? this.selectedPhoto : null,
          id_photo_path: this.selectedFile ? this.selectedFile : null,
          firebase_uid: this.firebaseDetails.firebase_uid,
          email_address: this.firebaseDetails.email_address,
          emailVerified: this.firebaseDetails.emailVerified,
          is_evaluator: this.firebaseDetails.is_evaluator,
        };

        this._registerAccountFormService.submitRegisterAccountInfo(user).subscribe((res) => {
          this._authService.SendVerificationMail();
        });
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