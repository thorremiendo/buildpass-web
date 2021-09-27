import { RemarksHistoryTableComponent } from './../remarks-history-table/remarks-history-table.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { FormDetailsComponent } from '../form-details/form-details.component';
import { documentStatus } from '../../core/enums/document-status.enum';
import { UserService } from 'src/app/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ZoningCertificateComponent } from '../zoning-certificate/zoning-certificate.component';
import Swal from 'sweetalert2';
import { NewApplicationService } from 'src/app/core/services/new-application.service';

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
  public documentTypes;
  public isLoading: boolean = true;
  public userDocuments = [];
  public pdfSrc =
    'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/forms/Application_Form_for_Certificate_of_Zoning_Compliance-revised_by_TSA-Sept_4__2020+(1).pdf';
  constructor(
    private applicationService: ApplicationInfoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private userService: UserService,
    private newApplicationService: NewApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchDocTypes();
    this.applicationId = this.route.snapshot.params.id;
  }
  fetchApplicationDetails() {
    this.isLoading = true;
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        this.isLoading = false;
        this.applicationDetails = res.data;
      });
  }
  checkFormNonCompliant() {
    const isNonCompliant = this.userDocuments.find(
      (form) => form.document_status_id == 2
    );
    return isNonCompliant;
  }
  fetchEvaluatorDetails() {
    this.isLoading = true;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.evaluatorDetails = this.user.employee_detail;
    this.evaluatorRole = this.user.user_roles[0].role[0];
    this.isLoading = false;
  }

  generateCpdoForms() {
    const CPDO_FORMS = this.forms.filter(
      (doc) =>
        doc.document_id == 1 ||
        doc.document_id == 28 ||
        doc.document_id == 26 ||
        doc.document_id == 27 ||
        doc.document_id == 23 ||
        doc.document_id == 24 ||
        doc.document_id == 25 ||
        doc.document_id == 27 ||
        doc.document_id == 43 ||
        doc.document_id == 59 ||
        doc.document_id == 74 ||
        doc.document_id == 75 ||
        doc.document_id == 72 ||
        doc.document_id == 33 ||
        doc.document_id == 140 ||
        doc.document_id == 194
    );
    this.dataSource = this.sortUserDocs(CPDO_FORMS);
    this.userDocuments = CPDO_FORMS;
  }

  sortUserDocs(docs) {
    const sortedForms = {
      forms: {
        label: 'Forms',
        data: [],
      },
      documents: {
        label: 'Documentary Requirements',
        data: [],
      },
      plans: {
        label: 'Plans, Designs, Specifications, Cost Estimate',
        data: [],
      },
      professional: {
        label:
          'Photocopy of Professional Details (Professional Tax Receipt and Professional Regulation Commission ID, signed and sealed)',
        data: [],
      },
      affidavits: {
        label: 'Affidavits',
        data: [],
      },
      others: {
        label: 'Others',
        data: [],
      },
    };

    docs.forEach((element) => {
      const docType =
        this.documentTypes[element.document_id - 1].document_category_id;
      switch (docType) {
        case 1:
          sortedForms.forms.data.push(element);
          break;
        case 2:
          sortedForms.documents.data.push(element);
          break;
        case 3:
          sortedForms.plans.data.push(element);
          break;
        case 4:
          sortedForms.professional.data.push(element);
          break;
        case 5:
          sortedForms.affidavits.data.push(element);
          break;
        default:
          sortedForms.others.data.push(element);
          break;
      }
    });

    let sortedData = Object.values(sortedForms);
    sortedData = [
      {
        label: sortedData[0].data.length ? sortedData[0].label : 'hidden',
      },
      ...sortedData[0].data,
      {
        label: sortedData[1].data.length ? sortedData[1].label : 'hidden',
      },
      ...sortedData[1].data,
      {
        label: sortedData[2].data.length ? sortedData[2].label : 'hidden',
      },
      ...sortedData[2].data,
      {
        label: sortedData[3].data.length ? sortedData[3].label : 'hidden',
      },
      ...sortedData[3].data,
      {
        label: sortedData[4].data.length ? sortedData[4].label : 'hidden',
      },
      ...sortedData[4].data,
      {
        label: sortedData[5].data.length ? sortedData[5].label : 'hidden',
      },
      ...sortedData[5].data,
    ];

    return sortedData;
  }

  getDocType(id): string {
    return this.documentTypes[id - 1].name;
  }
  getDocStatus(id): string {
    if (
      this.applicationDetails.cpdo_status_id == '1' &&
      this.applicationDetails.cpdo_cod_status_id == '1'
    ) {
      return 'Compliant';
    }
    return documentStatus[id];
  }

  openFormDialog(element): void {
    if (
      this.applicationDetails.application_status_id == 10 &&
      this.evaluatorRole.code !== 'CPDO-COD'
    ) {
      Swal.fire('Info!', `Action not allowed!`, 'info').then((result) => {});
    } else {
      const dialogRef = this.dialog.open(FormDetailsComponent, {
        width: '1500px',
        height: '2000px',
        data: {
          evaluator: this.evaluatorDetails,
          form: element,
          route: this.route,
          application: this.applicationDetails,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.ngOnInit();
      });
    }
  }
  openZoningDialog() {
    const dialogRef = this.dialog.open(ZoningCertificateComponent, {
      width: '1500px',
      height: '400px',
      data: {
        evaluator: this.evaluatorDetails,
        form: this.forms,
        route: this.route,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  nonCompliant() {
    if (this.checkFormsReviewed()) {
      Swal.fire({
        title: 'Are you sure?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Yes`,
        confirmButtonColor: '#330E08',
        denyButtonColor: '#D2AB48',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          if (this.evaluatorRole.code == 'CPDO-ZI') {
            const body = {
              application_status_id: 5,
              cpdo_status_id: 2,
            };
            this.applicationService
              .updateApplicationStatus(body, this.applicationId)
              .subscribe((res) => {
                this.isLoading = false;
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
            //CPDO COORDINATOR
            const body = {
              application_status_id: 5,
              cpdo_cod_status_id: 2,
            };
            this.applicationService
              .updateApplicationStatus(body, this.applicationId)
              .subscribe((res) => {
                this.isLoading = false;
                Swal.fire(
                  'Success!',
                  `Notified Applicant for Revision!`,
                  'success'
                ).then((result) => {
                  window.location.reload();
                });
                this.fetchApplicationDetails();
              });
          }
        } else if (result.isDenied) {
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
      Swal.fire('Notice!', `Please review all documents first!`, 'info').then(
        (result) => {}
      );
    }
  }
  checkFormsReviewed() {
    const isReviewed = this.userDocuments.every(
      (form) => form.document_status_id == 1 || form.document_status_id == 2
    );
    return isReviewed;
  }
  forwardToCpdoCoordinator() {
    this.isLoading = true;
    if (this.checkFormsCompliant()) {
      const body = {
        application_status_id: 10,
        cpdo_status_id: 1,
      };
      this.applicationService
        .updateApplicationStatus(body, this.applicationId)
        .subscribe((res) => {
          this.isLoading = false;
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
  handleReject() {
    this.isLoading = false;
    const body = {
      application_status_id: 16,
    };

    Swal.fire({
      title: 'Are you sure?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            this.isLoading = false;
            Swal.fire('Success!', `Application Denied!`, 'success').then(
              (result) => {
                window.location.reload();
              }
            );
            this.ngOnInit();
          });
      } else if (result.isDenied) {
      }
    });
  }
  handleApprove() {
    this.isLoading = true;
    if (this.checkCertificateUploaded()) {
      if (this.checkFormsCompliant()) {
        this.approveZoning();
      } else {
        Swal.fire('Notice!', `Please review all documents first!`, 'info').then(
          (result) => {
            this.isLoading = false;
          }
        );
      }
    } else {
      Swal.fire(
        'Notice!',
        `Please Upload Zoning Clearance Certificate!`,
        'warning'
      ).then((result) => {
        this.isLoading = false;
      });
    }
  }

  checkCertificateUploaded() {
    const find = this.userDocuments.find((form) => form.document_id == 43);
    return find;
  }
  checkFormsCompliant() {
    const isReviewed = this.userDocuments.every(
      (form) => form.document_status_id == 1
    );
    return isReviewed;
  }

  updateFormStatus() {
    this.isLoading = true;
    this.forms.forEach((element) => {
      if (
        element.document_id !== 43 &&
        element.document_id !== 1 &&
        element.document_id !== 194
      ) {
        let body = {
          document_status_id: 0,
        };
        this.newApplicationService
          .updateDocumentFile(body, element.id)
          .subscribe((res) => {});
      }
    });
    this.updateApplicationStatus();
  }

  updateApplicationStatus() {
    const body = {
      application_status_id: 3,
      cpdo_cod_status_id: 1,
    };
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        this.isLoading = false;
        Swal.fire('Success!', `BFP, CEPMO, CBAO Notified`, 'success').then(
          (result) => {}
        );
        this.ngOnInit();
      });
  }

  approveZoning() {
    this.isLoading = true;
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
  openRemarksHistory(e) {
    const dialogRef = this.dialog.open(RemarksHistoryTableComponent, {
      width: '1000px',
      height: '800px',
      data: {
        evaluator: this.evaluatorDetails,
        evaluatorRole: this.evaluatorRole,
        applicationInfo: this.applicationDetails,
        form: e,
        route: this.route,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  goToEsig(id) {
    this.router.navigate(['/evaluator/application', this.applicationId, id]);
  }
  fetchDocTypes() {
    this.newApplicationService.fetchDocumentTypes().subscribe((res) => {
      this.documentTypes = res.data;
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
    });
  }
}
