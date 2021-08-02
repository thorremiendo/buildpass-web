import { OccupancyService } from './../../../core/services/occupancy.service';
import Swal from 'sweetalert2';
import { ExcavationPermitService } from './../../../core/services/excavation-permit.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent implements OnInit {
  public oldBpNumber = new FormControl();
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
  public cfeiType;
  public isLoading: boolean = false;
  public userBuildingPermits = [];
  public selectedBuildingPermit;
  public isSubmitting: boolean = false;
  public receiveApplications: boolean;
  public isBuildpassReleased;
  public noBpError;
  public oldBpInputs = [];
  public oldBpDetails = [];
  public invalidBps = [];
  public amendmentDetails;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  @ViewChild('chipsInput') chipsInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private newApplicationFormService: NewApplicationFormService,
    public excavationService: ExcavationPermitService,
    public applicationInfoService: ApplicationInfoService,
    private newApplicationSerivce: NewApplicationService,
    private occupancyService: OccupancyService
  ) {}
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.oldBpInputs.push({ input: value });
      this.oldBpDetails = [];
    }
    event.input.value = null;
  }

  remove(input): void {
    const index = this.oldBpInputs.indexOf(input);

    if (index >= 0) {
      this.oldBpInputs.splice(index, 1);
      this.oldBpDetails = [];
    }
  }
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
      sub_permit_type_id: new FormControl(''),
      is_affected_by_fire: new FormControl(''),
      is_affected_by_calamities: new FormControl(''),
    });
  }

  callNext() {
    const otherPermits = [3, 4, 5, 6, 7, 8, 9, 10];
    const isOtherPermit = otherPermits.find(
      (e) => e == this.selectedPermitType
    );
    this.isSubmitting = true;
    if (!isOtherPermit && this.selectedPermitType == '1') {
      if (this.permitStepOneForm.valid) {
        const value = this.permitStepOneForm.value;
        const body = {
          application_type: this.selectedPermitType,
          is_representative: value.is_representative,
          is_lot_owner: value.is_lot_owner,
          construction_status: value.construction_status,
          old_permit_number: this.oldBpNumber.value
            ? this.oldBpNumber.value
            : '',
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
    } else if (isOtherPermit) {
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
          sub_permit_type_id: this.cfeiType ? this.cfeiType : 0,
          is_affected_by_fire: value.is_affected_by_fire
            ? value.is_affected_by_fire
            : 0,
          is_affected_by_calamities: value.is_affected_by_calamities
            ? value.is_affected_by_calamities
            : 0,
          construction_status_id: 0,
          applicant_first_name: this.userInfo.first_name,
          applicant_middle_name: this.userInfo.middle_name,
          applicant_last_name: this.userInfo.last_name,
          applicant_suffix_name: this.userInfo.suffix_name,
          applicant_contact_number: this.userInfo.contact_number,
          applicant_email_address: this.userInfo.email_address,
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
              case '6':
                this.router.navigateByUrl('/dashboard/new/scaffolding-permit');
                break;
              case '7':
                this.router.navigateByUrl('/dashboard/new/sign-permit');
                break;
              case '8':
                this.router.navigateByUrl('/dashboard/new/temporary-sidewalk');
                break;
              case '9':
                this.router.navigateByUrl('/dashboard/new/mechanical-permit');
                break;
              case '10':
                this.router.navigateByUrl(
                  '/dashboard/new/electrical-inspection'
                );
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

  handleOccupancyNext() {
    this.invalidBps = [];
    this.noBpError = '';
    this.oldBpDetails = [];
    if (this.selectedBuildingPermit) {
      this.router.navigate([
        '/dashboard/new/details',
        this.selectedBuildingPermit,
      ]);
    } else if (this.oldBpNumber) {
      if (this.oldBpInputs.length >= 1) {
        console.log(this.oldBpInputs);
        this.oldBpInputs.forEach((input) => {
          this.occupancyService
            .fetchSpecificOldBp(input.input)
            .subscribe((res) => {
              console.log(res);
              if (res.data.length == 0) {
                this.invalidBps.push(input.input);
                this.noBpError =
                  'The permit number you entered is not found in the system. Please verify that it is typed correctly or call CBAO at (074)442-2503 to  verify.';
              } else if (res.data[0]) {
                this.oldBpDetails.push(res.data[0]);
                console.log(this.oldBpDetails);
              }
            });
        });
      }
    }
  }

  handleSearchBp() {
    this.occupancyService
      .fetchSpecificOldBp(this.oldBpNumber.value)
      .subscribe((res) => {
        console.log(res);
        if (res.data.length == 0) {
          this.noBpError =
            'The permit number you entered is not found in the system. Please verify that it is typed correctly or call CBAO at (074)442-2503 to  verify.';
        } else if (res.data[0]) {
          this.noBpError = null;
          this.amendmentDetails = res.data[0];
        }
      });
  }

  confirmOldBp() {
    const inputs = [];
    this.oldBpInputs.forEach((input) => {
      inputs.push(input.input);
    });
    const body = {
      user_id: this.userInfo.id,
      permit_type_id: this.selectedPermitType,
      // old_permit_number: inputs.toString(),
      applicant_first_name: this.userInfo.first_name,
      applicant_middle_name: this.userInfo.middle_name,
      applicant_last_name: this.userInfo.last_name,
      applicant_suffix_name: this.userInfo.suffix_name,
      applicant_contact_number: this.userInfo.contact_number,
      applicant_email_address: this.userInfo.email_address,
    };
    console.log(body);
    this.newApplicationSerivce.submitApplication(body).subscribe((res) => {
      this.oldBpInputs.forEach((input) => {
        const body = {
          user_id: res.data.user_id,
          old_permit_number: input.input,
        };
        this.occupancyService
          .associateOldBp(res.data.id, body)
          .subscribe((res) => {
            console.log('added');
          });
      });
      Swal.fire('Success!', 'Application Details Submitted!', 'success').then(
        (result) => {
          this.isLoading = false;
          this.isSubmitting = false;
          this.router.navigateByUrl('/dashboard/new/occupancy-permit');
        }
      );
    });
  }
}
