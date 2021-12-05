import { NewApplicationService } from './../../core/services/new-application.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ProjectDetailsComponent } from 'src/app/evaluator-dashboard/project-details/project-details.component';
import { RepresentativeDetailsComponent } from '../representative-details/representative-details.component';
import { applicationTypes } from '../../core/enums/application-type.enum';
import { applicationStatus } from '../../core/enums/application-status.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-application-summary',
  templateUrl: './application-summary.component.html',
  styleUrls: ['./application-summary.component.scss'],
})
export class ApplicationSummaryComponent implements OnInit {
  public applicationId;
  public applicationInfo;
  public isSubmitting: boolean = false;
  public userInfo;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private applicationService: ApplicationInfoService,
    private router: Router,
    public newApplicationSerivce: NewApplicationService
  ) {}

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.applicationId = this.route.snapshot.params.id;
    this.fetchApplicationDetails();
  }

  handleNext() {
    this.isSubmitting = true;
    const body = {
      user_id: this.userInfo.id,
      permit_type_id: 2,
      // old_permit_number: inputs.toString(),
      applicant_first_name: this.userInfo.first_name,
      applicant_middle_name: this.userInfo.middle_name,
      applicant_last_name: this.userInfo.last_name,
      applicant_suffix_name: this.userInfo.suffix_name,
      applicant_contact_number: this.userInfo.contact_number,
      applicant_email_address: this.userInfo.email_address,
      old_permit_number: this.applicationInfo.ocpas_code,
    };

    this.newApplicationSerivce.submitApplication(body).subscribe((res) => {
      Swal.fire('Success!', 'Application Details Submitted!', 'success').then(
        (result) => {
          this.isSubmitting = false;
          this.router.navigateByUrl('/dashboard/new/occupancy-permit');
        }
      );
    });
  }

  getApplicationStatus(id): string {
    return applicationStatus[id];
  }
  getApplicationType(id): string {
    return applicationTypes[id];
  }

  fetchApplicationDetails() {
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        this.applicationInfo = res.data;
        console.log(this.applicationInfo);
      });
  }
}
