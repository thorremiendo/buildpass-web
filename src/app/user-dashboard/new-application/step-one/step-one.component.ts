import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

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
  public permitStepOneForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private newApplicationService: NewApplicationFormService) {}

  ngOnInit(): void {
    this.permitStepOneForm = this.fb.group({
      application_type: new FormControl('', Validators.required),
      is_representative: new FormControl('', Validators.required),
      is_lot_owner: new FormControl('', Validators.required),
      construction_status: new FormControl('', Validators.required),

    });
  }
  callNext() {
    const value = this.permitStepOneForm.value;
    const body = {
      application_type: value.application_type,
      is_representative: value.is_representative,
      is_lot_owner: value.is_lot_owner,
      construction_status: value.construction_status
    };
    this.newApplicationService.setApplicationInfo(body)
    // this.router.navigateByUrl('/dashboard/new/initial-forms/zoning-clearance')
    this.router.navigateByUrl('/dashboard/new/step-two')

  }
}
