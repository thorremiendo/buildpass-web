import { Component, OnInit } from '@angular/core';
import { AuthService } from './../core/services/auth.service';
import { RegisterAccountFormService} from './../core/services/register-account-form.service'

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {
  public userDetails;

  constructor(
    public _authService: AuthService,
    private _registerAccountFormService: RegisterAccountFormService
  ) { }

  ngOnInit(): void {
    this._registerAccountFormService.cast.subscribe(registerAccountSubject => this.userDetails = registerAccountSubject)
    console.log(this.userDetails);
  }
  

  logOut(){
    this._authService.SignOut();
  }

}
