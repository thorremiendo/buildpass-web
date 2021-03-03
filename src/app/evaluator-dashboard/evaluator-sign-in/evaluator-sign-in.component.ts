import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../core/services/auth.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { AdminAuthService, FeedService, UserService } from '../../core';


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
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private _adminAuth: AdminAuthService,
    private _feedService:FeedService,

  ) {
    this._matIconRegistry.addSvgIcon("logo",
    this._domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    
    this.createForm();
  }

  createForm() {
    this._evaluatorSignInForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  
  tryLogin(value) {
    this._submitted = true;
    this._adminAuth.loginAdmin(value.username, value.password).subscribe(res => {
      this._feedService.checkUser();
      this._router.navigateByUrl('/evaluator/home/table');

      console.log(res);
      
    }, err => {
      console.log(err)
    });
  }

  ngOnInit(): void {
    this.createForm();

  }

}
