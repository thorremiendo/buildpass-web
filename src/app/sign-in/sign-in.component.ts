import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../core/services/auth.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public hide: boolean = true;
  public user;
  _submitted: boolean =false;
  _signinForm: FormGroup;

  

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _ngZone: NgZone,

  ) {
    this.createForm();
  }

  createForm() {
    this._signinForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryLogin(value) {
    this._submitted = true;
    if (this._signinForm.valid) {
      this._authService.SignIn(value)
        .then((result) => {
          console.log(result);
          this._authService.currentUserSubject.next(result);
          this._ngZone.run(() => {
            if (result.user.emailVerified == true) {
              this._router.navigate(['dashboard']);
            }
            else {
              window.alert("Email not yet verified");
            }

          });
          // this.SetUserData(result.user);
        })
        .catch((error) => {
          console.log(error.message);
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
          this._router.navigate(['dashboard']);
        }
        else {
          this._router.navigateByUrl('registration/personal-info');
        }

      });
      // this.SetUserData(result.user);
    })
    .catch((error) => {
      console.log(error.message);
      window.alert(error.message);
    });
  }


  ngOnInit(): void {

  }

}
