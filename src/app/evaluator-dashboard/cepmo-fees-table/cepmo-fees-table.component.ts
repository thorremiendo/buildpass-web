import { Component, OnInit } from '@angular/core';
import { ApplicationFeesService } from 'src/app/core/services/application-fees.service';
import { officeTypes } from 'src/app/core/enums/offices.enum';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { MatDialog } from '@angular/material/dialog';
import { FeesDialogComponent } from '../fees-dialog/fees-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-cepmo-fees-table',
  templateUrl: './cepmo-fees-table.component.html',
  styleUrls: ['./cepmo-fees-table.component.scss'],
})
export class CepmoFeesTableComponent implements OnInit {
  columnsToDisplay: string[] = [
    'number',
    'description',
    'evaluator',
    'amount',
    'action',
  ];
  public dataSource;
  public applicationId;
  public evaluatorDetails;
  public applicationDetails;
  public user;
  constructor(
    private applicationService: ApplicationInfoService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private applicationFeeService: ApplicationFeesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params.id;
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationDetails = result.data;
        this.fetchEvaluatorDetails();
      });
  }
  fetchApplicationFees() {
    const application_id = this.applicationId;
    const office_id = 2;
    this.applicationFeeService
      .fetchFeesByOffice(application_id, office_id)
      .subscribe((res) => {
        this.dataSource = res.data;
      });
  }
  canAddFee() {
    const status = this.applicationDetails.application_status_id;
    if (status == 3) {
      return true;
    } else return false;
  }
  getOfficeType(id): string {
    return officeTypes[id];
  }
  showAddItem() {
    const dialogRef = this.dialog.open(FeesDialogComponent, {
      width: '800px',
      data: {
        dataSource: this.dataSource,
        route: this.route,
        office_id: 2,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  onRemove(id) {
    this.applicationFeeService.deleteFee(id).subscribe((res) => {});
    this.ngOnInit();
  }

  fetchEvaluatorDetails() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.evaluatorDetails = this.user.employee_detail;
    if (this.evaluatorDetails !== undefined) {
      this.fetchApplicationFees();
    }
  }
}
