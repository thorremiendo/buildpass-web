import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { officeTypes } from 'src/app/core/enums/offices.enum';
import { ApplicationFeesService } from 'src/app/core/services/application-fees.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
@Component({
  selector: 'app-view-fees',
  templateUrl: './view-fees.component.html',
  styleUrls: ['./view-fees.component.scss'],
})
export class ViewFeesComponent implements OnInit {
  columnsToDisplay: string[] = ['number', 'description', 'evaluator', 'amount'];
  public cbaoFees;
  public cpdoFees;
  public bfpFees;
  public cepmoFees;
  public applicationDetails;
  public applicationFee;
  public applicationId;
  constructor(
    private applicationFeeService: ApplicationFeesService,
    private applicationService: ApplicationInfoService,
    public dialogRef: MatDialogRef<ViewFeesComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    this.applicationId = this.data.applicationId;
    this.fetchBfpFees();
    this.fetchCbaoFees();
    this.fetchCepmoFees();
    this.fetchCpdoFees();
    this.fetchApplicationDetails();
    this.fetchApplicationFees();
  }

  fetchApplicationDetails() {
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationDetails = result.data;
      });
  }
  fetchApplicationFees() {
    const id = this.applicationId;
    this.applicationFeeService.fetchFees(id).subscribe((res) => {
      this.applicationFee = res.data[res.data.length - 1];
    });
  }
  fetchCbaoFees() {
    const application_id = this.data.applicationId;
    const office_id = 4;
    this.applicationFeeService
      .fetchFeesByOffice(application_id, office_id)
      .subscribe((res) => {
        this.cbaoFees = res.data;
      });
  }
  fetchCpdoFees() {
    const application_id = this.data.applicationId;
    const office_id = 1;
    this.applicationFeeService
      .fetchFeesByOffice(application_id, office_id)
      .subscribe((res) => {
        this.cpdoFees = res.data;
      });
  }
  fetchBfpFees() {
    const application_id = this.data.applicationId;
    const office_id = 3;
    this.applicationFeeService
      .fetchFeesByOffice(application_id, office_id)
      .subscribe((res) => {
        this.bfpFees = res.data;
      });
  }
  fetchCepmoFees() {
    const application_id = this.data.applicationId;
    const office_id = 2;
    this.applicationFeeService
      .fetchFeesByOffice(application_id, office_id)
      .subscribe((res) => {
        this.cepmoFees = res.data;
      });
  }

  handleDownloadFees() {
    this.applicationFeeService
      .downloadFees(this.applicationId)
      .subscribe((res) => {
        window.open(res.data);
      });
  }
  getOfficeType(id): string {
    return officeTypes[id];
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
