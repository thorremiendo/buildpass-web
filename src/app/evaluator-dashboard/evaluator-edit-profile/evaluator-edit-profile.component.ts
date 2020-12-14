import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';

import { UserService } from '../../core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Position, Office } from '../../core/enums/department.enum'

@Component({
  selector: 'app-evaluator-edit-profile',
  templateUrl: './evaluator-edit-profile.component.html',
  styleUrls: ['./evaluator-edit-profile.component.scss']
})
export class EvaluatorEditProfileComponent implements OnInit {
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
  public _marital_status:string;

  _birthdateString: string;
  _evaluatorEditProfileForm: FormGroup;
  _identificationForm: FormGroup;

  _displayPhoto: string | ArrayBuffer = '';
  _displayIdPhoto: string | ArrayBuffer = '';
  _submitted = false;

  _filteredOfficeOptions: Observable<string[]>;
  _filteredPositionOptions: Observable<string[]>;

  _office_options:string[] = Object.keys(Office).map(key => Office[key]).filter(k => !(parseInt(k) >= 0));
  _position_options:string[] = Object.keys(Position).map(key => Position[key]).filter(k => !(parseInt(k) >= 0));

  private onTouched: () => void;

  get displayProfilePhoto(): string | ArrayBuffer {
    return this._displayPhoto ? this._displayPhoto : this.userInfo.photo_path;
  }

  get displayIDPhoto(): string | ArrayBuffer {
    return this._displayIdPhoto
      ? this._displayIdPhoto
      : this.userInfo.id_photo_path;
  }


  get evaluatorEditProfileFormControl() {
    return this._evaluatorEditProfileForm.controls;
  }


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userService: UserService

  ) {
    this.createForm();
   }

  createForm() {
    this._evaluatorEditProfileForm = this._fb.group({
      first_name:['', Validators.required],
      middle_name:[''],
      last_name: ['', Validators.required],
      suffix_name:[''],
      birthdate:['', Validators.required],
      gender:['', Validators.required],
      marital_status:['', Validators.required],
      home_address: ['', Validators.required ],
      barangay: ['', Validators.required ],

      employee_no:[''],
      office:[''],
      position: [''],
      contact_number:['', [Validators.required, Validators.maxLength(11),]],

      id_number: ["", Validators.required],
      id_type: ["", Validators.required],

      
      
    },
    );
  }

  createUserDetails() {
    console.log(this.selectedFile);
    console.log(this.selectedPhoto);

    this.updateUserDetails = {
      first_name: this._evaluatorEditProfileForm.value.first_name,
      middle_name: this._evaluatorEditProfileForm.value.middle_name,
      last_name: this._evaluatorEditProfileForm.value.last_name,
      suffix_name: this._evaluatorEditProfileForm.value.suffix_name,
      birthdate: this._evaluatorEditProfileForm.value.birthdate,
      gender: this._evaluatorEditProfileForm.value.gender,
      marital_status_id: this._evaluatorEditProfileForm.value.marital_status,

      home_address: this._evaluatorEditProfileForm.value.home_address,
      //"barangay":this._evaluatorEditProfileForm.value.barangay,
      contact_number: this._evaluatorEditProfileForm.value.contact_number,

      employee_no: this._evaluatorEditProfileForm.value.employee_no,
      office: this._evaluatorEditProfileForm.value.office,
      position: this._evaluatorEditProfileForm.value.position, 

      id_number: this._evaluatorEditProfileForm.value.id_number,
      id_type: this._evaluatorEditProfileForm.value.id_type,
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
    console.log('date' + this._evaluatorEditProfileForm.value.birthdate);
    if (this.evaluatorEditProfileFormControl.onTouched) {
    }

    if (this._evaluatorEditProfileForm.valid) {
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

  _filterOffice(value: string): string[] {
    const filterValueOffice = value.toLowerCase();

    return this._office_options.filter(_office_option=> _office_option.toLowerCase().includes(filterValueOffice));
  }

  _filterPosition(value: string): string[] {
    const filterValuePosition = value.toLowerCase();

    return this._position_options.filter(_position_option=> _position_option.toLowerCase().includes(filterValuePosition));
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
    this._evaluatorEditProfileForm.value.birthdate = birthdateString;
    console.log(this._evaluatorEditProfileForm.value.birthdate);
  }



  
  ngOnInit(): void {
    
    this._userService.cast.subscribe(
      (userSubject) => (this.userInfo = userSubject)
    
    );


    this.createForm();

    switch(this.userInfo.marital_status_id){

      case 1:
        this._marital_status = "Single";
        console.log(this._marital_status);
        break;
      case 2:
        this._marital_status = "Married";
        console.log(this._marital_status);
        break;
      case 3:
        this._marital_status = "Divorce";
        console.log(this._marital_status);
        break;
      case 4:
        this._marital_status = "Widowed";
        console.log(this._marital_status);
        break;

    }

    this._evaluatorEditProfileForm.patchValue({
      first_name: this.userInfo.first_name,
      last_name: this.userInfo.last_name,
      middle_name: this.userInfo.middle_name,

      suffix_name: this.userInfo.suffix_name,
      birthdate: this.userInfo.birthdate,
      gender: this.userInfo.gender,
      marital_status_id: this._marital_status,

      home_address: this.userInfo.home_address,
      barangay: this.userInfo.barangay,
      contact_number: this.userInfo.contact_number,

      
      id_number: this.userInfo.id_number,
      id_type: this.userInfo.id_type,

    });

    this.user = JSON.parse(localStorage.getItem('user'));
    this.getUserInfo();
    console.log(this.userInfo);

  }
}