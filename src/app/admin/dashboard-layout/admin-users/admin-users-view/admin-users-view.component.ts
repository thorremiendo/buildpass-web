import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BarangayService } from '../../../../core/services/barangay.service';
import { Position, Office } from '../../../../core/enums/department.enum';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminUserService } from '../../../../core';

@Component({
  selector: 'app-admin-users-view',
  templateUrl: './admin-users-view.component.html',
  styleUrls: ['./admin-users-view.component.scss'],
})
export class AdminUsersViewComponent implements OnInit {
  public selectedFile: File = null;
  public selectedPhoto: File = null;
  public maxLength: number = 11;
  public isUpdating: boolean = false;
  public userInfo;

  _adminUpdateUserForm: FormGroup;
  _barangay: Barangay[];
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
  _submitted = false;

  get displayProfilePhoto(): string | ArrayBuffer {
    return this._displayPhoto ? this._displayPhoto : this.userInfo.photo_path;
  }

  get displayIDPhoto(): string | ArrayBuffer {
    return this._displayIdPhoto
      ? this._displayIdPhoto
      : this.userInfo.id_photo_path;
  }

  get adminUpdateUserFormControl() {
    return this._adminUpdateUserForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _barangayService: BarangayService,
    private _adminUserService: AdminUserService,
    public dialogRef: MatDialogRef<AdminUsersViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  closeModal() {
    this.dialogRef.close();
  }

  createForm() {
    this._adminUpdateUserForm = this._fb.group({
      first_name: [this.userInfo.first_name, Validators.required],
      middle_name: [this.userInfo.middle_name],
      last_name: [this.userInfo.last_name, Validators.required],
      suffix_name: [this.userInfo.suffix_name],
      birthdate: [this.userInfo.birthdate, Validators.required],
      marital_status: [this.userInfo.marital_status_id, Validators.required],
      gender: [this.userInfo.gender, Validators.required],
      home_address: [this.userInfo.home_address, Validators.required],
      barangay: [this.userInfo.barangay_id, Validators.required],
      employee_no: [
        this.userInfo.employee_detail.employee_no,
        Validators.required,
      ],
      office: [this.userInfo.employee_detail.office_id, Validators.required],
      position: [this.userInfo.employee_detail.position, Validators.required],
      contact_number: [
        this.userInfo.contact_number,
        [Validators.required, Validators.maxLength(11)],
      ],
      id_number: [this.userInfo.id_number, Validators.required],
      id_type: [this.userInfo.id_type, Validators.required],
    });
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
    return this._barangay.filter((option) =>
      option.name.toLowerCase().includes(value)
    );
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

  dateToString(dateObject) {
    if (dateObject != null) {
      const birthdate = new Date(dateObject);
      let dd = birthdate.getDate();
      let mm = birthdate.getMonth() + 1;
      let yyyy = birthdate.getFullYear();
      return `${yyyy}-${mm}-${dd}`;
    }
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
      if(this.userInfo){
        this.userInfo.marital_status_id = String(this.userInfo.marital_status_id);

        this.createForm();
  
        this._barangayService.getBarangayInfo().subscribe((data) => {
          this._barangay = data;
          this._filteredBarangayOptions = this.adminUpdateUserFormControl.barangay.valueChanges.pipe(
            startWith(''),
            map((barangay) =>
              barangay ? this.filterBarangays(barangay) : this._barangay.slice()
            )
          );
        });
  
        this._filteredOfficeOptions = this.adminUpdateUserFormControl.office.valueChanges.pipe(
          startWith(''),
          map((value) => this.filterOffice(value))
        );
  
        this._filteredPositionOptions = this.adminUpdateUserFormControl.position.valueChanges.pipe(
          startWith(''),
          map((value) => this.filterPosition(value))
        );

      }
  }

  onSubmit() {
    this._submitted = true;

    if (this._adminUpdateUserForm.valid) {
      this.isUpdating = true;

      const user = {
        first_name: this._adminUpdateUserForm.value.first_name,
        middle_name: this._adminUpdateUserForm.value.middle_name,
        last_name: this._adminUpdateUserForm.value.last_name,
        suffix_name: this._adminUpdateUserForm.value.suffix_name,
        birthdate: this.dateToString(this._adminUpdateUserForm.value.birthdate),
        marital_status_id: this._adminUpdateUserForm.value.marital_status,
        gender: this._adminUpdateUserForm.value.gender,
        home_address: this._adminUpdateUserForm.value.home_address,
        barangay: this._adminUpdateUserForm.value.barangay_id,
        employee_no: this._adminUpdateUserForm.value.employee_no,
        office_id: this._adminUpdateUserForm.value.office,
        position: this._adminUpdateUserForm.value.position,
        contact_number: this._adminUpdateUserForm.value.contact_number,
        id_number: this._adminUpdateUserForm.value.id_number,
        id_type: this._adminUpdateUserForm.value.id_type,
        photo_path: this.selectedPhoto ? this.selectedPhoto : null,
        id_photo_path: this.selectedFile ? this.selectedFile : null,
      };

      this._userService
        .updateUserInfo(user, this.userInfo.id)
        .subscribe((result) => {
          this.isUpdating = false;
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
