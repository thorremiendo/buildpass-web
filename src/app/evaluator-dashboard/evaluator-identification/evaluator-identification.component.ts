import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { RegisterAccountEvaluatorFormService } from '../../core/services/register-account-evaluator-form.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-evaluator-identification',
  templateUrl: './evaluator-identification.component.html',
  styleUrls: ['./evaluator-identification.component.scss']
})
export class EvaluatorIdentificationComponent implements OnInit {
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
    private _registerAccountEvaluatorFormService: RegisterAccountEvaluatorFormService,
   

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
    
    this._registerAccountEvaluatorFormService.cast.subscribe(registerAccountEvaluatorSubject => this.userDetails = registerAccountEvaluatorSubject)
    console.log(this.userDetails);
    this._registerAccountEvaluatorFormService.registerAccountInfo.subscribe((res) => {
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
       this._registerAccountEvaluatorFormService.setRegisterAccountInfo(this.userDetails);
    }
  }

  

}

interface IdentificationFormValues {
  idCard?: File;
  idNumber?: string;
  idTypeId?: string;
  photoFile?: string | File;
}
