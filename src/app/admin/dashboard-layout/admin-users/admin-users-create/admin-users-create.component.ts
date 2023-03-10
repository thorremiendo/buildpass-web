import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BarangayService } from '../../../../core/services/barangay.service';
import { Position, Office } from '../../../../core/enums/department.enum';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { RegisterAccountEvaluatorFormService } from '../../../../core/services/register-account-evaluator-form.service';

@Component({
  selector: 'app-admin-users-create',
  templateUrl: './admin-users-create.component.html',
  styleUrls: ['./admin-users-create.component.scss']
})
export class AdminUsersCreateComponent implements OnInit {
  public selectedFile: File = null;
  public selectedPhoto: File = null;
  public maxLength: number = 11;

  _adminCreateUserForm: FormGroup;
  _barangay: Barangay[];
  _office:string[] = Object.keys(Office).map(key => Office[key]).filter(k => !(parseInt(k) >= 0));
  _position:string[] = Object.keys(Position).map(key => Position[key]).filter(k => !(parseInt(k) >= 0));
  _filteredBarangayOptions: Observable<Barangay[]>;
  _filteredOfficeOptions: Observable<string[]>;
  _filteredPositionOptions: Observable<string[]>;
  _displayPhoto: string | ArrayBuffer = '';
  _displayIdPhoto: string | ArrayBuffer = '';
  _submitted = false;

  get displayProfilePhoto(): string | ArrayBuffer {
    return this._displayPhoto ? this._displayPhoto : "https://baguio-visita.s3-ap-southeast-1.amazonaws.com/default-avatar.png";
  }

  get displayIDPhoto(): string | ArrayBuffer {
    return this._displayIdPhoto ? this._displayIdPhoto : "https://baguio-visita.s3-ap-southeast-1.amazonaws.com/default-avatar.png";
  }

  get adminCreateUserFormControl() {
    return this._adminCreateUserForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _barangayService: BarangayService,
    private _authService: AuthService,
    private _registerAccountEvaluatorFormService: RegisterAccountEvaluatorFormService,
    public dialogRef: MatDialogRef<AdminUsersCreateComponent>,
  ) {}

  closeModal() {
    this.dialogRef.close();
  }

  createForm() {
    this._adminCreateUserForm = this._fb.group({
      first_name:['', Validators.required],
      middle_name:[''],
      last_name:['', Validators.required],
      suffix_name:[''],
      birthdate:['', Validators.required],
      marital_status:['', Validators.required],
      gender:['', Validators.required],
      home_address: ['', Validators.required],
      barangay: ['', Validators.required],
      employee_no:['', Validators.required],
      office:['', Validators.required],
      position:['', Validators.required],
      contact_number:['', [Validators.required, Validators.maxLength(11),]],
      id_number:['', Validators.required],
      id_type:['', Validators.required],
      email:['', Validators.required],
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

  filterOffice(value: string): string[] {
    return this._office.filter(option=> option.toLowerCase().includes(value));
  }

  filterPosition(value: string): string[] {
    return this._position.filter(option=> option.toLowerCase().includes(value));
  }

  displayBarangayName(value: number) {
    if (value) {
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
    this.createForm();

    this._barangayService.getBarangayInfo().subscribe(data => {
      this._barangay = data;
      this._filteredBarangayOptions = this.adminCreateUserFormControl.barangay.valueChanges
      .pipe(
        startWith(''),
        map(barangay => barangay ? this.filterBarangays(barangay) : this._barangay.slice())
      );
    });

    this._filteredOfficeOptions = this.adminCreateUserFormControl.office.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOffice(value))
    );
    
    this._filteredPositionOptions = this.adminCreateUserFormControl.position.valueChanges.pipe(
      startWith(''),
      map(value => this.filterPosition(value))
    );    
  }

  onSubmit() {
    this._submitted = true;

    const firebaseUser = {
      first_name: this._adminCreateUserForm.value.first_name,
      middle_name: this._adminCreateUserForm.value.middle_name,
      email: this._adminCreateUserForm.value.email,
      password: 'Password99!@#',
      confirmPassword: 'Password99!@#'
    }

    const user = {
      first_name: this._adminCreateUserForm.value.first_name,
      middle_name: this._adminCreateUserForm.value.middle_name,
      last_name: this._adminCreateUserForm.value.last_name,
      suffix_name: this._adminCreateUserForm.value.suffix_name,
      birthdate: this.dateToString(this._adminCreateUserForm.value.birthdate),
      marital_status_id: this._adminCreateUserForm.value.marital_status,
      gender: this._adminCreateUserForm.value.gender,
      home_address: this._adminCreateUserForm.value.home_address,
      barangay_id: this._adminCreateUserForm.value.barangay,
      employee_no: this._adminCreateUserForm.value.employee_no,
      office_id: this._adminCreateUserForm.value.office,
      position: this._adminCreateUserForm.value.position, 
      contact_number: this._adminCreateUserForm.value.contact_number,
      id_number: this._adminCreateUserForm.value.id_number,
      id_type: this._adminCreateUserForm.value.id_type,
      photo_path: this.selectedPhoto,
      id_photo_path: this.selectedFile,
      firebase_uid: '',
      emailVerified: '',
      is_evaluator: true
    };

    this._authService.SignUp(firebaseUser)
      .then(result => {
        user.firebase_uid = result.user.uid;
        user.emailVerified = result.user.emailVerified;

        console.log('FIREBASE CREATED');
        console.log(user);

        this._registerAccountEvaluatorFormService.submitRegisterAccountInfo(user).subscribe((res) => {
          console.log('USER CREATED');
        });
      });
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
