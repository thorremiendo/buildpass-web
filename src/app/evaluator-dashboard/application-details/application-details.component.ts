import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { applicationStatus } from '../../core/enums/application-status.enum';
import Swal from 'sweetalert2';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { officeTypes } from 'src/app/core/enums/offices.enum';
import { departmentStatus } from 'src/app/core/enums/department-status.enum';
import { applicationTypes } from '../../core/enums/application-type.enum';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss'],
})
export class ApplicationDetailsComponent implements OnInit {
  panelOpenState = false;
  public applicationFee;
  public isLoading = true;
  public applicationId;
  public evaluatorDetails;
  public user;
  public pdfSrc;
  public applicationDetails;
  public evaluatorRole;
  public userDocuments;

  constructor(
    private applicationService: ApplicationInfoService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router
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
        this.fetchUserDocs();
        this.isLoading = false;
      });
    this.isLoading = false;
  }

  fetchUserDocs() {
    this.isLoading = true;
    this.applicationService
      .fetchUserDocs(this.applicationId)
      .subscribe((res) => {
        this.userDocuments = res.data;
        if (this.applicationDetails.application_status_id == 3) {
          this.checkIfParallelEvaluationDone();
        }
      });
    this.isLoading = false;
  }

  checkIfParallelEvaluationDone() {
    if (this.checkIfAllFormsCompliant()) {
      this.checkIfAllOfficesCompliant();
    } else if (this.checkIfAllOfficesReviewed()) {
      if (this.checkOfficeNonCompliant()) {
        const body = {
          application_status_id: 12,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Non Compliant',
              `Forwarded to Division Chief for Evaluation!`,
              'warning'
            ).then((result) => {
              this.isLoading = false;
              this.ngOnInit();
            });
            this.isLoading = false;
          });
      }
    }
  }

  checkIfAllFormsCompliant() {
    const isCompliant = this.userDocuments.every(
      (form) => form.document_status_id == 1
    );
    return isCompliant;
  }
  checkIfAllOfficesCompliant() {
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
    this.isLoading = false;
  }

  getOfficeType(id): string {
    return officeTypes[id];
  }
  getDepartmentStatus(id): string {
    return departmentStatus[id];
  }
  getApplicationType(id): string {
    return applicationTypes[id];
  }
  fetchEvaluatorDetails() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.evaluatorDetails = this.user.employee_detail;
    this.evaluatorRole = this.user.user_roles[0].role[0];
    this.isLoading = false;
    console.log('evaluator details', this.evaluatorDetails);
  }
  getApplicationStatus(id): string {
    return applicationStatus[id];
  }

  checkIfAllOfficesReviewed() {
    //checks if all departments are done with review
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
    const isReviewed = status.every((dep) => dep.id == 1 || dep.id == 2);
    console.log('every', isReviewed);
    return isReviewed;
  }
  checkOfficeNonCompliant() {
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
}
