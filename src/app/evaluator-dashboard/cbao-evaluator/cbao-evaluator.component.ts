import { NewApplicationService } from './../../core/services/new-application.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { FormDetailsComponent } from '../form-details/form-details.component';
import { documentTypes } from '../../core/enums/document-type.enum';
import { documentStatus } from '../../core/enums/document-status.enum';
import { UserService } from 'src/app/core';
import Swal from 'sweetalert2';
import { ReleaseBldgPermitComponent } from '../release-bldg-permit/release-bldg-permit.component';

@Component({
  selector: 'app-cbao-evaluator',
  templateUrl: './cbao-evaluator.component.html',
  styleUrls: ['./cbao-evaluator.component.scss'],
})
export class CbaoEvaluatorComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'status', 'remarks', 'action'];
  public user;
  public dataSource;
  public applicationId;
  public applicationInfo;
  public evaluatorDetails;
  public isLoading: boolean = true;
  public evaluatorRole;

  public pdfSrc =
    'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/forms/Application_Form_for_Certificate_of_Zoning_Compliance-revised_by_TSA-Sept_4__2020+(1).pdf';
  constructor(
    private applicationService: ApplicationInfoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private newApplicationService: NewApplicationService
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params.id;
    this.applicationService
      .fetchUserDocs(this.applicationId)
      .subscribe((result) => {
        this.dataSource = result.data;
        console.log('User Docs', this.dataSource);
        this.fetchEvaluatorDetails();
        this.checkFormsCompliant();
        this.checkFormsReviewed();
        this.isLoading = false;
      });
    this.fetchApplicationInfo();
    this.changeDetectorRefs.detectChanges();
  }

  fetchApplicationInfo() {
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        console.log('Application Info:', res);
        this.applicationInfo = res.data;
      });
  }

  fetchEvaluatorDetails() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.evaluatorDetails = this.user.employee_detail;
    this.evaluatorRole = this.user.user_roles[0].role[0];
    console.log('Evaluator Details', this.evaluatorRole);
  }

  getDocType(id): string {
    return documentTypes[id];
  }
  getDocStatus(id): string {
    return documentStatus[id];
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

  checkFormsCompliant() {
    const isCompliant = this.dataSource.every(
      (form) => form.document_status_id == 1
    );
    return isCompliant;
  }
  checkBuildingPermitUploaded() {
    const find = this.dataSource.find((form) => form.document_id == 50);
    return find;
  }

  checkFormNonCompliant() {
    const isNonCompliant = this.dataSource.find(
      (form) => form.document_status_id == 2
    );
    return isNonCompliant;
  }
  checkFormsReviewed() {
    const isReviewed = this.dataSource.every(
      (form) => form.document_status_id == 1 || form.document_status_id == 2
    );
    return isReviewed;
  }

  nonCompliant() {
    if (this.checkFormsReviewed()) {
      if (this.applicationInfo.application_status_id == 3) {
        const body = {
          parallel_cbao_status_id: 2,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire('Success!', `Updated CBAO Status!`, 'success').then(
              (result) => {
                window.location.reload();
              }
            );
          });
      } else if (this.evaluatorRole.code == 'CBAO-DC') {
        const body = {
          application_status_id: 5,
          dc_status_id: 2,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Success!',
              `Notified Applicant for Revision!`,
              'success'
            ).then((result) => {
              window.location.reload();
            });
          });
      } else if (this.evaluatorRole.code == 'CBAO-BO') {
        const body = {
          application_status_id: 5,
          bo_status_id: 2,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Success!',
              `Notified Applicant for Revision!`,
              'success'
            ).then((result) => {
              window.location.reload();
            });
          });
      }
    } else {
      Swal.fire(
        'Notice!',
        `Please review all documents first!`,
        'info'
      ).then((result) => {});
    }
  }

  updateFormStatus() {
    this.isLoading = true;
    const CPDO_FORMS = this.dataSource.filter(
      (obj) =>
        obj.document_id == 1 ||
        obj.document_id == 28 ||
        obj.document_id == 26 ||
        obj.document_id == 27 ||
        obj.document_id == 23 ||
        obj.document_id == 24 ||
        obj.document_id == 27 ||
        obj.document_id == 43
    );
    const forReview = CPDO_FORMS.forEach((element) => {
      let body = {
        document_status_id: 0,
      };
      this.newApplicationService
        .updateDocumentFile(body, element.id)
        .subscribe((res) => {});
    });
    this.updateApplicationStatus();
    console.log(forReview);
    return forReview;
  }

  updateApplicationStatus() {
    const body = {
      application_status_id: 2,
    };
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        this.fetchApplicationInfo();
        Swal.fire('Success!', `Forwarded to CPDO!`, 'success').then(
          (result) => {
            this.isLoading = false;
            window.location.reload();
          }
        );
      });
  }
  forwardToCpdo() {
    if (this.checkFormsCompliant()) {
      this.updateFormStatus();
    } else {
      Swal.fire('Notice!', `Please review all documents first!`, 'info').then(
        (result) => {
          this.isLoading = false;
        }
      );
    }
  }
  notifyBuildingOfficial() {
    this.isLoading = true;
    if (this.checkFormsCompliant()) {
      const body = {
        application_status_id: 13,
        dc_status_id: 1,
      };
      this.applicationService
        .updateApplicationStatus(body, this.applicationId)
        .subscribe((res) => {
          Swal.fire(
            'Success!',
            `Forwarded to Building Official!`,
            'success'
          ).then((result) => {
            window.location.reload();
          });
        });
    } else {
      Swal.fire('Notice!', `Please review all documents first!`, 'info').then(
        (result) => {
          this.isLoading = false;
        }
      );
    }
  }
  forPayment() {
    this.isLoading = true;
    if (this.checkFormsCompliant) {
      const body = {
        application_status_id: 8,
        bo_status_id: 1,
      };
      this.applicationService
        .updateApplicationStatus(body, this.applicationId)
        .subscribe((res) => {
          Swal.fire(
            'Success!',
            `Building Permit Application Approved! Notified Applicant for Payment`,
            'success'
          ).then((result) => {
            this.isLoading = false;
            window.location.reload();
          });
        });
    } else {
      Swal.fire(
        'Warning!',
        `Please review all documents first!`,
        'warning'
      ).then((result) => {
        this.isLoading = false;
      });
    }
  }
  handleDepartmentStatus() {
    if (this.checkFormsCompliant()) {
      const body = {
        parallel_cbao_status_id: 1,
      };
      this.applicationService
        .updateApplicationStatus(body, this.applicationId)
        .subscribe((res) => {
          Swal.fire('Success!', `CBAO Evaluation Done!`, 'success').then(
            (result) => {
              this.isLoading = false;
              window.location.reload();
            }
          );
        });
    } else {
      Swal.fire('Warning!', `Please Review All Documents!`, 'warning').then(
        (result) => {
          this.isLoading = false;
        }
      );
    }
  }
  handleRelease() {
    const body = {
      application_status_id: 11,
    };
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        Swal.fire('Success!', `Building Permit Released!`, 'success').then(
          (result) => {
            window.location.reload();
          }
        );
      });
  }
  openBldgPermitDialog() {
    const dialogRef = this.dialog.open(ReleaseBldgPermitComponent, {
      width: '1500px',
      height: '2000px',
      data: {
        evaluator: this.evaluatorDetails,
        form: this.applicationInfo,
        route: this.route,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
}
