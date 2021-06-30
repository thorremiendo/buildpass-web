import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../../core/services/user.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BarangayService } from '../../core/services/barangay.service';
import { Position, Office } from '../../core/enums/department.enum';
import { UpdatePasswordDialogComponent } from '../../shared/update-password-dialog/update-password-dialog.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EvaluatorService } from 'src/app/core';

@Component({
  selector: 'app-evaluator-edit-profile',
  templateUrl: './evaluator-edit-profile.component.html',
  styleUrls: ['./evaluator-edit-profile.component.scss']
})
export class EvaluatorEditProfileComponent implements OnInit {
  public selectedFile: File = null;
  public selectedPhoto: File = null;
  public maxLength: number = 11;
  public isUpdating: boolean = false;
  public userInfo;

  _evaluatorEditProfileForm: FormGroup;
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
    return this._displayPhoto ? this._displayPhoto : this.userInfo.photo_path;
  }

  get displayIDPhoto(): string | ArrayBuffer {
    return this._displayIdPhoto ? this._displayIdPhoto : this.userInfo.id_photo_path;
  }

  get evaluatorEditProfileFormControl() {
    return this._evaluatorEditProfileForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _evaluatorService: EvaluatorService,
    private _barangayService: BarangayService,
    private _matDialog: MatDialog,
  ) {}

  createForm() {
    this._evaluatorEditProfileForm = this._fb.group({
      first_name:[this.userInfo.first_name, Validators.required],
      middle_name:[this.userInfo.middle_name],
      last_name:[this.userInfo.last_name, Validators.required],
      suffix_name:[this.userInfo.suffix_name],
      birthdate:[new Date(this.userInfo.birthdate), Validators.required],
      marital_status:[this.userInfo.marital_status_id],
      gender:[this.userInfo.gender],
      home_address:[this.userInfo.home_address, Validators.required],
      barangay:[this.userInfo.barangay, Validators.required],
      employee_no:[this.userInfo.employee_detail.employee_no, Validators.required],
      office:[this.userInfo.employee_detail.office_id - 1 ],
      position:[this.userInfo.employee_detail.position, Validators.required],
      contact_number:[this.userInfo.contact_number, [Validators.required, Validators.maxLength(11),]],
      email_address:[this.userInfo.email_address, Validators.required],
      //id_number:[this.userInfo.id_number, Validators.required],
     // id_type:[this.userInfo.id_type, Validators.required],
    });
  }

  openDialog(userCredentials) {
      this._matDialog.open(UpdatePasswordDialogComponent, {
        data: userCredentials,
        height: '350px',
        width: '600px',
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
    return this._barangay.filter(option => option.name.toLowerCase().includes(value.toLowerCase()));
  }

  filterOffice(value: string): string[] {
    return this._office.filter(option=> option.toLowerCase().includes(value));
  }

  filterPosition(value: string): string[] {
    return this._position.filter(option=> option.toLowerCase().includes(value));
  }

  displayBarangayName(value: number) {
    if (value != null) {
      return this._barangay[value - 1].name;
    }
  }

  displayOfficeName(value: number) {
    if (value != null) {
      return this._office[value];
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
    if (localStorage.getItem('user') != null) {
      this.userInfo = JSON.parse(localStorage.getItem('user'));
      this.userInfo.marital_status_id = String(this.userInfo.marital_status_id);
      this.userInfo.employee_detail.office_id = String(this.userInfo.employee_detail.office_id);

      this.createForm();
    }
    this._barangayService.getBarangayInfo().subscribe(data => {
      this._barangay = data;
      this._filteredBarangayOptions = this.evaluatorEditProfileFormControl.barangay.valueChanges
      .pipe(
        startWith(''),
        map(barangay => barangay ? this.filterBarangays(barangay) : this._barangay.slice())
      );
    });

    this._filteredOfficeOptions = this.evaluatorEditProfileFormControl.office.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOffice(value))
    );

    this._filteredPositionOptions = this.evaluatorEditProfileFormControl.position.valueChanges.pipe(
      startWith(''),
      map(value => this.filterPosition(value))
    );
  }

  onSubmit() {
    this._submitted = true;

    if (this._evaluatorEditProfileForm.valid) {
      this.isUpdating = true;

      const user = {
        first_name: this._evaluatorEditProfileForm.value.first_name,
        middle_name: this._evaluatorEditProfileForm.value.middle_name,
        last_name: this._evaluatorEditProfileForm.value.last_name,
        suffix_name: this._evaluatorEditProfileForm.value.suffix_name,
        birthdate: this.dateToString(this._evaluatorEditProfileForm.value.birthdate),
        marital_status_id: this._evaluatorEditProfileForm.value.marital_status,
        gender: this._evaluatorEditProfileForm.value.gender,
        home_address: this._evaluatorEditProfileForm.value.home_address,
        barangay: this._evaluatorEditProfileForm.value.barangay,
        employee_no: this._evaluatorEditProfileForm.value.employee_no,
        office_id: this._evaluatorEditProfileForm.value.office + 1,
        position: this._evaluatorEditProfileForm.value.position,
        contact_number: this._evaluatorEditProfileForm.value.contact_number,
        email_address: this._evaluatorEditProfileForm.value.email_address,
        id_number: this._evaluatorEditProfileForm.value.id_number,
        id_type: this._evaluatorEditProfileForm.value.id_type,
        photo_path: this.selectedPhoto ? this.selectedPhoto : null,
        //id_photo_path: this.selectedFile ? this.selectedFile : null
      };

      this._userService
        .updateUserInfo(user, this.userInfo.id)
        .subscribe((result) => {
          this.isUpdating = false;
          const user = JSON.parse(localStorage.getItem('user'));
          const update = {
            ...user,
            ...result['data'],
            employee_detail: {
              ...user.employee_detail,
              employee_no: this._evaluatorEditProfileForm.value.employee_no,
              office_id: this._evaluatorEditProfileForm.value.office + 1,
              position: this._evaluatorEditProfileForm.value.position
            }
          };
          localStorage.setItem('user', JSON.stringify(update));

          Swal.fire('Success!', `Updated profile information.`, 'success').then(
            (result) => {
              window.location.reload();
            }
          );
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
