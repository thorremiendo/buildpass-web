import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService} from '../../core/services/auth.service'
import { Router } from '@angular/router';
import { RegisterAccountFormService } from 'src/app/core/services/register-account-form.service';
import { BarangayService } from '../../core/services/barangay.service'

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';



@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  public userDetails;
  public maxLength: number = 11;
  public barangay: Barangay[];

  _personalInfoForm: FormGroup;
  _submitted = false;

  _filteredBarangayOptions: Observable<Barangay[]>;
 //_barangay_options:string[] = Object.keys(this.barangay).map(key => this.barangay[key]).filter(k => !(parseInt(k) >= 0));


  get personalInfoFormControl() {
    return this._personalInfoForm.controls;
  }


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _barangayService: BarangayService,
    private _registerAccountFormService: RegisterAccountFormService,

  ) {
    this.createForm();
    this._barangayService.getBarangayInfo().subscribe(data=>{
      this.barangay = data; 

      this._filteredBarangayOptions = this.personalInfoFormControl.barangay.valueChanges
      .pipe(
        startWith(''),
        map(barangay => barangay ? this._filter(barangay) : this.barangay.slice())
      );

    });
   
   }

  createForm() {
    this._personalInfoForm = this._fb.group({
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
      
    },
    );
  }

  createUserDetails(){

    this.userDetails ={
      "first_name": this._personalInfoForm.value.first_name,
      "middle_name":this._personalInfoForm.value.middle_name,
      "last_name":  this._personalInfoForm.value.last_name,
      "suffix_name":this._personalInfoForm.value.suffix_name,
      "birthdate": this._personalInfoForm.value.birthdate,
      "gender": this._personalInfoForm.value.gender,
      "nationality": this._personalInfoForm.value.nationality,
      "marital_status": this._personalInfoForm.value.marital_status,

      "home_address": this._personalInfoForm.value.home_address,
      "barangay":this._personalInfoForm.value.barangay,
      "mobile_no":  this._personalInfoForm.value.contact_number,
      

    }
  
  }

  dateToString(){
    if(this._personalInfoForm.value.birthdate != null){
      let dd = this._personalInfoForm.value.birthdate.getDate();
      let mm = this._personalInfoForm.value.birthdate.getMonth();
      let yyyy = this._personalInfoForm.value.birthdate.getFullYear();
      let birthdateString = (`${yyyy}-${mm}-${dd}`);
      this._personalInfoForm.value.birthdate = birthdateString;
      console.log(birthdateString);
    }

  }

  onSubmit(){
    this._submitted = true;
    this.dateToString();
    if (this._personalInfoForm.valid){
      this.createUserDetails();
      this._registerAccountFormService.setRegisterAccountInfo(this.userDetails);
      this._router.navigateByUrl("/registration/identification-info")
      
      console.log(this.userDetails);

    }
   
  }

  private _filter(value: string): Barangay[] {
    const filterValue = value.toLowerCase();

    return this.barangay.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  ngOnInit(): void {
    this._registerAccountFormService.cast.subscribe(registerAccountSubject => this.userDetails = registerAccountSubject)
    this.createForm();
    this._personalInfoForm.patchValue({
      first_name: this.userDetails.first_name,
      last_name: this.userDetails.last_name,
      email_address: this.userDetails.email_address

    });
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
