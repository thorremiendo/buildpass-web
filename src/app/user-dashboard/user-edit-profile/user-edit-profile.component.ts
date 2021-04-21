import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../../core/services/user.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BarangayService } from '../../core/services/barangay.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.scss']
})
export class UserEditProfileComponent implements OnInit {
  public selectedFile: File = null;
  public selectedPhoto: File = null;
  public maxLength: number = 11;
  public isUpdating: boolean = false;
  public userInfo;

  _userEditProfileForm: FormGroup;
  _barangay: Barangay[];
  _filteredBarangayOptions: Observable<Barangay[]>;
  _displayPhoto: string | ArrayBuffer = '';
  _displayIdPhoto: string | ArrayBuffer = '';
  _submitted = false;

  get displayProfilePhoto(): string | ArrayBuffer {
    return this._displayPhoto ? this._displayPhoto : this.userInfo.photo_path;
  }

  get displayIDPhoto(): string | ArrayBuffer {
    return this._displayIdPhoto ? this._displayIdPhoto : this.userInfo.id_photo_path;
  }

  get userEditProfileFormControl() {
    return this._userEditProfileForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _barangayService: BarangayService
  ) {
    
  }

  createForm() {
    this._userEditProfileForm = this._fb.group({
      first_name:[this.userInfo.first_name, Validators.required],
      middle_name:[this.userInfo.middle_name],
      last_name:[this.userInfo.last_name, Validators.required],
      suffix_name:[this.userInfo.suffix_name],
      birthdate:[new Date(this.userInfo.birthdate), Validators.required],
      marital_status:[this.userInfo.marital_status_id, Validators.required],
      gender:[this.userInfo.gender, Validators.required],
      home_address:[this.userInfo.home_address, Validators.required],
      barangay:[this.userInfo.barangay, Validators.required],
      contact_number:[this.userInfo.contact_number, [Validators.required, Validators.maxLength(11),]],
      id_number:[this.userInfo.id_number, Validators.required],
      id_type:[this.userInfo.id_type, Validators.required],
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
    if (localStorage.getItem('user') != null) {
      this.userInfo = JSON.parse(localStorage.getItem('user'));
      this.userInfo.marital_status_id = String(this.userInfo.marital_status_id);
      this.createForm();
    }

    this._barangayService.getBarangayInfo().subscribe(data => {
      this._barangay = data;
      this._filteredBarangayOptions = this.userEditProfileFormControl.barangay.valueChanges
      .pipe(
        startWith(''),
        map(barangay => barangay ? this.filterBarangays(barangay) : this._barangay.slice())
      );
    });

  }

  onSubmit() {
    this._submitted = true;

    if (this._userEditProfileForm.valid) {
      this.isUpdating = true;
      
      const user = {
        first_name: this._userEditProfileForm.value.first_name,
        middle_name: this._userEditProfileForm.value.middle_name,
        last_name: this._userEditProfileForm.value.last_name,
        suffix_name: this._userEditProfileForm.value.suffix_name,
        birthdate: this.dateToString(this._userEditProfileForm.value.birthdate),
        marital_status_id: this._userEditProfileForm.value.marital_status,
        gender: this._userEditProfileForm.value.gender,
        home_address: this._userEditProfileForm.value.home_address,
        barangay: this._userEditProfileForm.value.barangay,
        contact_number: this._userEditProfileForm.value.contact_number,
        id_number: this._userEditProfileForm.value.id_number,
        id_type: this._userEditProfileForm.value.id_type,
        photo_path: this.selectedPhoto ? this.selectedPhoto : null,
        id_photo_path: this.selectedFile ? this.selectedFile : null
      };
      
      this._userService
        .updateUserInfo(user, this.userInfo.id)
        .subscribe((result) => {
          this.isUpdating = false;
          const user = JSON.parse(localStorage.getItem('user'));
          const update = {
            ...user,
            ...result['data']
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