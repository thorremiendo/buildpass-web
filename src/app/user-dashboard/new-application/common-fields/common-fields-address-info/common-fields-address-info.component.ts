import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { RegisterAccountFormService } from 'src/app/core/services/register-account-form.service';


@Component({
  selector: 'app-common-fields-address-info',
  templateUrl: './common-fields-address-info.component.html',
  styleUrls: ['./common-fields-address-info.component.scss']
})
export class CommonFieldsAddressInfoComponent implements OnInit {

  public userDetails;
  public maxLength: number = 11;

  _addressInfoFormCommonFields: FormGroup;
  _submitted = false;


  get addressInfoFormCommonFieldControl() {
    return this._addressInfoFormCommonFields.controls;
  }


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _registerAccountFormService: RegisterAccountFormService,
    private _commonFieldsFormService: NewApplicationFormService,

  ) {
    this.createForm();
   }

  createForm() {
    this._addressInfoFormCommonFields = this._fb.group({
      no: ['',Validators.required],
      street: ['', Validators.required],
      barangay: ['',Validators.required],
      municipality: ['', Validators.required],
      province: ['', Validators.required],
      zipcode: ['', Validators.required],

      
    },
    );
  }

  createUserDetails(){

    this.userDetails ={
      "no": this._addressInfoFormCommonFields.value.no,
      "street": this._addressInfoFormCommonFields.value.street,
      "barangay": this._addressInfoFormCommonFields.value.barangay,
      "municipality": this._addressInfoFormCommonFields.value.municipality,
      "province": this._addressInfoFormCommonFields.value.province,
      "zipcode": this._addressInfoFormCommonFields.value.province,
     
    }
  
  }

  

  onSubmit(){
    this._submitted = true;
    
    if (this._addressInfoFormCommonFields.valid){
 
      this.createUserDetails();
      this._commonFieldsFormService.setCommonFields(this.userDetails);
      console.log(this.userDetails);
      this._router.navigateByUrl("dashboard/new/initial-forms/zoning-clearance")
    }
   
  }
 


  
  ngOnInit(): void {
    this._registerAccountFormService.cast.subscribe(registerAccountSubject => this.userDetails = registerAccountSubject)
    this.createForm();
    console.log(this.userDetails);

    
  }

}
