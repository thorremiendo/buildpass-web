import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { UserService } from '../../core/services/user.service';
import { FeedService} from '../../core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public hide: boolean = true;
  public user;
  _submitted: boolean = false;
  _signinForm: FormGroup;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _ngZone: NgZone,
    private _afs: AngularFirestore,
    private _userService: UserService,
    private _feedService: FeedService,
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
          //console.log(result);
          this._authService.currentUserSubject.next(result);
          this._ngZone.run(() => {
            if (result.user.emailVerified == true) {
              this.SetUserDataFire(result.user.uid, result.user.emailVerified);
              this._userService
                .getUserInfo(result.user.uid)
                .subscribe((data) => {
                  this._userService.setUserInfo(data);
                  console.log('Result data' + data);
                  this._router.navigate(['dashboard']);
                  this._feedService.checkUser();
                });
             
            } else {
              window.alert('Email not yet verified');
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
    this._authService
      .GoogleAuth()
      .then((result) => {
        //console.log(result);
        this._authService.currentUserSubject.next(result);
        this._ngZone.run(() => {
          if (result.additionalUserInfo.isNewUser != true) {
            this.SetUserDataFire(result.user.uid, result.user.emailVerified);
            this._userService.getUserInfo(result.user.uid).subscribe((data) => {
              this._userService.setUserInfo(data);
            });
            this._router.navigate(['dashboard']);
          } else {
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

  SetUserDataFire(user, emailVerified) {
    const userRef: AngularFirestoreDocument<any> = this._afs.doc(
      `users/${user}`
    );

    console.log(user);
    const userData = {
      emailVerified: emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('currentUser');
  }
}
