import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, Params } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  EmailValidator,
} from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { FormValidatorService } from '../../core/services/form-validator.service';
import { User } from '../../core/models/user.model';
import { RegisterAccountFormService, SnackBarService, UserService } from '../../core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public fireBaseUser: any;
  public fireBaseUid: any;
  public hide: boolean = true;
  public userDetails;
  private user;
  _signupForm: FormGroup;
  _submitted = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    public _fb: FormBuilder,
    private _formValidator: FormValidatorService,
    private _afs: AngularFirestore,
    private _registerAccountFormService: RegisterAccountFormService,
    private _ngZone: NgZone,
    private _snackBarService: SnackBarService,
    private _userService: UserService,
  ) {
    this.createForm();
  }

  createForm() {
    this._signupForm = this._fb.group(
      {
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            this._formValidator.patternValidator(),
          ]),
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this._formValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  tryRegister(value) {
    this._submitted = true;

    if (this._signupForm.valid) {
      this._registerAccountFormService
        .checkIfEmailRegistered(value.email)
        .then((res) => {
          if (res.length > 0) {
            this._signupForm.controls.email.setErrors({
              emailAlreadyUsed: true,
            });
          } else {
            this._registerAccountFormService.setRegisterAccountInfo(value);

            this._router.navigateByUrl('registration');
          }
        });
    }
  }

   tryGoogle() {
    //this.isSubmitting = true;
    this._authService
      .GoogleAuth()
      .then((result) => {
        this._ngZone.run(() => {

          this.user = {
            uid: result.user.uid,
            emailVerified: result.user.emailVerified,
            email: result.user.email,
            status: 'incomplete',
          };

          if (result.additionalUserInfo.isNewUser != true) {
            this.SetUserDataFire(this.user.uid, this.user.emailVerified);
            //this._authService.getToken(result.user.uid);
            this._authService.getToken(this.user.uid).subscribe(
              (result) => {
                if (this.user.emailVerified) {
                  this.SetUserDataFire(this.user.uid, this.user.emailVerified);
                  const token = result.data.token;
                  this._authService.saveToken(token);
                  this._userService
                    .getUserInfo(this.user.uid)
                    .subscribe((data) => {
                      this._authService.currentUserSubject.next(data);
                      this._router.navigate(['dashboard/home']);
                    });
                 // this.isSubmitting = false;
                }
              },
              (err) => {
                //this.isSubmitting = false;
                let errorMessage = err.error.message;
                console.log(errorMessage);
                if (errorMessage == 'User Not Found.') {
                  this._snackBarService.open(
                    'Please complete your registration',
                    'close'
                  );
                  this._registerAccountFormService.setRegisterAccountInfo(
                    this.user
                  );
                  this._router.navigate(['registration']);
                }
              }
            );
           // this.isSubmitting = false;
          } else {
            const user = result.additionalUserInfo.profile;
            this.fireBaseUid = result.user;
            this.fireBaseUser = user;
            this.SetUserDataFireGoogle(this.fireBaseUser);
            //this.createUserDetailsGoogle(this.fireBaseUser);
            this._registerAccountFormService.setRegisterAccountInfo(
              this.userDetails
            );
           // this.isSubmitting = false;
            this._router.navigateByUrl('registration');
          }
        });
      })
      .catch((error) => {
        this._snackBarService.open(error, 'close');
        //this.isSubmitting = false;
      });
  }

  ngOnInit(): void {
    this.createForm();
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
    const userData = {
      uid: this.fireBaseUid.uid,
      email: user.email,
      first_name: user.given_name,
      last_name: user.family_name,
      emailVerified: user.verified_email,
      is_evaluator: false,
      provider: 'google',
    };

    this.userDetails = userData

    return userRef.set(userData, {
      merge: true,
    });
  }

  // createUserDetailsGoogle(user) {
  //   this.userDetails = {
  //     uid: this.fireBaseUid.uid,
  //     first_name: user.given_name,
  //     last_name: user.family_name,
  //     email: user.email,
  //     is_evaluator: false,
  //     emailVerified: user.verified_email,
  //     provider: 'google',
  //   };
  // }

  get signupFormControl() {
    return this._signupForm.controls;
  }
}
