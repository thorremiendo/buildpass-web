import { Component, OnInit } from '@angular/core';
import { RegisterAccountEvaluatorFormService } from '../../core/services/register-account-evaluator-form.service';
import { Router } from '@angular/router';
import { AuthService} from '../../core/services/auth.service'
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/firestore';

@Component({
  selector: 'app-evaluators-summary',
  templateUrl: './evaluators-summary.component.html',
  styleUrls: ['./evaluators-summary.component.scss']
})
export class EvaluatorsSummaryComponent implements OnInit {
  public userDetails;

  constructor(
    private _route: Router,
    private _afs: AngularFirestore,
    private _authService: AuthService,
    private _registerAccountEvaluatorFormService: RegisterAccountEvaluatorFormService,
  ) { }

  onSubmit(){
    console.log(this.userDetails)
    this.SetUserDataFire();
    this._authService.SendVerificationMail();

  }

  SetUserDataFire() {
    const userRef: AngularFirestoreDocument<any> = this._afs.doc(
      `users/${this.userDetails.uid}`
    );
    const userData = {
     department: this.userDetails.department,
     position: this.userDetails.position,
    };
    return userRef.set(userData, {
      merge: true,
    });

    
  }

  ngOnInit(): void {
    this._registerAccountEvaluatorFormService.cast.subscribe(registerAccountEvaluatorSubject => this.userDetails = registerAccountEvaluatorSubject)
   
  }

}
