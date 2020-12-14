import firebase from 'firebase/app';
import { Injectable, NgZone } from '@angular/core';
//import { User } from '../models/user.model';
//import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { UserService } from './user.service';


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
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.updateUserInfo(user)
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.isAuthenticatedSubject.next(true)
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
        this.isAuthenticatedSubject.next(false)

      }
    });
  }

  updateUserInfo(user) {
    this.userService.getUserInfo(user.uid).subscribe((data) => {
      this.userService.setUserInfo(data);
      console.log('get user from api' + data);
    });
  }

  SignIn(value) {
    return new Promise<any>((resolve, reject) => { firebase.auth()
      .signInWithEmailAndPassword(value.email, value.password)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        window.alert(error.message);
      });
    })
  }



  // Sign up with email/password
  SignUp(value) {
    return new Promise<any>((resolve, reject) => { firebase.auth()
      .createUserWithEmailAndPassword(value.email, value.password)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        window.alert(error.message);
      });
    })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return firebase.auth().currentUser.sendEmailVerification().then(() => {
      this.router.navigate(['verify-email']);
    });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return firebase.auth()
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
  get isEvaluator(): boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return user.is_evaluator !== false? true:false;
  }

  // Sign in with Google
  GoogleAuth() {
   
    return new Promise<any>((resolve, reject) =>{ 
      
      this.AuthLogin(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        window.alert(error.message);
      });
    })
    
  }

 
  // Auth logic to run auth providers
  AuthLogin(provider) {
    return new Promise<any>((resolve, reject) =>{
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email'); 
      firebase.auth()
      .signInWithPopup(provider)
       .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        window.alert(error.message);
      });
    })
  }


  getFireBaseData(uid){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`)
    return userRef.get()
    

  }



 

  

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  // SetUserData(user) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `users/${user.uid}`
  //   );
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     emailVerified: user.emailVerified,
  //     is_evaluator: user.is_evaluator,
  //   };
  //   return userRef.set(userData, {
  //     merge: true,
  //   });

    
  // }


  // Sign out
  SignOut() {
    return firebase.auth().signOut().then(() => {
      localStorage.removeItem('user');
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['']);
    });
  }
}
