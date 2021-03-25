import { RepresentativeDetailsComponent } from './../../shared/representative-details/representative-details.component';
import { RemarksHistoryTableComponent } from './../../evaluator-dashboard/remarks-history-table/remarks-history-table.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { documentTypes } from '../../core/enums/document-type.enum';
import { documentStatus } from '../../core/enums/document-status.enum';
import { applicationTypes } from '../../core/enums/application-type.enum';
import { AuthService, UserService } from 'src/app/core';
import { ProjectDetailsComponent } from 'src/app/evaluator-dashboard/project-details/project-details.component';
import { FormDetailsComponent } from 'src/app/evaluator-dashboard/form-details/form-details.component';
import { applicationStatus } from '../../core/enums/application-status.enum';
import Swal from 'sweetalert2';
import { ViewFeesComponent } from 'src/app/evaluator-dashboard/view-fees/view-fees.component';
import { ApplicationFeesService } from 'src/app/core/services/application-fees.service';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss'],
})
export class ViewApplicationComponent implements OnInit {
  panelOpenState = false;

  public isLoading = true;
  public applicationId;
  public evaluatorDetails;
  public user;
  public pdfSrc;
  public applicationDetails;
  public applicationDate;
  public dataSource;

  displayedColumns: string[] = ['index', 'name', 'status', 'remarks', 'action'];

  constructor(
    private applicationService: ApplicationInfoService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private applicationFeeService: ApplicationFeesService
  ) {}
  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '1600px',
      data: {
        projectDetails: this.applicationDetails.project_detail,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  openRepresentativeDialog() {
    const dialogRef = this.dialog.open(RepresentativeDetailsComponent, {
      width: '1600px',
      data: {
        representativeDetails: this.applicationDetails.representative_detail,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  openFeesDialog() {
    this.applicationFeeService
      .fetchFees(this.applicationId)
      .subscribe((res) => {
        const dialogRef = this.dialog.open(ViewFeesComponent, {
          width: '1000px',
          data: {
            fees: res.data,
            applicationId: this.applicationId,
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
        });
      });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.applicationId = this.route.snapshot.params.id;
    this.fetchApplicationInfo();
    this.fetchUserDocs();
  }

  fetchApplicationInfo() {
    this.isLoading = true;
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationDetails = result.data;
        console.log(this.applicationDetails);
        this.isLoading = false;
      });
  }
  fetchUserDocs() {
    this.isLoading = true;
    this.applicationService
      .fetchUserDocs(this.applicationId)
      .subscribe((result) => {
        this.dataSource = result.data;
        this.isLoading = false;
      });
  }

  getDocType(id): string {
    return documentTypes[id];
  }
  getDocStatus(id): string {
    return documentStatus[id];
  }
  getApplicationStatus(id): string {
    return applicationStatus[id];
  }
  getApplicationType(id): string {
    return applicationTypes[id];
  }
  checkFormNonCompliant() {
    const isNonCompliant = this.dataSource.find(
      (form) => form.document_status_id == 2
    );
    return isNonCompliant;
  }
  onSave() {
    this.isLoading = true;
    if (!this.checkFormNonCompliant()) {
      if (this.checkDepartmentNonCompliant()) {
        const body = {
          application_status_id: 3,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            this.updateDepartmentStatus();
          });
      } else if (this.applicationDetails.cpdo_status_id == 2) {
        const body = {
          application_status_id: 2,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Success!',
              `Forwarded to CPDO Inspector for Evaluation!`,
              'success'
            ).then((result) => {
              this.isLoading = false;
              window.location.reload();
            });
          });
      } else if (this.applicationDetails.cpdo_cod_status_id == 2) {
        const body = {
          application_status_id: 10,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Success!',
              `Forwarded to CPDO Coordinator for re-evaluation!`,
              'success'
            ).then((result) => {
              this.isLoading = false;
              window.location.reload();
            });
          });
      } else if (this.applicationDetails.dc_status_id == 2) {
        const body = {
          application_status_id: 3,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            this.updateDepartmentStatus();
          });
      } else if (this.applicationDetails.bo_status_id == 2) {
        const body = {
          application_status_id: 13,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Success!',
              `Forwarded to Building Official for Re-Evaluation!`,
              'success'
            ).then((result) => {
              this.isLoading = false;
              window.location.reload();
            });
          });
      } else {
        const body = {
          application_status_id: 1,
          receiving_status_id: 0,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Success!',
              `Forwarded to CBAO Receiving for Evaluation!`,
              'success'
            ).then((result) => {
              this.isLoading = false;
              window.location.reload();
            });
          });
      }
    } else {
      Swal.fire(
        'Warning!',
        `Please check non-compliant douments!`,
        'warning'
      ).then((result) => {
        this.isLoading = false;
      });
    }
  }
  updateDepartmentStatus() {
    const app = this.applicationDetails;
    const status = [
      {
        parallel_cepmo_status_id: app.parallel_cepmo_status_id,
      },
      {
        parallel_bfp_status_id: app.parallel_bfp_status_id,
      },
      {
        parallel_cbao_status_id: app.parallel_cbao_status_id,
      },
    ];
    const isNonCompliant = status.forEach((dep) => {
      if (dep.parallel_cepmo_status_id == 2) {
        const body = {
          parallel_cepmo_status_id: 0,
        };
        this.updateApplication(body);
      } else if (dep.parallel_bfp_status_id == 2) {
        const body = {
          parallel_bfp_status_id: 0,
        };
        this.updateApplication(body);
      } else if (dep.parallel_cbao_status_id == 2) {
        const body = {
          parallel_cbao_status_id: 0,
        };
        this.updateApplication(body);
      }
    });
    return isNonCompliant;
  }

  updateApplication(body) {
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        console.log(res);
        Swal.fire('Success!', `Forwarded for Re-Evaluation!`, 'success').then(
          (result) => {
            this.isLoading = false;
            window.location.reload();
          }
        );
      });
  }

  checkDepartmentNonCompliant() {
    //checks if one department status is noncompoliant
    const app = this.applicationDetails;
    const status = [
      {
        id: app.parallel_cepmo_status_id,
      },
      {
        id: app.parallel_bfp_status_id,
      },
      {
        id: app.parallel_cbao_status_id,
      },
    ];
    const isNonCompliant = status.find((dep) => dep.id == 2);
    return isNonCompliant;
  }

  openFormDialog(element): void {
    console.log(element);
    const dialogRef = this.dialog.open(FormDetailsComponent, {
      width: '1500px',
      height: '2000px',
      data: {
        evaluator: this.evaluatorDetails,
        form: element,
        route: this.route,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  openRemarksHistory(e) {
    console.log(e);
    const dialogRef = this.dialog.open(RemarksHistoryTableComponent, {
      width: '1000px',
      height: '800px',
      data: {
        evaluator: this.evaluatorDetails,
        form: e,
        route: this.route,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
}
