import Swal from 'sweetalert2';
import { ExcavationPermitService } from './../../../core/services/excavation-permit.service';
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
import {
  applicationDescriptions,
  applicationTypes,
} from '../../../core/enums/application-type.enum';

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
  public withExcavation;
  public useExistingInfo;
  public isLoading: boolean = false;
  public userBuildingPermits = [
    {
      bp_number: 'BP-2021-01',
    },
    {
      bp_number: 'BP-2021-02',
    },
  ];
  public selectedBuildingPermit;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private newApplicationFormService: NewApplicationFormService,
    public excavationService: ExcavationPermitService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.isLoading = true;
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.isLoading = false;
    localStorage.removeItem('newApplicationInfo');
    localStorage.removeItem('commonFieldsInfo');
  }
  getApplicationDescription(id): string {
    return applicationDescriptions[id];
  }
  getApplicationType(id): string {
    return applicationTypes[id];
  }
  createForm() {
    this.permitStepOneForm = this.fb.group({
      application_type: new FormControl('', Validators.required),
      is_representative: new FormControl('', Validators.required),
      is_lot_owner: new FormControl('', Validators.required),
      construction_status: new FormControl('', Validators.required),
      registered_owner: new FormControl('', Validators.required),
      is_within_subdivision: new FormControl('', Validators.required),
      is_under_mortgage: new FormControl('', Validators.required),
      is_owned_by_corporation: new FormControl('', Validators.required),
      is_property_have_coowners: new FormControl('', Validators.required),
    });
  }

  callNext() {
    if (this.selectedPermitType !== '2') {
      if (this.permitStepOneForm.valid) {
        const value = this.permitStepOneForm.value;
        const body = {
          application_type: this.selectedPermitType,
          is_representative: value.is_representative,
          is_lot_owner: value.is_lot_owner,
          construction_status: value.construction_status,
          registered_owner: value.registered_owner ? value.registered_owner : 0,
          is_within_subdivision: value.is_within_subdivision,
          is_under_mortgage: value.is_under_mortgage,
          is_owned_by_corporation: value.is_owned_by_corporation,
          is_property_have_coowners: value.is_property_have_coowners,
        };
        console.log({ body });
        this.newApplicationFormService.setApplicationInfo(body);

        this.router.navigateByUrl('/dashboard/new/step-two/lot-owner');
      } else {
        Swal.fire('Error!', 'Fill out all required information!', 'error');
      }
    } else {
      if (!this.selectedBuildingPermit) {
        Swal.fire('Error!', 'Fill out all required information!', 'error');
      } else {
        this.router.navigateByUrl('/dashboard/new/occupancy-permit');
      }
    }
  }
}
