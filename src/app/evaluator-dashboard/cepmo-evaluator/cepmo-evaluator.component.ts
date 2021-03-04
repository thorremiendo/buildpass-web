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
import { WwwmsCertificateComponent } from '../wwwms-certificate/wwwms-certificate.component';

@Component({
  selector: 'app-cepmo-evaluator',
  templateUrl: './cepmo-evaluator.component.html',
  styleUrls: ['./cepmo-evaluator.component.scss'],
})
export class CepmoEvaluatorComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'status', 'remarks', 'action'];
  public user;
  public dataSource;
  public forms;
  public applicationId;
  public evaluatorDetails;
  public isLoading: boolean = true;
  public evaluatorRole;
  public applicationDetails;

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
        this.generateCepmoForms();
        this.fetchEvaluatorDetails();
        this.fetchApplicationDetails();
      });
    this.changeDetectorRefs.detectChanges();
  }
  fetchApplicationDetails() {
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationDetails = result.data;
        this.isLoading = false;
      });
  }
  fetchEvaluatorDetails() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.evaluatorDetails = this.user.employee_detail;
    this.evaluatorRole = this.user.user_roles[0].role[0];
    console.log('Evaluator Details', this.evaluatorDetails);
    this.isLoading = false;
  }
  generateCepmoForms() {
    const CEPMO_FORMS = this.forms.filter(
      (obj) =>
        obj.document_id == 43 ||
        obj.document_id == 28 ||
        obj.document_id == 34 ||
        obj.document_id == 35 ||
        obj.document_id == 36 ||
        obj.document_id == 44 ||
        obj.document_id == 59 ||
        obj.document_id == 63
    );
    this.dataSource = CEPMO_FORMS;
  }
  getDocType(id): string {
    return documentTypes[id];
  }
  getDocStatus(id): string {
    return documentStatus[id];
  }
  openWwmsDialog() {
    const dialogRef = this.dialog.open(WwwmsCertificateComponent, {
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
    if (this.checkFormsReviewed()) {
      const body = {
        parallel_cepmo_status_id: 2,
      };
      this.applicationService
        .updateApplicationStatus(body, this.applicationId)
        .subscribe((res) => {
          Swal.fire('Success!', `Updated CEPMO Status!`, 'success').then(
            (result) => {
              window.location.reload();
            }
          );
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

  checkFormsCompliant() {
    this.generateCepmoForms;
    const isCompliant = this.dataSource.every(
      (form) => form.document_status_id == 1
    );
    return isCompliant;
  }
  compliant() {
    if (this.checkWwmsUploaded()) {
      const body = {
        parallel_cepmo_status_id: 1,
      };
      this.applicationService
        .updateApplicationStatus(body, this.applicationId)
        .subscribe((res) => {
          Swal.fire('Success!', `Updated CEPMO Status!`, 'success').then(
            (result) => {
              window.location.reload();
            }
          );
        });
    } else {
      Swal.fire(
        'Warning!',
        `Please Upload WWMS BP Certificate!`,
        'warning'
      ).then((result) => {});
    }
  }
  checkWwmsUploaded() {
    this.generateCepmoForms();
    const find = this.dataSource.find((form) => form.document_id == 44);
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
