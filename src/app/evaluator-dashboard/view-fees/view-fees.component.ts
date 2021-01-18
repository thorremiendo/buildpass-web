import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { officeTypes } from 'src/app/core/enums/offices.enum';
import { ApplicationFeesService } from 'src/app/core/services/application-fees.service';
@Component({
  selector: 'app-view-fees',
  templateUrl: './view-fees.component.html',
  styleUrls: ['./view-fees.component.scss'],
})
export class ViewFeesComponent implements OnInit {
  columnsToDisplay: string[] = ['number', 'description', 'amount'];
  public cbaoFees;
  public cpdoFees;
  public bfpFees;
  public cepmoFees;

  constructor(
    private applicationFeeService: ApplicationFeesService,
    public dialogRef: MatDialogRef<ViewFeesComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    this.fetchBfpFees();
    this.fetchCbaoFees();
    this.fetchCepmoFees();
    this.fetchCpdoFees();
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
  getOfficeType(id): string {
    return officeTypes[id];
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
