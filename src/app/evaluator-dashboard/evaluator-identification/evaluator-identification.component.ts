import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-evaluator-identification',
  templateUrl: './evaluator-identification.component.html',
  styleUrls: ['./evaluator-identification.component.scss']
})
export class EvaluatorIdentificationComponent implements OnInit {
  public selectedFile;
  public selectedPhoto;
  _evaluatorIdentificationForm: FormGroup;
  _submitted: boolean = false;

  get profilePhoto(): string | ArrayBuffer {
    const photo = this.selectedPhoto;
    return photo ? photo : "https://baguio-visita.s3-ap-southeast-1.amazonaws.com/default-avatar.png";
  }

  get idPhoto(): string | ArrayBuffer {
    const id = this.selectedFile;
    return id ? id : "https://baguio-visita.s3-ap-southeast-1.amazonaws.com/default-avatar.png";
  }

  get evaluatorIdentificationFormControl() {
    return this._evaluatorIdentificationForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.selectedPhoto = this._localStorageService.get('evaluator-registration-photo');
    this.selectedFile = this._localStorageService.get('evaluator-registration-id');
    this.createForm();
  }

  createForm() {
    const idType = this._localStorageService.get('evaluator-registration-id-type');
    const idNumber = this._localStorageService.get('evaluator-registration-id-number');

    this._evaluatorIdentificationForm= this._fb.group({
      id_type: [idType, Validators.required], 
      id_number: [idNumber, Validators.required],
    });
  }

  openFileChooser() {
    const element: HTMLElement = document.getElementById("photo") as HTMLElement;
    element.click();
  }

  handleFileChange($event) {
    const reader = new FileReader();
    reader.onload = (res) => {  
      this.persist('evaluator-registration-id', reader.result);
      this.selectedFile = reader.result;
    };
    reader.readAsDataURL($event.addedFiles[0]);
  }

  handlePhotoChange($event) {
    const reader = new FileReader();
    reader.onload = (res) => {
      this.persist('evaluator-registration-photo', reader.result);
      this.selectedPhoto = reader.result;
    };
    reader.readAsDataURL($event.target.files[0]);
  }
  
  onSubmit() {
    if (this._evaluatorIdentificationForm.valid) {
      this._router.navigateByUrl('/evaluator/registration/summary');
    }
  }

  persist(key: string, value: any) {
    this._localStorageService.set(key, value);
  }
}

interface IdentificationFormValues {
  idCard?: File;
  id_number?: string;
  id_type?: string;
  photoFile?: string | File;
}
