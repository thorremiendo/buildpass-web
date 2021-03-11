import { BfpResidentialChecklistComponent } from './../bfp-residential-checklist/bfp-residential-checklist.component';
import { RemarksHistoryTableComponent } from './../remarks-history-table/remarks-history-table.component';
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
import { FireClearanceComponent } from '../fire-clearance/fire-clearance.component';

@Component({
  selector: 'app-bfp-evaluator',
  templateUrl: './bfp-evaluator.component.html',
  styleUrls: ['./bfp-evaluator.component.scss'],
})
export class BfpEvaluatorComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'status', 'remarks', 'action'];
  public user;
  public dataSource;
  public forms;
  public applicationId;
  public evaluatorDetails;
  public applicationDetails;
  public isLoading: boolean = true;

  constructor(
    private applicationService: ApplicationInfoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.applicationId = this.route.snapshot.params.id;
    this.fetchApplicationDetails();
    this.applicationService
      .fetchUserDocs(this.applicationId)
      .subscribe((result) => {
        this.forms = result.data;
        this.generateBfpForms();
        this.fetchEvaluatorDetails();
        this.isLoading = false;
      });
    this.changeDetectorRefs.detectChanges();
  }

  checkFormsCompliant() {
    this.generateBfpForms();
    const isCompliant = this.dataSource.every(
      (form) => form.document_status_id == 1
    );
    return isCompliant;
  }
  fetchEvaluatorDetails() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.evaluatorDetails = this.user.employee_detail;
    console.log('Evaluator Details', this.evaluatorDetails);
    this.isLoading = false;
  }
  fetchApplicationDetails() {
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        console.log('Application Info:', res);
        this.applicationDetails = res.data;
      });
  }
  generateBfpForms() {
    const BFP_FORMS = this.forms.filter(
      (obj) =>
        obj.document_id == 28 ||
        obj.document_id == 32 ||
        obj.document_id == 33 ||
        obj.document_id == 43 ||
        obj.document_id == 45 ||
        obj.document_id == 29 ||
        obj.document_id == 30 ||
        obj.document_id == 31 ||
        obj.document_id == 59 ||
        obj.document_id == 62 ||
        obj.document_id == 65 ||
        obj.document_id == 49
    );
    this.dataSource = BFP_FORMS;
  }
  getDocType(id): string {
    return documentTypes[id];
  }
  getDocStatus(id): string {
    return documentStatus[id];
  }
  openFsecDialog() {
    const dialogRef = this.dialog.open(FireClearanceComponent, {
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
      window.location.reload();
    });
  }
  openChecklistDialog() {
    const dialogRef = this.dialog.open(BfpResidentialChecklistComponent, {
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
      window.location.reload();
    });
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
  nonCompliant() {
    this.isLoading = true;
    if (this.checkFormsReviewed()) {
      const body = {
        parallel_bfp_status_id: 2,
      };
      this.applicationService
        .updateApplicationStatus(body, this.applicationId)
        .subscribe((res) => {
          this.isLoading = false;
          Swal.fire('Success!', `Updated BFP Status!`, 'success').then(
            (result) => {
              window.location.reload();
            }
          );
        });
    } else {
      this.isLoading = false;
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

  compliant() {
    this.isLoading = true;
    if (this.checkFireSecUploaded() && this.checkChecklistUploaded()) {
      const body = {
        parallel_bfp_status_id: 1,
      };
      this.applicationService
        .updateApplicationStatus(body, this.applicationId)
        .subscribe((res) => {
          this.isLoading = false;
          Swal.fire('Success!', `Updated BFP Status!`, 'success').then(
            (result) => {
              window.location.reload();
            }
          );
        });
    } else {
      Swal.fire('Warning!', `Please Upload FSEC & Checklist!`, 'warning').then(
        (result) => {
          this.isLoading = false;
        }
      );
    }
  }

  checkFireSecUploaded() {
    this.generateBfpForms();
    const find = this.dataSource.find((form) => form.document_id == 45);
    return find;
  }
  checkChecklistUploaded() {
    this.generateBfpForms();
    const find = this.dataSource.find((form) => form.document_id == 49);
    return find;
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
