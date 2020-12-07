import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterAccountEvaluatorFormService } from '../../core/services/register-account-evaluator-form.service';
import { Router } from '@angular/router';
import { BarangayService } from '../../core/services/barangay.service'
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-evaluator-personal-info',
  templateUrl: './evaluator-personal-info.component.html',
  styleUrls: ['./evaluator-personal-info.component.scss']
})
export class EvaluatorPersonalInfoComponent implements OnInit {
  public userDetails;
  public maxLength: number = 11;
  public barangay: Barangay[];

  _evaluatorPersonalInfoForm: FormGroup;
  _submitted = false;

  _filteredBarangayOptions: Observable<Barangay[]>;


  get evaluatorPersonalInfoFormControl() {
    return this._evaluatorPersonalInfoForm.controls;
  }


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _barangayService: BarangayService,
    private _registerAccountEvaluatorFormService: RegisterAccountEvaluatorFormService,

  ) {
    this.createForm();
    this._barangayService.getBarangayInfo().subscribe(data=>{
      this.barangay = data; 

      this._filteredBarangayOptions = this.evaluatorPersonalInfoFormControl.barangay.valueChanges
      .pipe(
        startWith(''),
        map(barangay => barangay ? this._filter(barangay) : this.barangay.slice())
      );

    });
   }

  createForm() {
    this._evaluatorPersonalInfoForm = this._fb.group({
      first_name:['', Validators.required],
      middle_name:[''],
      last_name: ['', Validators.required],
      suffix_name:[''],
      birthdate:['', Validators.required],
      gender:['', Validators.required],
      marital_status:['', Validators.required],
      home_address: ['', Validators.required ],
      barangay: ['', Validators.required ],
      
      
    },
    );
  }

  createUserDetails(){

    this.userDetails ={
      "first_name": this._evaluatorPersonalInfoForm.value.first_name,
      "middle_name":this._evaluatorPersonalInfoForm.value.middle_name,
      "last_name":  this._evaluatorPersonalInfoForm.value.last_name,
      "suffix_name":this._evaluatorPersonalInfoForm.value.suffix_name,
      "birthdate": this._evaluatorPersonalInfoForm.value.birthdate,
      "gender": this._evaluatorPersonalInfoForm.value.gender,
      "marital_status": this._evaluatorPersonalInfoForm.value.marital_status,

      "home_address": this._evaluatorPersonalInfoForm.value.home_address,
      "barangay":this._evaluatorPersonalInfoForm.value.barangay,

    }
  
  }

  dateToString(){
    if(this._evaluatorPersonalInfoForm.value.birthdate != null){
      let dd = this._evaluatorPersonalInfoForm.value.birthdate.getDate();
      let mm = this._evaluatorPersonalInfoForm.value.birthdate.getMonth() + 1;
      let yyyy = this._evaluatorPersonalInfoForm.value.birthdate.getFullYear();
      let birthdateString = (`${yyyy}-${mm}-${dd}`);
      this._evaluatorPersonalInfoForm.value.birthdate = birthdateString;
      console.log(birthdateString);
    }

  }

  onSubmit(){
    this._submitted = true;
    this.dateToString();
    if (this._evaluatorPersonalInfoForm.valid){
      this.createUserDetails();
      this._registerAccountEvaluatorFormService.setRegisterAccountInfo(this.userDetails);
      this._router.navigateByUrl("evaluator/registration/employee-info");
      
      console.log(this.userDetails);

    
    }
  

  }

  private _filter(value: string): Barangay[] {
    const filterValue = value.toLowerCase();

    return this.barangay.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  
  ngOnInit(): void {
    this._registerAccountEvaluatorFormService.cast.subscribe(registerAccountEvaluatorSubject => this.userDetails = registerAccountEvaluatorSubject)
    this.createForm();
    this._evaluatorPersonalInfoForm.patchValue({
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
