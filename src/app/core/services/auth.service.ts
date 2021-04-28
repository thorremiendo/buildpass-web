import firebase from 'firebase/app';
import { Injectable, NgZone } from '@angular/core';
import { JwtService } from './jwt.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { ApiService } from '../services/api.service';
import * as LogRocket from "logrocket";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  public currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public userService: UserService,
    public jwtService: JwtService,
    public apiService: ApiService
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.currentUser.subscribe((user) => {
      if (user) {
        console.log("this"+user.first_name);
        localStorage.setItem('user', JSON.stringify(user));
        this.isAuthenticatedSubject.next(true);
        LogRocket.identify('bblmhh/buildpass-staging', {
          name: `${user.first_name} ${user.middle_name} ${user.last_name} `,
          email: `${user.email_address}`,
        
          // Add your own custom user variables here, ie:
        
        });
      }
    });
  }

  saveToken(token: string) {
    this.jwtService.saveToken(token);
  }

  purgeAuth() {
    this.jwtService.removeToken();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
  }

  updateUserInfo(user) {
    this.userService.getUserInfo(user.uid).subscribe((data) => {
      this.userService.setUserInfo(data);
    });
  }

  SignIn(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          window.alert(error.message);
        });
    });
  }

  // Sign up with email/password
  SignUp(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          window.alert(error.message);
        });
    });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return firebase
      .auth()
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }
  get isEvaluator(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.is_evaluator !== false ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return new Promise<any>((resolve, reject) => {
      this.AuthLogin(new firebase.auth.GoogleAuthProvider())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          window.alert(error.message);
        });
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          window.alert(error.message);
        });
    });
  }

  getFireBaseData(uid) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    return userRef.get();
  }

  getToken(uid) {
    const url = `/auth/firebase/login`;
    const body = {
      firebase_uid: `${uid}`,
    };

    return this.apiService.post(url, body).subscribe((res) => {
      const token = res.data.token;
      this.jwtService.saveToken(token);
      this.userService.getUserInfo(uid).subscribe((data) => {
        this.currentUserSubject.next(data);
        this.router.navigate(['dashboard/home']);
      });
    });
  }

  userSignOut() {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('app_id');
        localStorage.removeItem('applicationDetails');
        this.jwtService.removeToken();
        this.isAuthenticatedSubject.next(false);
        this.router.navigateByUrl('/user/sign-in');
      });
  }
  evaluatorSignOut() {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('app_id');
        localStorage.removeItem('applicationDetails');
        this.jwtService.removeToken();
        this.isAuthenticatedSubject.next(false);
        this.router.navigateByUrl('/evaluator/sign-in');
      });
  }
}
