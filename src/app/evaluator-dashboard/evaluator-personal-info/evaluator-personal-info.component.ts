import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BarangayService } from '../../core/services/barangay.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { RegisterAccountEvaluatorFormService } from '../../core/services/register-account-evaluator-form.service';

@Component({
  selector: 'app-evaluator-personal-info',
  templateUrl: './evaluator-personal-info.component.html',
  styleUrls: ['./evaluator-personal-info.component.scss']
})
export class EvaluatorPersonalInfoComponent implements OnInit {
  public userDetails;
  public barangay: Barangay[];
  _filteredBarangayOptions: Observable<Barangay[]>;
  _evaluatorPersonalInfoForm: FormGroup;
  _submitted: boolean = false;

  get evaluatorPersonalInfoFormControl() {
    return this._evaluatorPersonalInfoForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _barangayService: BarangayService,
    private _localStorageService: LocalStorageService,
    private _registerAccountEvaluatorFormService: RegisterAccountEvaluatorFormService
  ) {}

  ngOnInit(): void {
    this._barangayService.getBarangayInfo().subscribe(data=>{
      this.barangay = data; 
      this._filteredBarangayOptions = this.evaluatorPersonalInfoFormControl.barangay.valueChanges
      .pipe(
        startWith(''),
        map(barangay => barangay ? this.filter(barangay) : this.barangay.slice())
      );
      console.log(this._filteredBarangayOptions);
    });

    this._registerAccountEvaluatorFormService.cast.subscribe(registerAccountEvaluatorSubject => this.userDetails = registerAccountEvaluatorSubject);

    if (this.userDetails && this.userDetails.firebase_uid) {
      this.persist('evaluator-registration-firebase-uid', this.userDetails.firebase_uid);
      this.persist('evaluator-registration-email-address', this.userDetails.email_address);
      this.persist('evaluator-registration-email-verified', this.userDetails.emailVerified);
      this.persist('evaluator-registration-is-evaluator', this.userDetails.is_evaluator);
      this.persist('evaluator-registration-first-name', this.userDetails.first_name);
      this.persist('evaluator-registration-last-name', this.userDetails.last_name);
    }

    this.createForm();
  }

  createForm() {
    const firstName = this._localStorageService.get('evaluator-registration-first-name');
    const middleName = this._localStorageService.get('evaluator-registration-middle-name');
    const lastName = this._localStorageService.get('evaluator-registration-last-name');
    const suffixName = this._localStorageService.get('evaluator-registration-suffix-name');
    const birthDate = this._localStorageService.get('evaluator-registration-birth-date');
    const gender = this._localStorageService.get('evaluator-registration-gender');
    const maritalStatus = this._localStorageService.get('evaluator-registration-marital-status');
    const homeAddress = this._localStorageService.get('evaluator-registration-home-address');
    const barangay = this._localStorageService.get('evaluator-registration-barangay');
    
    this._evaluatorPersonalInfoForm = this._fb.group({
      first_name:[firstName, Validators.required],
      middle_name:[middleName],
      last_name: [lastName, Validators.required],
      suffix_name:[suffixName],
      birthdate:[birthDate, Validators.required],
      gender:[gender, Validators.required],
      marital_status:[maritalStatus, Validators.required],
      home_address: [homeAddress, Validators.required ],
      barangay: [barangay, Validators.required ],
    });
  }

  onSubmit() {
    if (this._evaluatorPersonalInfoForm.valid){
      this._router.navigateByUrl("evaluator/registration/employee-info");
    }
  }

  filter(value: string): Barangay[] {
    const filterValue = value.toLowerCase();
    return this.barangay.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  persist(key: string, value: any) {
    this._localStorageService.set(key, value);
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
