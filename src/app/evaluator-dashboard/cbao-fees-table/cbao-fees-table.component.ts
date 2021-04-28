import { Component, OnInit } from '@angular/core';
import { ApplicationFeesService } from 'src/app/core/services/application-fees.service';
import { officeTypes } from 'src/app/core/enums/offices.enum';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { MatDialog } from '@angular/material/dialog';
import { FeesDialogComponent } from '../fees-dialog/fees-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-cbao-fees-table',
  templateUrl: './cbao-fees-table.component.html',
  styleUrls: ['./cbao-fees-table.component.scss'],
})
export class CbaoFeesTableComponent implements OnInit {
  columnsToDisplay: string[] = [
    'number',
    'description',
    'evaluator',
    'amount',
    'action',
  ];
  public cbaoFees;
  public applicationId;
  public evaluatorDetails;
  public applicationDetails;
  public user;
  public isLoading: boolean = true;
  public evaluatorRole;
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
    const office_id = 4;
    this.applicationFeeService
      .fetchFeesByOffice(application_id, office_id)
      .subscribe((res) => {
        this.cbaoFees = res.data;
        this.isLoading = false;
      });
  }
  getOfficeType(id): string {
    return officeTypes[id];
  }
  showAddItem() {
    const dialogRef = this.dialog.open(FeesDialogComponent, {
      width: '800px',
      data: {
        route: this.route,
        office_id: 4,
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
    this.evaluatorRole = this.user.user_roles[0].role[0];
    if (this.evaluatorDetails !== undefined) {
      this.fetchApplicationFees();
    }
  }
}
