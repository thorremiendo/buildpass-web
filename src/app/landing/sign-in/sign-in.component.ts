import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { UserService } from '../../core/services/user.service';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public hide: boolean = true;
  public _signinForm: FormGroup;
  public user;
  private _submitted: boolean = false;
 

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _fb: FormBuilder,
    private _ngZone: NgZone,
    private _afs: AngularFirestore,
    private _userService: UserService,
   
    
  ) {
    this.createForm();
  }

  createForm() {
    this._signinForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  tryLogin(value) {
    this._submitted = true;
    if (this._signinForm.valid) {
      this._authService
        .SignIn(value)
        .then((result) => {
          if (result.user.emailVerified == true) {
            this.SetUserDataFire(result.user.uid, result.user.emailVerified);
            this._authService.getToken(result.user.uid)
            } else {
              window.alert('Email not yet verified');
            }
        })
        .catch((error) => {
          window.alert(error.message);
        });
    }
  }

  tryGoogle() {
    this._authService
      .GoogleAuth()
      .then((result) => {
        this._authService.currentUserSubject.next(result);
        this._ngZone.run(() => {
          if (result.additionalUserInfo.isNewUser != true) {
            this.SetUserDataFire(result.user.uid, result.user.emailVerified);
            this._authService.getToken(result.user.uid)
            this._router.navigate(['dashboard']);
          } else {
            this._router.navigateByUrl('registration/personal-info');
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
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

  ngOnInit(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
  }
}