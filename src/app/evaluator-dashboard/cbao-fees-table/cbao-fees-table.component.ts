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
  public surcharges = [
    {
      item: '0%',
      value: 0,
    },
    {
      item: '10%',
      value: 0.1,
    },
    {
      item: '25%',
      value: 0.25,
    },
    {
      item: '50%',
      value: 0.5,
    },
    {
      item: '100%',
      value: 1,
    },
  ];
  public cbaoFees;
  public applicationId;
  public evaluatorDetails;
  public applicationDetails;
  public user;
  public isLoading: boolean = true;
  public evaluatorRole;
  public selectedSurcharge;
  public surcharge;
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

  onSurchargeSelect(e) {
    this.selectedSurcharge = e.value;
    this.isLoading = true;
    const fees = this.cbaoFees.filter((e) => e.amount);
    let total = fees
      .map((item) => item.amount)
      .reduce((prev, curr) => prev + curr, 0);
    console.log(this.cbaoFees);
    console.log(total, this.selectedSurcharge);
    const newItem = {
      application_id: this.applicationId,
      name: 'SURCHARGES',
      office_id: this.evaluatorDetails.office_id,
      evaluator_user_id: this.evaluatorDetails.user_id,
      percentage: this.selectedSurcharge,
      action_id: 1,
      fee_id: 0,
      amount: total * this.selectedSurcharge,
    };

    this.applicationFeeService.addFee(newItem).subscribe((res) => {
      this.isLoading = false;
      this.addFeeSurcharge();
    });
  }

  addFeeSurcharge() {
    const application_id = this.applicationId;
    const office_id = 4;
    this.applicationFeeService
      .fetchFeesByOffice(application_id, office_id)
      .subscribe((res) => {
        res.data.forEach((element) => {
          element.amount =
            element.amount + element.amount * this.selectedSurcharge;
          if (element.office) {
            element.office =
              parseFloat(element.office) +
              parseFloat(element.office) * this.selectedSurcharge;
          }
        });
        this.cbaoFees = res.data;
      });
  }

  fetchApplicationFees() {
    const application_id = this.applicationId;
    const office_id = 4;
    this.applicationFeeService
      .fetchFeesByOffice(application_id, office_id)
      .subscribe((res) => {
        this.cbaoFees = res.data;
        console.log(this.cbaoFees);
        this.isLoading = false;
        this.surcharge = this.cbaoFees.filter((e) => e.code == '9999');
        if (this.surcharge.length !== 0) {
          this.selectedSurcharge = parseFloat(this.surcharge[0].percentage);
          this.addFeeSurcharge();
        }
      });
  }
  canAddFee() {
    const status = this.applicationDetails.application_status_id;
    if (status == 3 || status == 12 || status == 13 || status == 18) {
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
