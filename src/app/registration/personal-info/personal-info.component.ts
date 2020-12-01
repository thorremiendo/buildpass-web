import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterAccountFormService} from '../../core/services/register-account-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  public userDetails;

  _personalInfoForm: FormGroup;
  _submitted = false;

  get personalInfoFormcControl() {
    return this._personalInfoForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _registerAccountFormService: RegisterAccountFormService,
  ) {
    this.createForm();
  }

  createForm() {
    this._personalInfoForm = this._fb.group({
      first_name:['', Validators.required],
      middle_name:[''],
      last_name: ['', Validators.required],
      suffix_name:[''],
      birthdate:['', Validators.required],
      gender:['', Validators.required],
      nationality:['', Validators.required],
      marital_status:['', Validators.required]
    });
  }

  createUserDetails(){
    this.userDetails = {
      "first_name": this._personalInfoForm.value.first_name,
      "middle_name":this._personalInfoForm.value.middle_name,
      "last_name":  this._personalInfoForm.value.last_name,
      "suffix_name":this._personalInfoForm.value.suffix_name,
      "birthdate": this._personalInfoForm.value.birthdate,
      "gender": this._personalInfoForm.value.gender,
      "nationality": this._personalInfoForm.value.nationality,
      "marital_status": this._personalInfoForm.value.marital_status,
    }
  }

  dateToString(){
    if(this._personalInfoForm.value.birthdate != null){
      let dd = this._personalInfoForm.value.birthdate.getDate();
      let mm = this._personalInfoForm.value.birthdate.getMonth();
      let yyyy = this._personalInfoForm.value.birthdate.getFullYear();
      let birthdateString = (`${yyyy}-${mm}-${dd}`);
      this._personalInfoForm.value.birthdate = birthdateString;
    }
  }

  onSubmit(){
    this._submitted = true;
    this.dateToString();
    if (this._personalInfoForm.valid){
      this.createUserDetails();
      this._registerAccountFormService.setRegisterAccountInfo(this.userDetails);
      this._router.navigateByUrl("registration/address");
    }
  }
  
  ngOnInit(): void {
    this._registerAccountFormService.cast.subscribe(registerAccountSubject => this.userDetails = registerAccountSubject)
    this.createForm();
  }
}
