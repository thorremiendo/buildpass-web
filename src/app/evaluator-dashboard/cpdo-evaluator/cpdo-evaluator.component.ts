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
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ZoningCertificateComponent } from '../zoning-certificate/zoning-certificate.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cpdo-evaluator',
  templateUrl: './cpdo-evaluator.component.html',
  styleUrls: ['./cpdo-evaluator.component.scss'],
})
export class CpdoEvaluatorComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'status', 'remarks', 'action'];
  public user;
  public dataSource;
  public forms;
  public applicationId;
  public evaluatorDetails;
  public evaluatorRole;
  public applicationDetails;
  public isLoading: boolean = true;
  public pdfSrc =
    'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/forms/Application_Form_for_Certificate_of_Zoning_Compliance-revised_by_TSA-Sept_4__2020+(1).pdf';
  constructor(
    private applicationService: ApplicationInfoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params.id;
    this.applicationService
      .fetchUserDocs(this.applicationId)
      .subscribe((result) => {
        this.forms = result.data;
        this.generateCpdoForms();
        this.fetchEvaluatorDetails();
        this.fetchApplicationDetails();
        this.checkFormsCompliant();
        this.checkFormsReviewed();
      });
    this.changeDetectorRefs.detectChanges();
  }
  fetchApplicationDetails() {
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        this.applicationDetails = res.data;
      });
  }
  checkFormNonCompliant() {
    const isNonCompliant = this.dataSource.find(
      (form) => form.document_status_id == 2
    );
    return isNonCompliant;
  }
  fetchEvaluatorDetails() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.evaluatorDetails = this.user.employee_detail;
    this.evaluatorRole = this.user.user_roles[0].role[0];
    console.log('Evaluator Role', this.evaluatorRole);
    this.isLoading = false;
  }
  generateCpdoForms() {
    const CPDO_FORMS = this.forms.filter(
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
    this.dataSource = CPDO_FORMS;
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
  openZoningDialog() {
    const dialogRef = this.dialog.open(ZoningCertificateComponent, {
      width: '1500px',
      height: '2000px',
      data: {
        evaluator: this.evaluatorDetails,
        form: this.forms,
        route: this.route,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
  nonCompliant() {
    if (this.checkFormsReviewed()) {
      const body = {
        application_status_id: 5,
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
          this.fetchApplicationDetails();
        });
    } else {
      Swal.fire(
        'Notice!',
        `Please review all documents first!`,
        'info'
      ).then((result) => {});
    }
  }
  checkFormsReviewed() {
    const isReviewed = this.dataSource.every(
      (form) => form.document_status_id == 1 || form.document_status_id == 2
    );
    return isReviewed;
  }
  forwardForApproval() {
    this.isLoading = true;
    if (this.checkFormsCompliant()) {
      const body = {
        application_status_id: 10,
      };
      this.applicationService
        .updateApplicationStatus(body, this.applicationId)
        .subscribe((res) => {
          Swal.fire(
            'Success!',
            `Forwarded to CPDO Coordinator for Approval of Clearance!`,
            'success'
          ).then((result) => {
            window.location.reload();
          });
          this.ngOnInit();
        });
    } else {
      Swal.fire('Notice!', `Please review all documents first!`, 'info').then(
        (result) => {
          this.isLoading = false;
        }
      );
    }
  }
  handleApprove() {
    this.isLoading = true;
    if (this.checkFormsCompliant()) {
      this.approveZoning();
    } else {
      Swal.fire('Notice!', `Please review all documents first!`, 'info').then(
        (result) => {
          this.isLoading = false;
        }
      );
    }
  }
  checkFormsCompliant() {
    const isReviewed = this.dataSource.every(
      (form) => form.document_status_id == 1
    );
    return isReviewed;
  }

  approveZoning() {
    const body = {
      application_status_id: 3,
      cpdo_status_id: 1,
    };
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        this.isLoading = false;
        Swal.fire('Success!', `Zoning Certificate Approved!`, 'success').then(
          (result) => {
            window.location.reload();
          }
        );
        this.ngOnInit();
      });
  }
}
