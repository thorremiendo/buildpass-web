import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../core/services/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/firestore';
import { FormValidatorService } from '../../core/services/form-validator.service'
import { User } from '../../core/models/user.model';
import { RegisterAccountEvaluatorFormService } from '../../core/services/register-account-evaluator-form.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

const googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";



@Component({
  selector: 'app-evaluator-sign-up',
  templateUrl: './evaluator-sign-up.component.html',
  styleUrls: ['./evaluator-sign-up.component.scss']
})
export class EvaluatorSignUpComponent implements OnInit {

  public fireBaseUser: any;
  public fireBaseUid: any;
  public hide:boolean = true;
  public userDetails;

  _evaluatorSignOutForm: FormGroup;
  _submitted = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    public _fb: FormBuilder,
    private _formValidator: FormValidatorService,
    private _afs: AngularFirestore,
    private _registerAccountEvaluatorFormService : RegisterAccountEvaluatorFormService ,
    private _ngZone: NgZone,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer

  ) {
    this.matIconRegistry.addSvgIcon("logo",
    this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    
    this.createForm();
  }

   createForm() {
    this._evaluatorSignOutForm = this._fb.group({
      first_name: ['', Validators.required ],
      last_name: ['', Validators.required ],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, this._formValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: this._formValidator.MatchPassword('password', 'confirmPassword'),
    }
    );
  }

  tryRegister(value){
    this._submitted = true;

    if (this._evaluatorSignOutForm.valid)
    {
          this._authService.SignUp(value)
          .then(result => {
            console.log(result);

            const user = result.user;
            this.fireBaseUser = user;

            this.SetUserDataFire(value);
            this.createUserDetails(value);
            this._registerAccountEvaluatorFormService.setRegisterAccountInfo(this.userDetails);
            this._router.navigateByUrl('/evaluator/registration/personal-info');
      }) 
          .catch((error) => {
            window.alert(error.message);
      });
    
  }

  }

  tryGoogle() {
    this._authService.GoogleAuth()
    .then((result) => {
      console.log(result);
      this._authService.currentUserSubject.next(result);
      this._ngZone.run(() => {

        if (result.additionalUserInfo.isNewUser != true) {
          this._router.navigateByUrl('/evaluators');
        
        }
        else {
          const user = result.additionalUserInfo.profile;
          this.fireBaseUid = result.user;
          this.fireBaseUser = user;
        
          this.SetUserDataFireGoogle(this.fireBaseUser);
          this.createUserDetailsGoogle(this.fireBaseUser);
          this._registerAccountEvaluatorFormService.setRegisterAccountInfo(this.userDetails);
          this._router.navigateByUrl('/evaluator/registration/personal-info');
        }
        
      });
      // this.SetUserData(result.user);
    })
    .catch((error) => {
      console.log(error.message);
      window.alert(error.message);
    });
  }

  signIn(){
    this._router.navigateByUrl("/evaluator/sign-in")
  }

  ngOnInit(): void {
    this.createForm();
  }

  SetUserDataFire(value) {
    const userRef: AngularFirestoreDocument<any> = this._afs.doc(
      `users/${this.fireBaseUser.uid}`
    );
    const userData: User = {
      uid: this.fireBaseUser.uid,
      email: value.email,
      first_name: value.first_name,
      last_name: value.last_name,
      emailVerified: this.fireBaseUser.emailVerified,
      is_evaluator: true,
    };
    return userRef.set(userData, {
      merge: true,
    });

    
  }

  createUserDetails(value){
  
    this.userDetails ={
      "uid": this.fireBaseUser.uid,
      "first_name": value.first_name,
      "last_name":  value.last_name,
      "email": value.email,
      "is_evaluator": true,
      "emailVerified": this.fireBaseUser.emailVerified
    };


  }

  SetUserDataFireGoogle(user) {
    const userRef: AngularFirestoreDocument<any> = this._afs.doc(`users/${user.uid}`
    );
    const userData: User = {
      uid: this.fireBaseUid.uid,
      email: user.email,
      first_name: user.given_name,
      last_name: user.family_name,
      emailVerified: user.verified_email,
      is_evaluator: true,
    };
    return userRef.set(userData, {
      merge: true,
    });

    
  }

  createUserDetailsGoogle(user){
  
    this.userDetails ={
      "uid": this.fireBaseUid.uid,
      "first_name": user.given_name,
      "last_name":  user.family_name,
      "email": user.email,
      "is_evaluator": true,
      "emailVerified": user.verified_email,
    };


  }



  get signupFormControl() {
    return this._evaluatorSignOutForm.controls;
  }
  

  


}
