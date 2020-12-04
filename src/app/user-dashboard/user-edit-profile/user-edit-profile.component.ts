import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService} from '../../core/services/auth.service'
import { Router } from '@angular/router';
import { RegisterAccountFormService } from 'src/app/core/services/register-account-form.service';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.scss']
})
export class UserEditProfileComponent implements OnInit {
  public photo: string = "";
  public idFile: FormControl = new FormControl("");
  public selectedFile: File = null;
  public selectedPhoto: File = null;
  public photoUploaded: boolean = false;
  public maxLength: number = 11;
  public userDetails;

  _editProfileForm: FormGroup;
  _identificationForm: FormGroup;

  _displayPhoto: string | ArrayBuffer = "";
  _submitted = false;

  private onTouched: () => void;

  get displayPhoto(): string | ArrayBuffer {
    return this._displayPhoto
      ? this._displayPhoto
      : 'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/ocpas_bot.png';
  }

  get editProfileFormControl() {
    return this._editProfileForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _registerAccountFormService: RegisterAccountFormService,

  ) {
    this.createForm();
   }

  createForm() {
    this._editProfileForm = this._fb.group({
      first_name:['', Validators.required],
      middle_name:[''],
      last_name: ['', Validators.required],
      suffix_name:[''],
      birthdate:['', Validators.required],
      gender:['', Validators.required],
      nationality:['Filipino', Validators.required],
      marital_status:['', Validators.required],

      home_address: ['', Validators.required ],
      barangay: ['', Validators.required ],
      contact_number:['', [Validators.required, Validators.maxLength(11),]],

      id_number: ["", Validators.required],
      id_type: ["", Validators.required],

      
    });

    // this._identificationForm= this._fb.group({
    //   idNumber: ["", Validators.required],
    //   idIssuer: ["", Validators.required],
    // });


  }

  createUserDetails(){

    this.userDetails ={
      "first_name": this._editProfileForm.value.first_name,
      "middle_name":this._editProfileForm.value.middle_name,
      "last_name":  this._editProfileForm.value.last_name,
      "suffix_name":this._editProfileForm.value.suffix_name,
      "birthdate": this._editProfileForm.value.birthdate,
      "gender": this._editProfileForm.value.gender,
      "nationality": this._editProfileForm.value.nationality,
      "marital_status": this._editProfileForm.value.marital_status,

      "home_address": this._editProfileForm.value.home_address,
      "barangay":this._editProfileForm.value.barangay,
      "contact_number":  this._editProfileForm.value.contact_number,

      "id_photo_path": this.selectedFile,
      "photo_path": this.selectedPhoto,
      "id_number": this._editProfileForm.value.id_Number,
      "id_type": this._editProfileForm.value.id_type,


      

    }
  
  }

  dateToString(){
    if(this._editProfileForm.value.birthdate != null){
      let dd = this._editProfileForm.value.birthdate.getDate();
      let mm = this._editProfileForm.value.birthdate.getMonth();
      let yyyy = this._editProfileForm.value.birthdate.getFullYear();
      let birthdateString = (`${yyyy}-${mm}-${dd}`);
      this._editProfileForm.value.birthdate = birthdateString;
      console.log(birthdateString);
    }

  }

  onSubmit(){
    this._submitted = true;
    this.dateToString();
    if (this._editProfileForm.valid){
      this.createUserDetails();
      this._registerAccountFormService.setRegisterAccountInfo(this.userDetails);
      this._router.navigateByUrl("/registration/identification-info")
      
      console.log(this.userDetails);

    }
   
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
    this._registerAccountFormService.cast.subscribe(registerAccountSubject => this.userDetails = registerAccountSubject)
    this.createForm();
    this._editProfileForm.patchValue({
      first_name: this.userDetails.first_name,
      last_name: this.userDetails.last_name,
      email_address: this.userDetails.email_address

    })

    this._registerAccountFormService.registerAccountInfo.subscribe((res) => {
      this._displayPhoto = res.photo;
      this.photo = res.photo
        ? res.photo
        : "https://baguio-visita.s3-ap-southeast-1.amazonaws.com/default-avatar.png";
      if (this._displayPhoto) {
        this.photoUploaded = true;
      } else {
        this.photoUploaded = false;
      }
    });

    
  }

}
