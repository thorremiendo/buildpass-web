import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../core/services/auth.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/firestore';

const googleLogoURL = 
"https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";


@Component({
  selector: 'app-evaluator-sign-in',
  templateUrl: './evaluator-sign-in.component.html',
  styleUrls: ['./evaluator-sign-in.component.scss']
})


export class EvaluatorSignInComponent implements OnInit {

  public hide: boolean = true;
  public user;
  _submitted: boolean =false;
  _evaluatorSignInForm: FormGroup;

  

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _ngZone: NgZone,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private _afs: AngularFirestore,

  ) {
    this.matIconRegistry.addSvgIcon("logo",
    this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    
    this.createForm();
  }

  createForm() {
    this._evaluatorSignInForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryLogin(value) {
    this._submitted = true;
    if (this._evaluatorSignInForm.valid) {
      this._authService.SignIn(value)
        .then((result) => {
          this._authService.getFireBaseData(result.user.uid).subscribe(result =>{ // eto yung retrive ng data from firebase
            const user = result.data();
            console.log(user)
            console.log(user.uid);
          })
            
          console.log(result);
          this._authService.currentUserSubject.next(result);
          this._ngZone.run(() => {
            if (result.user.emailVerified == true ) {
              this.SetUserDataFire(result.user.uid,result.user.emailVerified);
              this._router.navigateByUrl('/evaluator/home/table');
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
          this.SetUserDataFire(result.user.uid,result.user.emailVerified);
          this._router.navigateByUrl('/evaluator');
          
        }
        else {
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

  SetUserDataFire(user, emailVerified ) {
    const userRef: AngularFirestoreDocument<any> = this._afs.doc(
      `users/${user}`);

    console.log(user)
    const userData = {
     emailVerified: emailVerified,
     
    };
    return userRef.set(userData, {
      merge: true,
    });

  }

  signUp(){
    this._router.navigateByUrl("/evaluator/sign-up")
  }


  ngOnInit(): void {
    this.createForm();

  }

}
