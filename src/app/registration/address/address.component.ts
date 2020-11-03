import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterAccountFormService} from '../../core/services/register-account-form.service';
import { Router } from '@angular/router';
import { AuthService} from '../../core/services/auth.service'
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  public maxLength = 11;

  _addressForm: FormGroup;
  _submitted =  false;

  public userDetails;
  public updatedUserDetails;

  get addressFormControl() {
    return this._addressForm.controls;
  }


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _registerAccountFormService: RegisterAccountFormService,

    
  ) {
    this.createForm();
   }

  createForm() {
    this._addressForm = this._fb.group({
      home_address: ['', Validators.required ],
      barangay: ['', Validators.required ],
      contact_number:['', [Validators.required, Validators.maxLength(11),]],
    },
    );
  }

  createUserDetails(){

    this.userDetails ={
      // "first_name": this.userDetails.value.first_name,
      // "middle_name":this.userDetails.value.middle_name,
      // "last_name":  this.userDetails.value.last_name,
      // "suffix_name":this.userDetails.value.suffix_name,
      // "birthdate": this.userDetails.value.birthdate,
      // "gender": this.userDetails.value.gender,
      // "nationality": this.userDetails.value.nationality,
      // "marital_status": this.userDetails.value.marital_status,

      "home_address": this._addressForm.value.home_address,
      "banangay":this._addressForm.value.home_address,
      "comntact_number":  this._addressForm.value.home_address,
     

    }
  
  }

  onSubmit(){
    this._submitted = true;
    if(this._addressForm.valid){
      this.createUserDetails();
      this._registerAccountFormService.setRegisterAccountInfo(this.userDetails);
      this._authService.SendVerificationMail();
      //this._router.navigateByUrl("/test");
      console.log(this._addressForm.value);
    }
  }

  ngOnInit(): void {
    this._registerAccountFormService.cast.subscribe(registerAccountSubject => this.userDetails = registerAccountSubject);
    console.log(this.userDetails);
    this.createForm();
    
  }
}





