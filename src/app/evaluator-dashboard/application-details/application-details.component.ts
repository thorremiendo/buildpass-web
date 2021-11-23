import { SchedulingService } from './../../core/services/scheduling.service';
import { AddInspectionComponent } from './../add-inspection/add-inspection.component';
import { AppTitleService } from './../../core/services/app-title.service';
import { AssociateOldBpComponent } from './../../shared/associate-old-bp/associate-old-bp.component';
import { OccupancyService } from './../../core/services/occupancy.service';
import { OldBpDetailsComponent } from './../../shared/old-bp-details/old-bp-details.component';
import { UploadedIdentificationComponent } from './../../shared/uploaded-identification/uploaded-identification.component';
import { RepresentativeDetailsComponent } from './../../shared/representative-details/representative-details.component';
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
import { constructionType } from '../../core/enums/construction-type.enum';
import { InputPermitNumberComponent } from '../input-permit-number/input-permit-number.component';

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
  public oldBpInputs = [];
  public oldBpInfo = [];
  public inspections = [];
  constructor(
    private applicationService: ApplicationInfoService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router,
    private occupancyService: OccupancyService,
    private appTitle: AppTitleService,
    private inspection: SchedulingService
  ) {}
  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '1000px',
      data: {
        projectDetails: this.applicationDetails.project_detail,
        applicationId: this.applicationId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openInputPermitNumber(): void {
    const dialogRef = this.dialog.open(InputPermitNumberComponent, {
      width: '1000px',
      data: {
        applicationDetails: this.applicationDetails,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  ngOnInit(): void {
    this.appTitle.setTitle('BuildPASS');
    this.isLoading = true;
    this.applicationId = this.route.snapshot.params.id;
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationDetails = result.data;
        this.fetchApplicationInspections();
        this.fetchEvaluatorDetails();
        this.fetchUserDocs();
        if (this.applicationDetails.associated_released_permits.length > 0)
          this.fetchOldBpDetails();
      });
  }

  openRepresentativeDialog() {
    const dialogRef = this.dialog.open(RepresentativeDetailsComponent, {
      width: '1200px',
      data: {
        representativeDetails: this.applicationDetails.representative_detail,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  getConstructionType(id): string {
    return constructionType[id];
  }

  openOldBpDialog() {
    const dialogRef = this.dialog.open(OldBpDetailsComponent, {
      data: {
        application: this.applicationDetails,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  openAssociateBp(data) {
    this.applicationDetails.associated_released_permits.forEach((element) => {
      if (element.old_permit_number == data.BUILDING_PERMIT_NUMBER) {
        const dialogRef = this.dialog.open(AssociateOldBpComponent, {
          data: {
            application: this.applicationDetails,
            oldBpInfo: element,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {});
      }
    });
  }

  deleteAssoicatedBp(data) {
    const find = this.applicationDetails.associated_released_permits.forEach(
      (element) => {
        if (element.old_permit_number == data.BUILDING_PERMIT_NUMBER) {
          this.occupancyService
            .deleteOldBp(this.applicationDetails.id, element.id)
            .subscribe((res) => {
              window.location.reload();
            });
        }
      }
    );
  }

  fetchOldBpDetails() {
    this.applicationDetails.associated_released_permits.forEach((element) => {
      this.occupancyService
        .fetchSpecificOldBp(element.old_permit_number)
        .subscribe((res) => {
          this.oldBpInfo.push(res.data[0]);
        });
    });
  }

  getConfirmationStatus(permitNumber) {
    const status = this.applicationDetails.associated_released_permits.find(
      (e) => {
        return permitNumber == e.old_permit_number;
      }
    );
    return status;
  }

  openUploadedId(id) {
    let image;
    switch (id) {
      case 1:
        image = this.applicationDetails.user_detail.id_photo_path;
        break;
      case 2:
        image = this.applicationDetails.user_detail.selfie_with_id_path;
        break;
      default:
        break;
    }
    const dialogRef = this.dialog.open(UploadedIdentificationComponent, {
      width: '1200px',
      data: {
        image: image,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  fetchUserDocs() {
    this.applicationService
      .fetchUserDocs(this.applicationId)
      .subscribe((res) => {
        this.userDocuments = res.data;
        if (this.applicationDetails.application_status_id == 3) {
          this.checkIfParallelEvaluationDone();
        } else {
          this.isLoading = false;
        }
      });
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
          });
      } else if (this.applicationDetails.dc_status_id == 2) {
        const body = {
          application_status_id: 12,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Parallel Evaluation Done',
              `Forwarded to Division Chief!`,
              'warning'
            ).then((result) => {
              this.isLoading = false;
              this.ngOnInit();
            });
          });
      } else if (this.applicationDetails.bo_status_id == 2) {
        const body = {
          application_status_id: 13,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Parallel Evaluation Done',
              `Forwarded to Building Official!`,
              'warning'
            ).then((result) => {
              this.isLoading = false;
              this.ngOnInit();
            });
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
        cbao_status_id: 1,
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
    console.log(this.evaluatorRole);
    this.isLoading = false;
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

  fetchApplicationInspections() {
    this.inspection
      .getApplicationInspections(this.applicationId)
      .subscribe((res) => {
        this.inspections = res.data;
        console.log(this.inspections);
      });
  }
  openScheduler() {
    const dialogRef = this.dialog.open(AddInspectionComponent, {
      width: '1000px',
      height: '1200px',
      position: { right: '0' },
      data: {
        evaluator: this.evaluatorDetails,
        application: this.applicationDetails,
      },
    });
    const sub = dialogRef.componentInstance.onClose.subscribe(() => {
      this.fetchApplicationInspections();
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  goToApplication(id) {
    console.log(id);
    this.router.navigate(['evaluator/application', id]);
  }
}
