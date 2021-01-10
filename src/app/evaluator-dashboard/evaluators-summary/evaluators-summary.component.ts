import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../core/services/auth.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { RegisterAccountEvaluatorFormService } from '../../core/services/register-account-evaluator-form.service';

@Component({
  selector: 'app-evaluators-summary',
  templateUrl: './evaluators-summary.component.html',
  styleUrls: ['./evaluators-summary.component.scss']
})
export class EvaluatorsSummaryComponent implements OnInit {
  public user = {
    first_name: this._localStorageService.get('evaluator-registration-first-name'),
    middle_name: this._localStorageService.get('evaluator-registration-middle-name'),
    last_name: this._localStorageService.get('evaluator-registration-last-name'),
    suffix_name: this._localStorageService.get('evaluator-registration-suffix-name'),
    birthdate: this.dateToString(this._localStorageService.get('evaluator-registration-birth-date')),
    marital_status_id: this._localStorageService.get('evaluator-registration-marital-status'),
    gender: this._localStorageService.get('evaluator-registration-gender'),
    home_address: this._localStorageService.get('evaluator-registration-home-address'),
    barangay: this._localStorageService.get('evaluator-registration-barangay'),
    employee_no: this._localStorageService.get('evaluator-registration-employee-number'),
    department: this._localStorageService.get('evaluator-registration-office'),
    position: this._localStorageService.get('evaluator-registration-position'),
    contact_number: this._localStorageService.get('evaluator-registration-contact-number'),
    mobile_no: this._localStorageService.get('evaluator-registration-contact-number'),
    id_type: this._localStorageService.get('evaluator-registration-id-type'),
    id_number: this._localStorageService.get('evaluator-registration-id-number'),
    firebase_uid: this._localStorageService.get('evaluator-registration-firebase-uid'),
    email_address: this._localStorageService.get('evaluator-registration-email-address'),
    emailVerified: this._localStorageService.get('evaluator-registration-email-verified'),
    is_evaluator: this._localStorageService.get('evaluator-registration-is-evaluator'),
    photo_path: 'test',
    id_photo_path: this._localStorageService.get('evaluator-registration-id')
  }

  get profilePhoto(): string | ArrayBuffer {
    const photo = this._localStorageService.get('evaluator-registration-photo');
    return photo ? photo : "https://baguio-visita.s3-ap-southeast-1.amazonaws.com/default-avatar.png";
  }

  get idPhoto(): string | ArrayBuffer {
    const id = this._localStorageService.get('evaluator-registration-id');
    return id ? id : "https://baguio-visita.s3-ap-southeast-1.amazonaws.com/default-avatar.png";
  }

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _registerAccountEvaluatorFormService: RegisterAccountEvaluatorFormService,
    private _localStorageService: LocalStorageService
  ) {}

  onSubmit(){
    this._registerAccountEvaluatorFormService.submitRegisterAccountInfo(this.user).subscribe((res) => {
      this._authService.SendVerificationMail();
      
    this._localStorageService.remove('evaluator-registration-first-name');
    this._localStorageService.remove('evaluator-registration-middle-name');
    this._localStorageService.remove('evaluator-registration-last-name');
    this._localStorageService.remove('evaluator-registration-suffix-name');
    this._localStorageService.remove('evaluator-registration-birth-date');
    this._localStorageService.remove('evaluator-registration-marital-status');
    this._localStorageService.remove('evaluator-registration-gender');
    this._localStorageService.remove('evaluator-registration-home-address');
    this._localStorageService.remove('evaluator-registration-barangay');
    this._localStorageService.remove('evaluator-registration-employee-number');
    this._localStorageService.remove('evaluator-registration-office');
    this._localStorageService.remove('evaluator-registration-position');
    this._localStorageService.remove('evaluator-registration-contact-number');
    this._localStorageService.remove('evaluator-registration-contact-number');
    this._localStorageService.remove('evaluator-registration-id-type');
    this._localStorageService.remove('evaluator-registration-id-number');
    this._localStorageService.remove('evaluator-registration-firebase-uid');
    this._localStorageService.remove('evaluator-registration-email-address');
    this._localStorageService.remove('evaluator-registration-email-verified');
    this._localStorageService.remove('evaluator-registration-is-evaluator');
    this._localStorageService.remove('evaluator-registration-photo');
    this._localStorageService.remove('evaluator-registration-id')

    }, (err => {
      console.log(err);
    }));
  }

  dateToString(dateObject){
    if(dateObject != null){
      const birthdate = new Date(dateObject);
      let dd = birthdate.getDate();
      let mm = birthdate.getMonth() + 1;
      let yyyy = birthdate.getFullYear();
      return `${yyyy}-${mm}-${dd}`;
    }
  }
  
  ngOnInit(): void {}
}
