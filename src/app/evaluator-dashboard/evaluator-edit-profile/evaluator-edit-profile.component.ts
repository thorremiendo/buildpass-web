import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { RegisterAccountEvaluatorFormService } from '../../core/services/register-account-evaluator-form.service';
import { Router } from '@angular/router';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Position, Office } from '../../core/enums/department.enum'

@Component({
  selector: 'app-evaluator-edit-profile',
  templateUrl: './evaluator-edit-profile.component.html',
  styleUrls: ['./evaluator-edit-profile.component.scss']
})
export class EvaluatorEditProfileComponent implements OnInit {
  public userDetails;
  public maxLength: number = 11;

  public photo: string = "";
  public idFile: FormControl = new FormControl("");
  public selectedFile: File = null;
  public selectedPhoto: File = null;
  public photoUploaded: boolean = false;

  _evaluatorEditProfileForm: FormGroup;
  _displayPhoto: string | ArrayBuffer = "";
  _submitted = false;

  _filteredOfficeOptions: Observable<string[]>;
  _filteredPositionOptions: Observable<string[]>;

  _office_options:string[] = Object.keys(Office).map(key => Office[key]).filter(k => !(parseInt(k) >= 0));
  _position_options:string[] = Object.keys(Position).map(key => Position[key]).filter(k => !(parseInt(k) >= 0));

  private onTouched: () => void;

  get displayPhoto(): string | ArrayBuffer {
    return this._displayPhoto
      ? this._displayPhoto
      : "https://baguio-visita.s3-ap-southeast-1.amazonaws.com/default-avatar.png";
  }


  get evaluatorEditProfileFormControl() {
    return this._evaluatorEditProfileForm.controls;
  }


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _registerAccountEvaluatorFormService: RegisterAccountEvaluatorFormService,

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

      employee_number:['', Validators.required],
      office:['', Validators.required],
      position: ['', Validators.required],
      contact_number:['', [Validators.required, Validators.maxLength(11),]],

      id_number: ["", Validators.required],
      id_type: ["", Validators.required],

      
      
    },
    );
  }

  createUserDetails(){

    this.userDetails ={
      "first_name": this._evaluatorEditProfileForm.value.first_name,
      "middle_name":this._evaluatorEditProfileForm.value.middle_name,
      "last_name":  this._evaluatorEditProfileForm.value.last_name,
      "suffix_name":this._evaluatorEditProfileForm.value.suffix_name,
      "birthdate": this._evaluatorEditProfileForm.value.birthdate,
      "gender": this._evaluatorEditProfileForm.value.gender,
      "marital_status": this._evaluatorEditProfileForm.value.marital_status,

      "home_address": this._evaluatorEditProfileForm.value.home_address,
      "barangay":this._evaluatorEditProfileForm.value.barangay,

      "employee_no": this._evaluatorEditProfileForm.value.employee_number,
      "office": this._evaluatorEditProfileForm.value.office,
      "position": this._evaluatorEditProfileForm.value.position, 
      "contact_no":  this._evaluatorEditProfileForm.value.contact_number,

      "id_number": this._evaluatorEditProfileForm.value.id_number,
      "id_type": this._evaluatorEditProfileForm.value.id_type,

    }
  
  }

  dateToString(){
    if(this._evaluatorEditProfileForm.value.birthdate != null){
      let dd = this._evaluatorEditProfileForm.value.birthdate.getDate();
      let mm = this._evaluatorEditProfileForm.value.birthdate.getMonth() + 1;
      let yyyy = this._evaluatorEditProfileForm.value.birthdate.getFullYear();
      let birthdateString = (`${yyyy}-${mm}-${dd}`);
      this._evaluatorEditProfileForm.value.birthdate = birthdateString;
      console.log(birthdateString);
    }

  }

  onSubmit(){
    this._submitted = true;
    this.dateToString();
    if (this._evaluatorEditProfileForm.valid){
      this.createUserDetails();
      this._registerAccountEvaluatorFormService.setRegisterAccountInfo(this.userDetails);
      this._router.navigateByUrl("evaluator/registration/employee-info");
      
      console.log(this.userDetails);

    
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
      "photo"
    ) as HTMLElement;

    element.click();
  }



  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  doBlur() {
    this.onTouched();
  }

  handleFileChangeEvent($event) {
    const file = $event.addedFiles[0];
    this.selectedFile = file;
  }

  handlePhotoFileChange($event) {
    this.selectedPhoto = $event.target.files[0];

    this.readSelectedInfo();
  }

  readSelectedInfo() {
    if (this.selectedPhoto) {
      let reader = new FileReader();

      reader.onload = (res) => {
        console.log(res);

        this._displayPhoto = reader.result;
      };

      reader.readAsDataURL(this.selectedPhoto); // convert to base64 string
      this.photoUploaded = true;
    }
  }


  
  ngOnInit(): void {
    this._registerAccountEvaluatorFormService.cast.subscribe(registerAccountEvaluatorSubject => this.userDetails = registerAccountEvaluatorSubject)
    this.createForm();
    this._evaluatorEditProfileForm.patchValue({
      first_name: this.userDetails.first_name,
      last_name: this.userDetails.last_name,
      email_address: this.userDetails.email_address,
      middle_name:this.userDetails.middle_name,
      suffix_name:this.userDetails.suffix_name,
      birthdate: this.userDetails.birthdate,
      gender: this.userDetails.gender,
      marital_status: this.userDetails.marital_status,
      home_address: this.userDetails.home_address,
      barangay:this.userDetails.barangay,
     

    })

    this._filteredOfficeOptions = this.evaluatorEditProfileFormControl.office.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOffice(value))
    );

    this._filteredPositionOptions = this.evaluatorEditProfileFormControl.position.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPosition(value))
    );

    
  }

}
