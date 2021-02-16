import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent implements OnInit {
  public selectedPermitType;
  public isRepresentative;
  public isLotOwner;
  public constructionStatus;
  public registeredOwner;
  public permitStepOneForm: FormGroup;
  public userInfo;
  public applicationId;
  public applicationInfo;
  public isExcavation;
  public useExistingInfo;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private newApplicationFormService: NewApplicationFormService,
    private userService: UserService,
    private newApplicationService: NewApplicationService
  ) {}

  ngOnInit(): void {
    this.applicationId = localStorage.getItem('app_id');
    if (this.applicationId) {
      this.fetchApplicationInfo();
    }
    this.userService.cast.subscribe((userSubject) => {
      this.userInfo = userSubject;
      console.log(this.userInfo);
    });
    this.permitStepOneForm = this.fb.group({
      application_type: new FormControl('', Validators.required),
      is_representative: new FormControl('', Validators.required),
      is_lot_owner: new FormControl('', Validators.required),
      construction_status: new FormControl('', Validators.required),
      registered_owner: new FormControl('', Validators.required),
    });
  }

  fetchApplicationInfo() {
    this.newApplicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationInfo = result.data;
        console.log('app ifo', this.applicationInfo);

        if (this.applicationInfo.is_excavation == 1) {
          this.isExcavation = true;
          this.selectedPermitType = '3';
        }
      });
  }
  callProceed() {
    this.router.navigateByUrl('/dashboard/new/step-two/lot-owner');
  }

  callNext() {
    const value = this.permitStepOneForm.value;
    const body = {
      application_type: this.selectedPermitType,
      is_representative: value.is_representative,
      is_lot_owner: value.is_lot_owner,
      construction_status: value.construction_status,
      registered_owner: value.registered_owner ? value.registered_owner : 0,
    };

    this.newApplicationFormService.setApplicationInfo(body);
    this.router.navigateByUrl('/dashboard/new/step-two/lot-owner');
  }
}
