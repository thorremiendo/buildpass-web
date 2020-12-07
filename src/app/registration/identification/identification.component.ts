import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService} from '../../core/services/auth.service'
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { RegisterAccountFormService } from 'src/app/core/services/register-account-form.service';

import { DataPrivacyComponent } from '../data-privacy/data-privacy.component';
@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {
  public photo: string = "";
  public idFile: FormControl = new FormControl("");

  public identificationForm: FormGroup;

  private onTouched: () => void;

  public selectedFile: File = null;
  public selectedPhoto: File = null;

  public photoUploaded: boolean = false;
  public userDetails;

  private _displayPhoto: string | ArrayBuffer = "";

  get displayPhoto(): string | ArrayBuffer {
    return this._displayPhoto
      ? this._displayPhoto
      : "https://baguio-visita.s3-ap-southeast-1.amazonaws.com/default-avatar.png";
  }

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _dialog: MatDialog,
    private _authService: AuthService,
    private _registerAccountFormService: RegisterAccountFormService,

  ) 
  {
    this.createForm();
   
  }

  ngOnInit(): void {
    this.createForm();
    
    this._registerAccountFormService.cast.subscribe(
      (registerAccountSubject) => (this.userDetails = registerAccountSubject)
    );
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

    console.log(this.selectedPhoto);

  }

  createForm() {
    this.identificationForm= this._fb.group({
      id_number: ["", Validators.required],
      id_type: ["", Validators.required],
      
    });
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
  

  onSubmit() {
    this.userDetails = {
      "id_photo_path": this.selectedFile,
      "photo_path": this.selectedPhoto,
      "id_number": this.identificationForm.value.id_number,
      "id_type": this.identificationForm.value.id_type,
    };
    if (this.identificationForm.valid) {
       this._registerAccountFormService.setRegisterAccountInfo(this.userDetails);
       this._registerAccountFormService.submitRegisterAccountInfo(this.userDetails).subscribe((res) => {
        this._authService.SendVerificationMail();
      }, (err => {
        console.log(err);
        console.log(this.userDetails)
       
      
      }));
       
    }
  }

  openDialog() {
    if(this.identificationForm.valid){
      const dialogRef = this._dialog.open(DataPrivacyComponent);
      dialogRef.afterClosed().subscribe(result => {
        this.onSubmit();

      });
      
    }
    
  
  }

}
