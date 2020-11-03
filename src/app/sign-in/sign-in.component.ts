import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import { AngularFirestore, validateEventsArray } from '@angular/fire/firestore';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public hide = true;
  _submitted = false;
  _signinForm: FormGroup;
  
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _fb: FormBuilder,
    private _afs: AngularFirestore,
    private _route: ActivatedRoute

  ) { 
    this.createForm();
  }

  createForm(){
    this._signinForm = this._fb.group({
      email: ['', Validators.required],
      password:['', Validators.required]
    });
  }

  tryLogin(value){
    this._submitted = true;
    if (this._signinForm.valid){
      this._authService.SignIn(value);
    
  }

  }

  tryGoogle(){
    this._authService.GoogleAuth();
  }


  ngOnInit(): void {
   
  }

}
