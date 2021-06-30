import Swal from 'sweetalert2';
import { ExcavationPermitService } from './../../../core/services/excavation-permit.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import {
  applicationDescriptions,
  applicationTypes,
} from '../../../core/enums/application-type.enum';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { environment } from './../../../../environments/environment';

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
  public userBuildingPermits = [];
  public selectedBuildingPermit;
  public isSubmitting: boolean = false;
  public receiveApplications: boolean;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private newApplicationFormService: NewApplicationFormService,
    public excavationService: ExcavationPermitService,
    public applicationInfoService: ApplicationInfoService,
    private newApplicationSerivce: NewApplicationService
  ) {}

  ngOnInit(): void {
    this.receiveApplications = environment.receiveApplications;

    this.createForm();
    if (this.route.snapshot.paramMap.get('new_application')) {
      const type = this.route.snapshot.paramMap.get('new_application');
      this.selectedPermitType = type;
      this.permitStepOneForm.patchValue({
        application_type: type,
      });
    }
    this.isLoading = true;
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.fetchUserBuildingPermit();
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
  fetchUserBuildingPermit() {
    this.applicationInfoService
      .fetchUserBuildingPermit(this.userInfo.id)
      .subscribe((res) => {
        this.userBuildingPermits = res.data;
      });
  }
  createForm() {
    this.permitStepOneForm = this.fb.group({
      application_type: new FormControl('', Validators.required),
      is_representative: new FormControl('', Validators.required),
      is_lot_owner: new FormControl('', Validators.required),
      construction_status: new FormControl('', Validators.required),
      registered_owner: new FormControl(''),
      is_within_subdivision: new FormControl('', Validators.required),
      is_under_mortgage: new FormControl('', Validators.required),
      is_owned_by_corporation: new FormControl('', Validators.required),
      is_property_have_coowners: new FormControl('', Validators.required),
      occupancy_classification_id: new FormControl('', Validators.required),
    });
  }

  callNext() {
    this.isSubmitting = true;
    if (this.selectedPermitType == '1') {
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
          occupancy_classification_id: value.occupancy_classification_id,
        };

        this.newApplicationFormService.setApplicationInfo(body);
        this.router.navigateByUrl('/dashboard/new/step-two/lot-owner');
        this.isSubmitting = false;
      } else {
        Swal.fire('Error!', 'Fill out all required information!', 'error');
        this.isSubmitting = false;
      }
    } else if (this.selectedPermitType == '2') {
      this.isSubmitting = false;
      this.router.navigate([
        '/dashboard/new/details',
        this.selectedBuildingPermit,
      ]);
    } else if (
      this.selectedPermitType == '3' ||
      this.selectedPermitType == '4' ||
      this.selectedPermitType == '5'
    ) {
      if (this.permitStepOneForm.value.is_property_have_coowners) {
        const value = this.permitStepOneForm.value;
        const body = {
          user_id: this.userInfo.id,
          permit_type_id: this.selectedPermitType,
          is_representative: value.is_representative,
          rol_status_id: value.is_lot_owner,
          construction_status: value.construction_status,
          is_registered_owner: value.registered_owner
            ? value.registered_owner
            : 0,
          is_within_subdivision: value.is_within_subdivision,
          is_under_mortgage: value.is_under_mortgage,
          is_owned_by_corporation: value.is_owned_by_corporation,
          is_property_have_coowners: value.is_property_have_coowners,
          construction_status_id: 0,
          applicant_first_name: this.userInfo.first_name,
          applicant_middle_name: this.userInfo.middle_name,
          applicant_last_name: this.userInfo.last_name,
          applicant_suffix_name: this.userInfo.suffix_name,
          applicant_contact_number: this.userInfo.contact_number,
          applicant_email_address: this.userInfo.email_address,
          // applicant_house_number: this.userInfo.home_address,
          // applicant_street_name: this.userInfo.owner_street,
          // applicant_barangay: this.userInfo.barangay,
        };
        this.newApplicationSerivce.submitApplication(body).subscribe((res) => {
          Swal.fire(
            'Success!',
            'Application Details Submitted!',
            'success'
          ).then((result) => {
            this.isLoading = false;
            this.isSubmitting = false;
            switch (this.selectedPermitType) {
              case '3':
                this.router.navigateByUrl('/dashboard/new/excavation-permit');
                break;
              case '4':
                this.router.navigateByUrl('/dashboard/new/fencing-permit');
                break;
              case '5':
                this.router.navigateByUrl('/dashboard/new/demolition-permit');
                break;
            }
          });
        });
      } else {
        this.isSubmitting = false;
        Swal.fire('Error!', 'Fill out all required information!', 'error');
      }
    } else {
      this.isSubmitting = false;
      Swal.fire('Error!', 'Fill out all required information!', 'error');
    }
  }
}
