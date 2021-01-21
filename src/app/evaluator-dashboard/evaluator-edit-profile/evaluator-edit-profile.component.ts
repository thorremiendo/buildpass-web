import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { UserService } from '../../core/services/user.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BarangayService } from '../../core/services/barangay.service';
import { Position, Office } from '../../core/enums/department.enum';

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

  _barangay: Barangay[];
  _office:string[] = Object.keys(Office).map(key => Office[key]).filter(k => !(parseInt(k) >= 0));
  _position:string[] = Object.keys(Position).map(key => Position[key]).filter(k => !(parseInt(k) >= 0));
  _filteredBarangayOptions: Observable<Barangay[]>;
  _filteredOfficeOptions: Observable<string[]>;
  _filteredPositionOptions: Observable<string[]>;

  _evaluatorEditProfileForm: FormGroup;

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
    private _barangayService: BarangayService
  ) {}

  createForm() {
    this._evaluatorEditProfileForm = this._fb.group({
      first_name:[this.userInfo.first_name, Validators.required],
      middle_name:[this.userInfo.middle_name],
      last_name:[this.userInfo.last_name, Validators.required],
      suffix_name:[this.userInfo.suffix_name],
      birthdate:[this.userInfo.birthdate, Validators.required],
      marital_status:[this.userInfo.marital_status_id, Validators.required],
      gender:[this.userInfo.gender, Validators.required],
      home_address: [this.userInfo.home_address, Validators.required],
      barangay: [this.userInfo.barangay_id, Validators.required],
      employee_no:[this.userInfo.employee_detail.employee_no, Validators.required],
      office:[this.userInfo.employee_detail.office_id, Validators.required],
      position:[this.userInfo.employee_detail.position, Validators.required],
      contact_number:[this.userInfo.contact_number, [Validators.required, Validators.maxLength(11),]],
      id_number:[this.userInfo.id_number, Validators.required],
      id_type:[this.userInfo.id_type, Validators.required],
    });
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
        birthdate: this._evaluatorEditProfileForm.value.birthdate,
        marital_status_id: this._evaluatorEditProfileForm.value.marital_status,
        gender: this._evaluatorEditProfileForm.value.gender,
        home_address: this._evaluatorEditProfileForm.value.home_address,
        barangay: this._evaluatorEditProfileForm.value.barangay_id,
        employee_no: this._evaluatorEditProfileForm.value.employee_no,
        office_id: this._evaluatorEditProfileForm.value.office,
        position: this._evaluatorEditProfileForm.value.position, 
        contact_number: this._evaluatorEditProfileForm.value.contact_number,
        id_number: this._evaluatorEditProfileForm.value.id_number,
        id_type: this._evaluatorEditProfileForm.value.id_type
      };

      console.log(user);
      
      this._userService.setUserInfo(user);
      this._userService
        .updateUserInfo(user, this.userInfo.id)
        .subscribe((result) => {
          this.isUpdating = false;
          console.log(result);
        });
      this.isUpdating = false;
    }
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

  handleIDFileChangeEvent($event) {
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
    const filterValue = value.toLowerCase();
    return this._barangay.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  filterOffice(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this._office.filter(option=> option.toLowerCase().includes(filterValue));
  }

  filterPosition(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this._position.filter(option=> option.toLowerCase().includes(filterValue));
  }

  displayBarangayName(value: string) {
    return 'test';
  }
  
  ngOnInit(): void {
    this._barangayService.getBarangayInfo().subscribe(data => {
      this._barangay = data;
      this._filteredBarangayOptions = this.evaluatorEditProfileFormControl.barangay.valueChanges
      .pipe(
        startWith(''),
        map(barangay => barangay ? this.filterBarangays(barangay) : this._barangay.slice())
      );
    });

    this._userService.cast.subscribe(data => {
      if (Object.keys(data).length != 0) {
        this.userInfo = data;
        this.userInfo.marital_status_id = String(this.userInfo.marital_status_id);
        this.createForm();

        this._filteredOfficeOptions = this.evaluatorEditProfileFormControl.office.valueChanges.pipe(
          startWith(''),
          map(value => this.filterOffice(value))
        );
        
        this._filteredPositionOptions = this.evaluatorEditProfileFormControl.position.valueChanges.pipe(
          startWith(''),
          map(value => this.filterPosition(value))
        );    
      }
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