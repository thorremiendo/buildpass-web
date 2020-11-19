import { Component, OnInit } from '@angular/core';
import { RegisterAccountEvaluatorFormService } from '../../core/services/register-account-evaluator-form.service';
import { Router } from '@angular/router';
import { AuthService} from '../../core/services/auth.service'

@Component({
  selector: 'app-evaluators-summary',
  templateUrl: './evaluators-summary.component.html',
  styleUrls: ['./evaluators-summary.component.scss']
})
export class EvaluatorsSummaryComponent implements OnInit {
  public userDetails;

  constructor(
    private _route: Router,
    private _authService: AuthService,
    private _registerAccountEvaluatorFormService: RegisterAccountEvaluatorFormService,
  ) { }

  onSubmit(){
    console.log(this.userDetails)
    this._authService.SendVerificationMail();

  }

  ngOnInit(): void {
    this._registerAccountEvaluatorFormService.cast.subscribe(registerAccountEvaluatorSubject => this.userDetails = registerAccountEvaluatorSubject)
   
  }

}
