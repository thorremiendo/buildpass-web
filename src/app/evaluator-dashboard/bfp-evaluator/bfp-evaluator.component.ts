import { NewApplicationService } from './../../core/services/new-application.service';
import { BfpResidentialChecklistComponent } from './../bfp-residential-checklist/bfp-residential-checklist.component';
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
import { FireClearanceComponent } from '../fire-clearance/fire-clearance.component';
import { EsignatureService } from 'src/app/core/services/esignature.service';
import { ApplicationFeesService } from 'src/app/core/services/application-fees.service';
import { FormControl } from '@angular/forms';

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
  public evaluatorRole;
  public documentTypes;
  public userDocuments = [];
  public bfpFees;
  public searchKey = new FormControl('');
  public unfilteredData = [];

  constructor(
    private applicationService: ApplicationInfoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private userService: UserService,
    private newApplicationService: NewApplicationService,
    private eSignatureService: EsignatureService,
    private router: Router,
    private applicationFeeService: ApplicationFeesService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchDocTypes();
    this.applicationId = this.route.snapshot.params.id;
    this.fetchApplicationDetails();

    this.changeDetectorRefs.detectChanges();

    this.searchKey.valueChanges.subscribe((res) => {
      this.dataSource = this.sortUserDocs(
        this.unfilteredData.filter(document => {
          const docName = document.docName;
          if (docName && docName.toLowerCase().includes(res.toLowerCase())) return true;
          else return false;
        })
      );
    });
  }

  checkBfpParallelDocs() {
    this.isLoading = true;
    const findDoc = this.userDocuments.forEach((e) => {
      if (e.document_id == 62 || e.document_id == 32 || e.document_id == 33) {
        if (e.cbao_status_id == 1 && e.bfp_status_id == 1) {
          const id = e.id;
          const body = {
            document_status_id: 1,
          };
          this.newApplicationService
            .updateDocumentFile(body, id)
            .subscribe((res) => {
              this.isLoading = false;
            });
        }
      }
    });
  }

  checkFormsCompliant() {
    this.generateBfpForms();
    const isCompliant = this.userDocuments.every(
      (form) => form.bfp_status_id == 1
    );
    return isCompliant;
  }
  fetchEvaluatorDetails() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.evaluatorDetails = this.user.employee_detail;
    this.evaluatorRole = this.user.user_roles[0].role[0];
    this.isLoading = false;
  }
  fetchApplicationDetails() {
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        this.applicationDetails = res.data;
      });
  }
  generateBfpForms() {
    const BFP_FORMS = this.forms.filter(
      (obj) =>
        obj.document_id == 32 ||
        obj.document_id == 33 ||
        obj.document_id == 43 ||
        obj.document_id == 59 ||
        obj.document_id == 62 ||
        obj.document_id == 45 ||
        obj.document_id == 49 ||
        obj.document_id == 140 ||
        obj.document_id == 203 ||
        obj.document_id == 204 ||
        obj.document_id == 77 ||
        obj.document_id == 78 ||
        obj.document_id == 92 ||
        obj.document_id == 205 ||
        obj.document_id == 206 ||
        obj.document_id == 194 ||
        obj.document_id == 65 ||
        obj.document_id == 79
    );
    this.dataSource = this.sortUserDocs(BFP_FORMS);
    this.userDocuments = BFP_FORMS;
    this.unfilteredData = BFP_FORMS;
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
      const docName = 
        this.documentTypes[element.document_id - 1].name;
      element.docName = docName;

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
      this.ngOnInit();
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
      this.ngOnInit();
    });
  }

  openFormDialog(element): void {
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
      Swal.fire('Notice!', `Please review all documents first!`, 'info').then(
        (result) => {}
      );
    }
  }
  checkFormsReviewed() {
    const isReviewed = this.userDocuments.every(
      (form) => form.bfp_status_id == 1 || form.bfp_status_id == 2
    );
    return isReviewed;
  }

  compliant() {
    this.isLoading = true;
    if (this.applicationDetails.permit_type_id == 1) {
      if (this.checkFireSecUploaded() && this.checkChecklistUploaded()) {
        const application_id = this.applicationId;
        const office_id = 3;
        this.applicationFeeService
          .fetchFeesByOffice(application_id, office_id)
          .subscribe((res) => {
            this.bfpFees = res.data;
            if (this.bfpFees[this.bfpFees.length - 1].office !== 0) {
              this.updateBfpStatus();
            } else {
              Swal.fire('Notice!', `Please add BFP Fees!`, 'warning').then(
                (result) => {
                  window.location.reload();
                  this.isLoading = false;
                }
              );
            }
          });
      } else {
        Swal.fire(
          'Warning!',
          `Please Upload FSEC & Checklist!`,
          'warning'
        ).then((result) => {
          this.isLoading = false;
        });
      }
    } else if (this.applicationDetails.permit_type_id == 2) {
      this.updateBfpStatus();
    }
  }

  updateBfpStatus() {
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
  }

  checkFireSecUploaded() {
    this.generateBfpForms();
    const find = this.userDocuments.find((form) => form.document_id == 45);
    return find;
  }
  checkChecklistUploaded() {
    this.generateBfpForms();
    const find = this.userDocuments.find((form) => form.document_id == 49);
    return find;
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
          this.generateBfpForms();
          this.fetchEvaluatorDetails();
          this.checkBfpParallelDocs();
          this.isLoading = false;
        });
    });
  }

  reviewDone() {
    const notEvaluated = this.userDocuments.every(
      (form) => form.bfp_status_id == 0
    );
    if (notEvaluated) {
      Swal.fire('Notice!', `Pleae evaluate a document!`, 'info').then(
        (result) => {}
      );
    } else {
      const allEvaluated = this.userDocuments.every(
        (form) => form.bfp_status_id !== 0
      );
      if (allEvaluated) {
        let notCompliant = this.userDocuments.find((e) => e.bfp_status_id == 2);
        if (notCompliant) {
          this.nonCompliant();
        } else {
          this.compliant();
        }
      } else {
        Swal.fire('Notice!', `Please evaluate all documents!`, 'info').then(
          (result) => {}
        );
      }
    }
  }
}
