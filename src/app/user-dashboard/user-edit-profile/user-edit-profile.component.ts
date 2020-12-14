import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

import { UserService } from '../../core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.scss'],
})
export class UserEditProfileComponent implements OnInit {
  public photo: string = '';
  public idFile: FormControl = new FormControl('');
  public selectedFile: File = null;
  public selectedPhoto: File = null;
  public photoUploaded: boolean = false;
  public maxLength: number = 11;
  public isUpdating: boolean = false;
  public userInfo;
  public user;
  public updateUserDetails;

  _birthdateString: string;

  _editProfileForm: FormGroup;
  _identificationForm: FormGroup;

  _displayPhoto: string | ArrayBuffer = '';
  _displayIdPhoto: string | ArrayBuffer = '';
  _submitted = false;

  private onTouched: () => void;

  get displayProfilePhoto(): string | ArrayBuffer {
    return this._displayPhoto ? this._displayPhoto : this.userInfo.photo_path;
  }

  get displayIDPhoto(): string | ArrayBuffer {
    return this._displayIdPhoto
      ? this._displayIdPhoto
      : this.userInfo.id_photo_path;
  }

  get editProfileFormControl() {
    return this._editProfileForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userService: UserService
  ) {
    this.createForm();
  }

  createForm() {
    this._editProfileForm = this._fb.group({
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      suffix_name: [''],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      marital_status_id: ['', Validators.required],

      home_address: ['', Validators.required],
      barangay: ['', Validators.required],
      contact_number: ['', [Validators.required, Validators.maxLength(11)]],

      id_number: ['', Validators.required],
      id_type: ['', Validators.required],
    });
  }

  createUserDetails() {
    console.log(this.selectedFile);
    console.log(this.selectedPhoto);

    this.updateUserDetails = {
      first_name: this._editProfileForm.value.first_name,
      middle_name: this._editProfileForm.value.middle_name,
      last_name: this._editProfileForm.value.last_name,
      suffix_name: this._editProfileForm.value.suffix_name,
      birthdate: this._editProfileForm.value.birthdate,
      gender: this._editProfileForm.value.gender,
      marital_status_id: this._editProfileForm.value.marital_status_id,

      home_address: this._editProfileForm.value.home_address,
      //"barangay":this._editProfileForm.value.barangay,
      contact_number: this._editProfileForm.value.contact_number,

      id_number: this._editProfileForm.value.id_number,
      id_type: this._editProfileForm.value.id_type,
    };

    if (this.selectedPhoto) {
      this.updateUserDetails['photo_path'] = this.selectedPhoto;
    }
    if (this.selectedFile) {
      this.updateUserDetails['id_photo_path'] = this.selectedFile;
    }
  }

  onSubmit() {
    this._submitted = true;
    console.log('date' + this._editProfileForm.value.birthdate);
    if (this.editProfileFormControl.onTouched) {
    }

    if (this._editProfileForm.valid) {
      this.isUpdating = true;
      this.createUserDetails();
      this._userService.setUserInfo(this.updateUserDetails);
      this._userService
        .updateUserInfo(this.updateUserDetails, this.userInfo.id)
        .subscribe((result) => {
          this.isUpdating = false;
          console.log(result);
          console.log(this.updateUserDetails);
        });
      this.isUpdating = false;
    }
  }

  openFileChooser() {
    const element: HTMLElement = document.getElementById(
      'photo'
    ) as HTMLElement;

    element.click();
  }

  openIdChooser() {
    const element: HTMLElement = document.getElementById(
      'idCard'
    ) as HTMLElement;

    element.click();
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  doBlur() {
    this.onTouched();
  }

  handlePhotoFileChange($event) {
    this.selectedPhoto = $event.target.files[0];
    this.readSelectedInfo();
  }

  handleFileChangeEvent($event) {
    this.selectedFile = $event.target.files[0];
    this.readSelectedIdInfo();
  }

  readSelectedInfo() {
    if (this.selectedPhoto) {
      let reader = new FileReader();

      reader.onload = (res) => {
        console.log(res);

        this._displayPhoto = reader.result;
      };

      reader.readAsDataURL(this.selectedPhoto); // convert to base64 string
    }
  }

  readSelectedIdInfo() {
    if (this.selectedFile) {
      let reader = new FileReader();

      reader.onload = (res) => {
        this._displayIdPhoto = reader.result;
      };

      reader.readAsDataURL(this.selectedFile); // convert to base64 string
    }
  }

  getUserInfo() {
    this._userService.getUserInfo(this.user.uid).subscribe((data) => {
      this._userService.setUserInfo(data);
      console.log('ger user' + data);
    });
  }

  checkValue(type: string, event: MatDatepickerInputEvent<Date>) {
    let dd = event.value.getDate();
    let mm = event.value.getMonth() + 1;
    let yyyy = event.value.getFullYear();
    let birthdateString = `${yyyy}-${mm}-${dd}`;
    this._editProfileForm.value.birthdate = birthdateString;
    console.log(this._editProfileForm.value.birthdate);
  }

  ngOnInit(): void {
    this._userService.cast.subscribe(
      (userSubject) => (this.userInfo = userSubject)
    );
    this.createForm();
    this._editProfileForm.patchValue({
      first_name: this.userInfo.first_name,
      last_name: this.userInfo.last_name,
      middle_name: this.userInfo.middle_name,

      suffix_name: this.userInfo.suffix_name,
      birthdate: this.userInfo.birthdate,
      gender: this.userInfo.gender,
      marital_status_id: this.userInfo.marital_status_id,

      home_address: this.userInfo.home_address,
      barangay: this.userInfo.barangay,
      contact_number: this.userInfo.contact_number,

      id_number: this.userInfo.id_number,
      id_type: this.userInfo.id_type,
    });

    this.user = JSON.parse(localStorage.getItem('user'));
    this.getUserInfo();
    console.log(this.user);
  }
}
