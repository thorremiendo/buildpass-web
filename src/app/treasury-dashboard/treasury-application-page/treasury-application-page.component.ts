import { TreasuryPaymentDialogComponent } from './../treasury-payment-dialog/treasury-payment-dialog.component';
import { ApplicationFeesService } from './../../core/services/application-fees.service';
import { ActivatedRoute } from '@angular/router';
import { ApplicationInfoService } from './../../core/services/application-info.service';
import { Component, OnInit } from '@angular/core';
import { officeTypes } from 'src/app/core/enums/offices.enum';
import { departmentStatus } from 'src/app/core/enums/department-status.enum';
import { applicationTypes } from '../../core/enums/application-type.enum';
import { applicationStatus } from '../../core/enums/application-status.enum';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-treasury-application-page',
  templateUrl: './treasury-application-page.component.html',
  styleUrls: ['./treasury-application-page.component.scss'],
})
export class TreasuryApplicationPageComponent implements OnInit {
  public applicationDetails;
  public applicationId;
  public isLoading: boolean = false;
  public cbaoFees;
  columnsToDisplay: string[] = ['number', 'description', 'evaluator', 'amount'];
  public unifiedBpForm;
  public unifiedBpFees;
  constructor(
    private applicationService: ApplicationInfoService,
    private applicationFeeService: ApplicationFeesService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params.id;
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationDetails = result.data;
        this.fetchApplicationFees();
        this.fetchBpFees();
        this.findUnifiedBpForm();
      });
  }
  openPaymentDialog(): void {
    const dialogRef = this.dialog.open(TreasuryPaymentDialogComponent, {
      width: '1000px',
      data: {
        applicationDetails: this.applicationDetails,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  fetchBpFees() {
    const application_id = this.applicationId;
    this.applicationFeeService.fetchBpFees(application_id).subscribe((res) => {
      this.unifiedBpFees = res.data;
    });
  }

  fetchApplicationFees() {
    const application_id = this.applicationId;
    const office_id = 4;
    this.applicationFeeService
      .fetchFeesByOffice(application_id, office_id)
      .subscribe((res) => {
        this.cbaoFees = res.data;
        this.isLoading = false;
      });
  }

  findUnifiedBpForm() {
    this.isLoading = true;
    const find = this.applicationDetails.user_docs.forEach((e) => {
      if (e.document_id == 2) {
        this.unifiedBpForm = e;
        this.isLoading = false;
        console.log(this.unifiedBpForm);
      }
    });
  }

  getApplicationType(id): string {
    return applicationTypes[id];
  }
  getApplicationStatus(id): string {
    return applicationStatus[id];
  }
}
