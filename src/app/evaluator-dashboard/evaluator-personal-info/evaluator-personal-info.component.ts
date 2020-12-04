import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterAccountEvaluatorFormService } from '../../core/services/register-account-evaluator-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluator-personal-info',
  templateUrl: './evaluator-personal-info.component.html',
  styleUrls: ['./evaluator-personal-info.component.scss']
})
export class EvaluatorPersonalInfoComponent implements OnInit {
  public userDetails;
  public maxLength: number = 11;

  _evaluatorPersonalInfoForm: FormGroup;
  _submitted = false;


  get evaluatorPersonalInfoFormControl() {
    return this._evaluatorPersonalInfoForm.controls;
  }


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _registerAccountEvaluatorFormService: RegisterAccountEvaluatorFormService,

  ) {
    this.createForm();
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
