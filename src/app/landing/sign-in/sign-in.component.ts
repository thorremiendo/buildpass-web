import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { RegisterAccountFormService, User } from '../../core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public hide: boolean = true;
  public fireBaseUser: any;
  public fireBaseUid: any;
  public _signinForm: FormGroup;
  public user;
  public _submitted: boolean = false;
  public userDetails;
  public isSubmitting: boolean = false;

  

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route :ActivatedRoute,
    private _fb: FormBuilder,
    private _ngZone: NgZone,
    private _afs: AngularFirestore,
    private _registerAccountFormService: RegisterAccountFormService
    
  ) {
    this.createForm();
  }

  get signinFormControl() {
    return this._signinForm.controls;
  }

  createForm() {
    this._signinForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  tryLogin(value) {
    if (this._signinForm.valid) {
      this.isSubmitting = true;
      this._authService
        .SignIn(value)
        .then((result) => {
          if (result.user.emailVerified == true) {
            this.SetUserDataFire(result.user.uid, result.user.emailVerified);
            this._authService.getToken(result.user.uid);
            this.isSubmitting = false;
          } else {
            window.alert('Email not yet verified');
            this.isSubmitting = false;
          }
        })
        .catch((error) => {
          this.isSubmitting = false;
         
        });
    }
  }

  tryGoogle() {
    this.isSubmitting = true;
    this._authService
      .GoogleAuth()
      .then((result) => {
        this._ngZone.run(() => {
          if (result.additionalUserInfo.isNewUser != true) {
            this.SetUserDataFire(result.user.uid, result.user.emailVerified);
            this._authService.getToken(result.user.uid);
            this.isSubmitting = false;
          } else {
            const user = result.additionalUserInfo.profile;
            this.fireBaseUid = result.user;
            this.fireBaseUser = user;
            this.SetUserDataFireGoogle(this.fireBaseUser);
            this.createUserDetailsGoogle(this.fireBaseUser);
            this._registerAccountFormService.setRegisterAccountInfo(
              this.userDetails
            );
            this.isSubmitting = false;
            this._router.navigateByUrl('registration');
          }
        });
      })
      .catch((error) => {
        this.isSubmitting = false;
        
      });
  }

  SetUserDataFire(user, emailVerified) {
    const userRef: AngularFirestoreDocument<any> = this._afs.doc(
      `users/${user}`
    );

    const userData = {
      emailVerified: emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SetUserDataFireGoogle(user) {
    const userRef: AngularFirestoreDocument<any> = this._afs.doc(
      `users/${this.fireBaseUid.uid}`
    );
    const userData: User = {
      firebase_uid: this.fireBaseUid.uid,
      email: user.email,
      first_name: user.given_name,
      last_name: user.family_name,
      emailVerified: user.verified_email,
      is_evaluator: false,
      provider:'google'
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  createUserDetails(value) {
    this.userDetails = {
      firebase_uid: this.fireBaseUser.uid,
      first_name: value.first_name,
      last_name: value.last_name,
      email_address: value.email,
      is_evaluator: false,
      emailVerified: this.fireBaseUser.emailVerified,
    };
  }

  createUserDetailsGoogle(user) {
    this.userDetails = {
      firebase_uid: this.fireBaseUid.uid,
      first_name: user.given_name,
      last_name: user.family_name,
      email: user.email,
      is_evaluator: false,
      emailVerified: user.verified_email,
      provider: 'google',
    };
  }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe(queryParams => {
      //var lang = queryParams.get('lang');
      var mode =   queryParams.get('mode');
      var actionCode = queryParams.get('oobCode');
      
      switch (mode) {
        case 'resetPassword':
          this._authService.handleResetPassword(actionCode);
          break;
        case 'verifyEmail':
          this._authService.handleVerifyEmail(actionCode);
          break;
        default:

      }
    });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
  }
}
