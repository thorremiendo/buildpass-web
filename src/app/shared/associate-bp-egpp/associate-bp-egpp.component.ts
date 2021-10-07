import { PopOutNotificationsService } from './../../core/services/pop-out-notification.service';
import { ApplicationInfoService } from './../../core/services/application-info.service';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { applicationStatus } from '../../core/enums/application-status.enum';
import { occupancyClassification } from '../../core/enums/occupancy-classification.enum';
import { applicationTypes } from '../../core/enums/application-type.enum';
@Component({
  selector: 'app-associate-bp-egpp',
  templateUrl: './associate-bp-egpp.component.html',
  styleUrls: ['./associate-bp-egpp.component.scss'],
})
export class AssociateBpEgppComponent implements OnInit {
  public selectedOngoingApplication;
  public userOngoingApplications = [];
  public buildingPermitDetails;
  public isLoading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AssociateBpEgppComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private applicationInfoService: ApplicationInfoService,
    private popout: PopOutNotificationsService
  ) {}

  ngOnInit(): void {
    this.applicationInfoService
      .fetchOngoingApplication(this.data.userDetails.id)
      .subscribe((res) => {
        if (this.data.id == 1) {
          this.userOngoingApplications = res.data.filter(
            (e) =>
              e.ocpas_code &&
              e.permit_type_id == 1 &&
              (!e.sub_permit_type_id ||
                e.sub_permit_type_id == this.data.applicationDetails.id)
          );
        } else if (this.data.id == 2) {
          this.userOngoingApplications = res.data.filter(
            (e) =>
              e.ocpas_code &&
              e.permit_type_id == 3 &&
              (!e.main_permit_id ||
                e.main_permit_id == this.data.applicationDetails.id)
          );
        }
        console.log(this.userOngoingApplications);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  excavationBpSelect(e) {
    this.applicationInfoService
      .fetchApplicationInfo(e.value)
      .subscribe((res) => {
        console.log(res);
        this.buildingPermitDetails = res.data;
      });
  }

  getApplicationStatus(id): string {
    return applicationStatus[id];
  }

  getClassification(id): string {
    return occupancyClassification[id];
  }
  getPermitType(id): string {
    return applicationTypes[id];
  }
  handleConfirm() {
    this.isLoading = true;
    let body = {};
    if (this.data.id == 1) {
      body = {
        main_permit_id: parseInt(this.selectedOngoingApplication),
      };
    } else if (this.data.id == 2) {
      body = {
        sub_permit_type_id: parseInt(this.selectedOngoingApplication),
      };
    }

    console.log(body);
    this.applicationInfoService
      .updateApplicationInfo(body, this.data.applicationDetails.id)
      .subscribe((res) => {
        this.isLoading = false;
        this.popout.openSnackBar('Success!');
        window.location.reload();
        console.log(res.data);
      });
  }
}
