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

  _identificationForm: FormGroup;



  private _displayPhoto: string | ArrayBuffer = "";

  get displayPhoto(): string | ArrayBuffer {
    return this._displayPhoto
      ? this._displayPhoto
      : "https://baguio-visita.s3-ap-southeast-1.amazonaws.com/default-avatar.png";
  }

  constructor(
    private _fb: FormBuilder,
    private _registerAccountEvaluatorFormService: RegisterAccountEvaluatorFormService,
    private _router: Router,

  ) {
    this._identificationForm = _fb.group({
      id_number: new FormControl("", Validators.required),
      id_type: new FormControl("", Validators.required),
    });

  }

  ngOnInit(): void {
    this.createForm();
    
    this._registerAccountEvaluatorFormService.cast.subscribe(
      registerAccountEvaluatorSubject => (this.userDetails = registerAccountEvaluatorSubject)
    );
    this._identificationForm.patchValue({
      id_number: this.userDetails.id_number,
      id_type: this.userDetails.id_type,
      
    });
    console.log(this.userDetails)

   
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
       this._registerAccountEvaluatorFormService.setRegisterAccountInfo(this.userDetails);
       this._router.navigateByUrl('/evaluator/registration/summary');
  }
}

  

}

interface IdentificationFormValues {
  idCard?: File;
  id_number?: string;
  id_type?: string;
  photoFile?: string | File;
}
