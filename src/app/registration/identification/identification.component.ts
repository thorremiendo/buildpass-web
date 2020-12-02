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

  ) {
    this.identificationForm = _fb.group({
      idNumber: new FormControl("", Validators.required),
      idTypeId: new FormControl("1", Validators.required),
    });

    this.identificationForm.valueChanges.subscribe((res) => {
      this.emitFormValue();
    });
  }

  ngOnInit(): void {
    
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

    this.identificationForm = this._fb.group({
      //photo: new FormControl("", Validators.required),

      idNumber: new FormControl("", Validators.required),
      idTypeId: new FormControl("1", Validators.required),
    });
  }
  emitFormValue() {
    const { idNumber, idTypeId = 1 } = this.identificationForm.value;

    const value: IdentificationFormValues = {
      idNumber,
      idTypeId,
      idCard: this.selectedFile,
      photoFile: this.selectedPhoto ? this.selectedPhoto : this.photo,
    };

    // if(this.onChange) this.onChange(value);
  }

  writeValue(obj: IdentificationFormValues): void {
    const { idNumber, idTypeId = 1 } = obj;

    this.identificationForm.patchValue({
      idNumber,
      idTypeId,
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
      id_photo_path: this.selectedFile,
      photo: this.selectedPhoto,
      id_number: this.identificationForm.value.idNumber,
      id_type_id: this.identificationForm.value.idTypeId,
    };
    if (this.identificationForm.valid) {
       this._registerAccountFormService.setRegisterAccountInfo(this.userDetails);
       this._authService.SendVerificationMail();
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

interface IdentificationFormValues {
  idCard?: File;
  idNumber?: string;
  idTypeId?: string;
  photoFile?: string | File;
}
