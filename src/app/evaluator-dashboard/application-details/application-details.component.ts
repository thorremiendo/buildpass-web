import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { applicationStatus } from '../../core/enums/application-status.enum';
import Swal from 'sweetalert2';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { UserService } from 'src/app/core/services/user.service';
import { FeesDialogComponent } from '../fees-dialog/fees-dialog.component';
import { ApplicationFeesService } from 'src/app/core/services/application-fees.service';
import { officeTypes } from 'src/app/core/enums/offices.enum';
import { departmentStatus } from 'src/app/core/enums/department-status.enum';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss'],
})
export class ApplicationDetailsComponent implements OnInit {
  columnsToDisplay: string[] = [
    'number',
    'description',
    'office',
    'amount',
    'action',
  ];
  panelOpenState = false;
  public dataSource;
  public isLoading = true;
  public applicationId;
  public evaluatorDetails;
  public user;
  public pdfSrc;
  public applicationDetails;
  public evaluatorRole;
  public userDocuments;
  constructor(
    private router: Router,
    private applicationService: ApplicationInfoService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private applicationFeeService: ApplicationFeesService
  ) {}
  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '1000px',
      data: {
        projectDetails: this.applicationDetails.project_detail,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.applicationId = this.route.snapshot.params.id;
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationDetails = result.data;
        this.fetchEvaluatorDetails();
        this.fetchApplicationFees();
        this.fetchUserDocs();
        this.isLoading = false;
      });
  }
  fetchUserDocs() {
    this.isLoading = true;
    this.applicationService
      .fetchUserDocs(this.applicationId)
      .subscribe((res) => {
        this.userDocuments = res.data;
        if (this.applicationDetails.application_status_id == 3) {
          if (this.checkFormsCompliant()) {
            this.checkAllDepartmentStatus();
          }
        }
      });
  }

  checkFormsCompliant() {
    const isCompliant = this.userDocuments.every(
      (form) => form.document_status_id == 1
    );
    return isCompliant;
  }
  checkAllDepartmentStatus() {
    this.isLoading = true;
    const app = this.applicationDetails;
    if (
      app.parallel_bfp_status_id == 1 &&
      app.parallel_cbao_status_id == 1 &&
      app.parallel_cepmo_status_id == 1
    ) {
      const body = {
        application_status_id: 12,
      };
      this.applicationService
        .updateApplicationStatus(body, this.applicationId)
        .subscribe((res) => {
          Swal.fire(
            'All documents are compliant!!',
            `Notified Division Chief for Evaluation!`,
            'success'
          ).then((result) => {
            this.isLoading = false;
            this.ngOnInit();
          });
        });
    }
  }

  fetchApplicationFees() {
    const id = this.applicationId;
    this.applicationFeeService.fetchFees(id).subscribe((res) => {
      this.dataSource = res.data;
      console.log('datasource', this.dataSource);
    });
  }
  getOfficeType(id): string {
    return officeTypes[id];
  }
  getDepartmentStatus(id): string {
    return departmentStatus[id];
  }
  showAddItem() {
    const dialogRef = this.dialog.open(FeesDialogComponent, {
      width: '800px',
      data: {
        dataSource: this.dataSource,
        route: this.route,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
  onRemove(id) {
    this.applicationFeeService.deleteFee(id).subscribe((res) => {
      console.log(res);
    });
    this.ngOnInit();
  }

  fetchEvaluatorDetails() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.evaluatorDetails = this.user.employee_detail;
    this.evaluatorRole = this.user.user_roles[0].role[0];
    this.isLoading = false;
    console.log('evaluator details', this.evaluatorDetails);
  }
  getApplicationStatus(id): string {
    return applicationStatus[id];
  }
}
