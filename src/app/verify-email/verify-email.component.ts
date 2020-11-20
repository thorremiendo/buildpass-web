import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service' 
import { RegisterAccountEvaluatorFormService } from '../core/services/register-account-evaluator-form.service'
import { Router } from '@angular/router'
import { NavigationComponent } from '../landing/navigation/navigation.component';
import { BannerComponent } from '../landing/banner/banner.component';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  public userDetails;

  constructor(
    public _authService:AuthService,
    private _router: Router,
    private _registerAccountEvaluatorFormService: RegisterAccountEvaluatorFormService,

  ) { }

  sendAgainVerification(){
    this._authService.SendVerificationMail();
  }

  checkUser(){
    if(this.userDetails.is_evaluator !== true){
      this._router.navigateByUrl('/user/sign-in');

    }

    else 
    {
      this._router.navigateByUrl('evaluator/sign-in');

    }


    

  }

  ngOnInit(): void {
    this._registerAccountEvaluatorFormService.cast.subscribe(registerAccountEvaluatorSubject => this.userDetails = registerAccountEvaluatorSubject)

  }

}
