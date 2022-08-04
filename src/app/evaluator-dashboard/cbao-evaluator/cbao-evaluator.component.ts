import { UserDocumentsService } from './../../core/services/user-documents.service';
import { UpdateDocumentFileComponent } from './../../shared/update-document-file/update-document-file.component';
import { UploadTarpaulinComponent } from './../../shared/upload-tarpaulin/upload-tarpaulin.component';
import { AdminWatermarkComponent } from './../../shared/admin-watermark/admin-watermark.component';
import { OccupancyService } from './../../core/services/occupancy.service';
import { OccupancyUploadFileComponent } from './../occupancy-upload-file/occupancy-upload-file.component';
import { EsignatureService } from './../../core/services/esignature.service';
import { RemarksHistoryTableComponent } from './../remarks-history-table/remarks-history-table.component';
import { NewApplicationService } from './../../core/services/new-application.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { FormDetailsComponent } from '../form-details/form-details.component';
import { documentStatus } from '../../core/enums/document-status.enum';
import Swal from 'sweetalert2';
import { ReleaseBldgPermitComponent } from '../release-bldg-permit/release-bldg-permit.component';
import { WaterMarkService } from '../../core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminEditDialogComponent } from 'src/app/shared/admin-edit-dialog/admin-edit-dialog.component';
import { FormControl } from '@angular/forms';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-cbao-evaluator',
  templateUrl: './cbao-evaluator.component.html',
  styleUrls: ['./cbao-evaluator.component.scss'],
})
export class CbaoEvaluatorComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'name',
    'uploadedBy',
    'status',
    'remarks',
    'action',
  ];
  public technicalEvaluatorNonCompliantDocs = [];
  public user;
  public dataSource = [];
  public applicationId;
  public applicationInfo;
  public evaluatorDetails;
  public isLoading: boolean = true;
  public evaluatorRole;
  public mainPermitStatus;
  public documentTypes;
  public documentStatusSelector;
  public pdfSrc =
    'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/forms/Application_Form_for_Certificate_of_Zoning_Compliance-revised_by_TSA-Sept_4__2020+(1).pdf';
  public userDocuments = [];
  public plansDocuments;
  public mergedPlans;
  public isLoadingMergedPlans: boolean = false;
  public occupancyDocs = [];
  public searchKey = new FormControl('');
  public unfilteredData = [];

  constructor(
    private applicationService: ApplicationInfoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private newApplicationService: NewApplicationService,
    private waterMark: WaterMarkService,
    private snackBar: MatSnackBar,
    private eSignatureService: EsignatureService,
    private occupancyService: OccupancyService,
    private router: Router,
    private NgxExtendedPdfViewerService: NgxExtendedPdfViewerService,
    private userDocumentService: UserDocumentsService
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params.id;
    this.fetchApplicationInfo();
    this.changeDetectorRefs.detectChanges();
    this.fetchDocTypes();

    this.searchKey.valueChanges.subscribe((res) => {
      this.dataSource = this.sortUserDocs(
        this.unfilteredData.filter((document) => {
          const docName = document.docName;
          if (docName && docName.toLowerCase().includes(res.toLowerCase()))
            return true;
          else return false;
        })
      );
    });
  }

  openOccupancyFileUpload() {
    const dialogRef = this.dialog.open(OccupancyUploadFileComponent, {
      width: '1000px',
      data: {
        application: this.applicationInfo,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  fetchPlainUserDocs() {
    this.applicationService
      .fetchUserDocs(this.applicationId)
      .subscribe((result) => {
        this.userDocuments = result.data;
      });
  }

  checkCepmoParallelDocs() {
    this.isLoading = true;

    const findDoc = this.userDocuments.forEach((e) => {
      if (e.document_id == 36 || e.document_id == 63) {
        if (e.cbao_status_id == 1 && e.cepmo_status_id == 1) {
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

  filterUserDocs(forms) {
    const USER_FORMS = forms.filter(
      (doc) => doc.document_id !== 107 && doc.document_id !== 224
    );
    if (this.applicationInfo.permit_type_id == 2) {
      // if (this.applicationInfo.associated_released_permits.length >= 1) {
      //   this.occupancyService
      //     .fetchUserOldBp(this.applicationId)
      //     .subscribe((res) => {
      //       res.data.forEach((e) => {
      //         this.occupancyService
      //           .fetchUserDocsOnly(e.generated_application_id)
      //           .subscribe((res) => {
      //             res.data.forEach((element) => {
      //               USER_FORMS.push(element);
      //             });
      //             this.dataSource = this.sortUserDocs(USER_FORMS);
      //             this.occupancyDocs = USER_FORMS;
      //             this.isLoading = false;
      //           });
      //       });
      //     });
      // } else {
      //   this.dataSource = this.sortUserDocs(USER_FORMS);
      //   this.occupancyDocs = USER_FORMS;
      // }
      this.dataSource = this.sortUserDocs(USER_FORMS);
      this.unfilteredData = this.dataSource;
      this.occupancyDocs = USER_FORMS;
    }
    if (this.applicationInfo.permit_type_id !== 2) {
      this.dataSource = this.sortUserDocs(USER_FORMS);
      this.unfilteredData = this.dataSource;
    }
    this.isLoading = false;
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
      approvedForms: {
        label: 'Approved Forms',
        data: [],
      },
      approvedDocuments: {
        label: 'Approved Documentary Requirements',
        data: [],
      },
      approvedPlans: {
        label: 'Approved Plans, Designs, Specifications, Cost Estimate',
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
      const docName = this.documentTypes[element.document_id - 1].name;
      element.docName = docName;

      switch (docType) {
        case 1:
          if (this.applicationInfo.permit_type_id !== 2) {
            sortedForms.forms.data.push(element);
          } else {
            sortedForms.approvedForms.data.push(element);
          }
          break;
        case 2:
          if (this.applicationInfo.permit_type_id !== 2) {
            sortedForms.documents.data.push(element);
          } else {
            sortedForms.approvedDocuments.data.push(element);
          }
          break;
        case 3:
          if (this.applicationInfo.permit_type_id !== 2) {
            sortedForms.plans.data.push(element);
          } else {
            sortedForms.approvedPlans.data.push(element);
          }
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
      {
        label: sortedData[6].data.length ? sortedData[6].label : 'hidden',
      },
      ...sortedData[6].data,
      {
        label: sortedData[7].data.length ? sortedData[7].label : 'hidden',
      },
      ...sortedData[7].data,
      {
        label: sortedData[8].data.length ? sortedData[8].label : 'hidden',
      },
      ...sortedData[8].data,
    ];
    return sortedData;
  }

  fetchApplicationInfo() {
    this.isLoading = true;
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        this.applicationInfo = res.data;
        this.applicationService
          .fetchUserDocs(this.applicationId)
          .subscribe((result) => {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.evaluatorDetails = this.user.employee_detail;
            this.evaluatorRole = this.user.user_roles[0].role[0];
            this.filterUserDocs(result.data);
            this.userDocuments = result.data;
            this.plansDocuments = this.userDocuments.filter(
              (e) =>
                e.document_id == 59 ||
                e.document_id == 61 ||
                e.document_id == 63 ||
                e.document_id == 62 ||
                e.document_id == 30 ||
                e.document_id == 32 ||
                e.document_id == 33 ||
                e.document_id == 31 ||
                e.document_id == 29
            );
            if (this.evaluatorRole.code == 'CBAO-BO') {
              this.isLoadingMergedPlans = true;
              this.waterMark.merge(this.plansDocuments).finally(() => {
                this.isLoadingMergedPlans = false;
                this.mergedPlans = this.waterMark.mergedPlans;
              });
            }
            this.fetchEvaluatorDetails();
            this.checkFormsCompliant();
            this.checkFormsReviewed();
            this.checkCepmoParallelDocs();
            this.checkBfpParallelDocs();
            this.isLoading = false;
          });
        if (this.applicationInfo.application_status_id == 3) {
          this.checkTechnicalEvaluationCompliant();
        }
        this.isLoading = false;
      });
  }
  fetchOccupancyDocs() {
    this.isLoading = true;
    this.occupancyService
      .fetchUserOldBp(this.applicationId)
      .subscribe((res) => {
        res.data.forEach((e) => {
          this.occupancyService
            .fetchUserDocsOnly(e.generated_application_id)
            .subscribe((res) => {
              res.data.forEach((element) => {
                this.dataSource.push(element);
              });

              this.isLoading = false;
            });
        });
      });
  }

  checkTechnicalEvaluationDone() {
    const app = this.applicationInfo;
    let status;
    if (app.occupancy_classification_id == 1) {
      status = [
        {
          id: app.cbao_arch_status_id,
        },
        {
          id: app.cbao_elec_status_id,
        },
        {
          id: app.cbao_san_status_id,
        },
        {
          id: app.cbao_lg_status_id,
        },
        {
          id: app.cbao_str_status_id,
        },
      ];
    } else {
      status = [
        {
          id: app.cbao_arch_status_id,
        },
        {
          id: app.cbao_elec_status_id,
        },
        {
          id: app.cbao_san_status_id,
        },
        {
          id: app.cbao_lg_status_id,
        },
        {
          id: app.cbao_str_status_id,
        },
        {
          id: app.cbao_mec_status_id,
        },
      ];
    }

    const isAllReviewed = status.every((tech) => tech.id == 1 || tech.id == 2);

    return isAllReviewed;
  }
  checkTechnicalEvaluationCompliant() {
    if (this.checkTechnicalEvaluationDone()) {
      const app = this.applicationInfo;
      let status;
      if (app.occupancy_classification_id == 1) {
        status = [
          {
            id: app.cbao_arch_status_id,
          },
          {
            id: app.cbao_elec_status_id,
          },
          {
            id: app.cbao_san_status_id,
          },
          {
            id: app.cbao_lg_status_id,
          },
          {
            id: app.cbao_str_status_id,
          },
        ];
      } else {
        status = [
          {
            id: app.cbao_arch_status_id,
          },
          {
            id: app.cbao_elec_status_id,
          },
          {
            id: app.cbao_san_status_id,
          },
          {
            id: app.cbao_lg_status_id,
          },
          {
            id: app.cbao_str_status_id,
          },
          {
            id: app.cbao_mec_status_id,
          },
        ];
      }
      const isCompliant = status.every((tech) => tech.id == 1);
      if (isCompliant) {
        this.isLoading = true;
        if (this.applicationInfo.parallel_cbao_status_id !== 1) {
          const body = {
            parallel_cbao_status_id: 1,
            evaluator_user_id: this.evaluatorDetails.user_id,
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
          Swal.fire(
            'CBAO Evaluation Done!',
            `Other offices still pending!`,
            'info'
          ).then((result) => {
            this.isLoading = false;
          });
        }
      } else if (!isCompliant) {
        this.isLoading = true;
        if (this.applicationInfo.parallel_cbao_status_id !== 2) {
          const body = {
            parallel_cbao_status_id: 2,
            evaluator_user_id: this.evaluatorDetails.user_id,
          };
          this.applicationService
            .updateApplicationStatus(body, this.applicationId)
            .subscribe((res) => {
              Swal.fire('Success!', `Evaluation Done!`, 'success').then(
                (result) => {
                  this.isLoading = false;
                  window.location.reload();
                }
              );
            });
        } else {
          Swal.fire(
            'CBAO Evaluation Done!',
            `Other offices still pending!`,
            'info'
          ).then((result) => {
            this.isLoading = false;
          });
        }
      }
    }
  }

  fetchEvaluatorDetails() {
    if (
      this.applicationInfo.permit_type_id == 1 ||
      this.applicationInfo.permit_type_id == 2
    ) {
      if (this.evaluatorRole.code == 'CBAO-REC') {
        this.documentStatusSelector = 'receiving_status_id';
      } else if (
        this.evaluatorRole.code == 'CBAO-DC' ||
        this.evaluatorRole.code == 'CBAO-BO' ||
        this.evaluatorRole.code == 'CBAO-REL' ||
        this.evaluatorRole.code == 'SPRADM'
      ) {
        this.documentStatusSelector = 'document_status_id';
      } else this.documentStatusSelector = 'cbao_status_id';
    } else {
      //OTHER PERMITS
      if (this.evaluatorRole.code == 'CBAO-REC') {
        this.documentStatusSelector = 'receiving_status_id';
      } else {
        this.documentStatusSelector = 'document_status_id';
      }
    }
  }

  getDocType(id): string {
    return this.documentTypes[id - 1].name;
  }
  getDocStatus(status_id, is_applicable): string {
    if (status_id == 1 && is_applicable == 2) {
      return 'Not Applicable';
    } else if (this.evaluatorRole.code == 'CBAO-REC' && status_id == '1') {
      return 'Submitted';
    } else {
      return documentStatus[status_id];
    }
  }

  openFormDialog(element): void {
    const dialogRef = this.dialog.open(FormDetailsComponent, {
      width: '1500px',
      height: '2000px',
      data: {
        evaluator: this.evaluatorDetails,
        userRole: this.evaluatorRole,
        form: element,
        route: this.route,
        application: this.applicationInfo,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetchApplicationInfo();
    });
  }

  otherPermitsCanEdit() {
    if (
      this.applicationInfo.application_status_id == 1 &&
      this.evaluatorRole.code == 'CBAO-REC'
    ) {
      return true;
    } else if (
      this.applicationInfo.application_status_id == 18 &&
      (this.evaluatorRole.code == 'CBAO-LG' ||
        this.evaluatorRole.code == 'CBAO-STR' ||
        this.evaluatorRole.code == 'CBAO-ELEC' ||
        this.evaluatorRole.code == 'CBAO-ARCH' ||
        this.evaluatorRole.code == 'CBAO-SAN' ||
        this.evaluatorRole.code == 'CBAO-MEC')
    ) {
      return true;
    } else if (
      this.applicationInfo.application_status_id == 12 &&
      this.evaluatorRole.code == 'CBAO-DC'
    ) {
      return true;
    } else if (
      this.applicationInfo.application_status_id == 13 &&
      this.evaluatorRole.code == 'CBAO-BO'
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkFormsCompliant() {
    const isCompliant = this.userDocuments.every(
      (form) => form.document_status_id == 1
    );
    return isCompliant;
  }
  checkBuildingPermitUploaded() {
    const find = this.userDocuments.find((form) => form.document_id == 50);
    return find;
  }

  checkFormNonCompliant() {
    const isNonCompliant = this.userDocuments.find(
      (form) => form.document_status_id == 2
    );
    return isNonCompliant;
  }
  checkFormsReviewed() {
    if (this.evaluatorRole.code == 'CBAO-REC') {
      const isReviewed = this.userDocuments.every(
        (form) => form.receiving_status_id == 1 || form.receiving_status_id == 2
      );
      return isReviewed;
    } else {
      const isReviewed = this.userDocuments.every(
        (form) => form.document_status_id == 1 || form.document_status_id == 2
      );
      return isReviewed;
    }
  }

  handleTechnicalEvaluatorNonCompliant() {
    if (this.checkFormNonCompliant()) {
      switch (this.evaluatorRole.code) {
        case 'CBAO-LG':
          const lg = {
            cbao_lg_status_id: 2,
            evaluator_user_id: this.evaluatorDetails.user_id,
          };
          this.updateCbaoStatus(lg);
          break;
        case 'CBAO-ARCH':
          const arch = {
            cbao_arch_status_id: 2,
            evaluator_user_id: this.evaluatorDetails.user_id,
          };
          this.updateCbaoStatus(arch);
          break;
        case 'CBAO-STR':
          const str = {
            cbao_str_status_id: 2,
            evaluator_user_id: this.evaluatorDetails.user_id,
          };
          this.updateCbaoStatus(str);
          break;
        case 'CBAO-SAN':
          const san = {
            cbao_san_status_id: 2,
            evaluator_user_id: this.evaluatorDetails.user_id,
          };
          this.updateCbaoStatus(san);
          break;
        case 'CBAO-ELEC':
          const elec = {
            cbao_elec_status_id: 2,
            evaluator_user_id: this.evaluatorDetails.user_id,
          };
          this.updateCbaoStatus(elec);
          break;
        case 'CBAO-MEC':
          const mec = {
            cbao_mec_status_id: 2,
            evaluator_user_id: this.evaluatorDetails.user_id,
          };
          this.updateCbaoStatus(mec);
          break;
      }
    } else {
      this.findTechnicalEvaluatorNonCompliantDocs();
      // let docs = [];
      // this.technicalEvaluatorNonCompliantDocs.forEach((e) => {
      //   let docName = this.getDocType(e);
      //   docs.push(docName);
      // });
      // console.log('here', docs);

      Swal.fire(
        'Please review the following documents first.',
        `${this.technicalEvaluatorNonCompliantDocs.toString()}`,
        'info'
      ).then((result) => {
        this.isLoading = false;
      });
    }
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
          if (this.evaluatorRole.code == 'CBAO-DC') {
            const body = {
              application_status_id: 5,
              dc_status_id: 2,
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
              });
          } else if (this.evaluatorRole.code == 'CBAO-BO') {
            const body = {
              application_status_id: 5,
              bo_status_id: 2,
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
              });
          } else {
            const body = {
              application_status_id: 5,
              receiving_status_id: 2,
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

  updateFormStatus() {
    if (this.applicationInfo.permit_type_id == 1) {
      this.isLoading = true;
      const CPDO_FORMS = this.dataSource.filter(
        (obj) =>
          obj.document_id == 1 ||
          obj.document_id == 28 ||
          obj.document_id == 26 ||
          obj.document_id == 27 ||
          obj.document_id == 23 ||
          obj.document_id == 24 ||
          obj.document_id == 25 ||
          obj.document_id == 27 ||
          obj.document_id == 43 ||
          obj.document_id == 59 ||
          obj.document_id == 74 ||
          obj.document_id == 75 ||
          obj.document_id == 33 ||
          obj.document_id == 140 ||
          obj.document_id == 103 ||
          obj.document_id == 104
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
      return forReview;
    }
  }

  updateApplicationStatus() {
    if (this.applicationInfo.permit_type_id == 1) {
      const body = {
        application_status_id: 2,
        receiving_status_id: 1,
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
    } else if (
      this.applicationInfo.permit_type_id !== 1 ||
      this.applicationInfo.permit_type_id !== 2
    ) {
      if (this.checkFormsReviewed()) {
        this.isLoading = true;
        const body = {
          application_status_id: 18,
          receiving_status_id: 1,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            this.dataSource.forEach((element) => {
              let body = {
                document_status_id: 0,
              };
              this.newApplicationService
                .updateDocumentFile(body, element.id)
                .subscribe((res) => {});
            });
            setTimeout(() => {
              Swal.fire(
                'Success!',
                `Forwarded to Technical Evaluators!`,
                'success'
              ).then((result) => {
                this.isLoading = false;
                window.location.reload();
              });
            }, 3000);
          });
      } else {
        this.openSnackBar('Please review all documents first!');
        this.isLoading = false;
      }
    }
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
  forwardToDivisionChief() {
    if (this.applicationInfo.main_permit_id == null) {
      this.isLoading = true;
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
            window.location.reload();
          });
        });
    } else {
      this.checkIfMainPermit();
    }
  }
  checkIfMainPermit() {
    this.isLoading = true;
    this.applicationService
      .fetchApplicationInfo(this.applicationInfo.main_permit_id)
      .subscribe((res) => {
        this.mainPermitStatus = res.data.application_status_id;
        if (
          this.mainPermitStatus == 12 ||
          this.mainPermitStatus == 13 ||
          this.mainPermitStatus == 4 ||
          this.mainPermitStatus == 8 ||
          this.mainPermitStatus == 11
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
                window.location.reload();
              });
            });
        } else {
          this.isLoading = false;
          this.openSnackBar('Please review associated Building Permit first!');
        }
      });
  }
  notifyBuildingOfficial() {
    this.isLoading = true;
    if (this.checkFormsCompliant()) {
      if (
        this.applicationInfo.sub_permit_type_id == null ||
        this.applicationInfo.sub_permit_type_id == 0
      ) {
        this.forwardToBuildingOfficial();
      } else {
        // this.applicationService
        //   .fetchApplicationInfo(this.applicationInfo.sub_permit_type_id)
        //   .subscribe((res) => {
        //     const subPermitStatus = res.data.application_status_id;
        //     if (subPermitStatus == 12 || subPermitStatus == 13) {
        //       this.forwardToBuildingOfficial();
        //     } else {
        //       this.openSnackBar(
        //         'Associated Excavation Permit is Still Under Evaluation!'
        //       );
        //       this.isLoading = false;
        //     }
        //   });
        this.forwardToBuildingOfficial();
      }
    } else {
      Swal.fire('Notice!', `Please review all documents first!`, 'info').then(
        (result) => {
          this.isLoading = false;
        }
      );
    }
  }

  forwardToBuildingOfficial() {
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
  }

  canSignDocument() {
    const code = this.evaluatorRole.code;
    const status = this.applicationInfo.application_status_id;
    if (status !== 24 && code == 'CBAO-BO') {
      return true;
    } else if (status !== 24 && code !== 'CBAO-BO') {
      return false;
    } else if (status == 24) {
      return true;
    }
  }

  forSignature() {
    this.isLoading = true;
    if (this.applicationInfo.permit_type_id == 1) {
      if (this.checkFormsCompliant) {
        const body = {
          application_status_id: 24,
          bo_status_id: 1,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            Swal.fire(
              'Success!',
              `Notified Evaluators for Signature!`,
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
    } else {
    }
  }
  forPayment() {
    this.isLoading = true;
    if (
      this.applicationInfo.permit_type_id == 1 ||
      this.applicationInfo.permit_type_id == 2
    ) {
      if (this.checkFormsCompliant()) {
        const body = {
          application_status_id: 8,
          bo_status_id: 1,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            this.addWatermarkToAllCompliant();
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
    } else {
      const body = {
        application_status_id: 8,
        bo_status_id: 1,
      };
      this.applicationService
        .updateApplicationStatus(body, this.applicationId)
        .subscribe((res) => {
          this.addWatermarkToAllCompliant();
        });
    }
  }
  addWatermarkToAllCompliant() {
    // this.dataSource.forEach((element) => {
    //   this.isLoading = true;
    //   if (element.document_id !== 50) {
    //     this.waterMark
    //       .insertWaterMark(element.document_path, 'compliant')
    //       .then((blob) => {
    //         const updateFileData = {
    //           document_status_id: 1,
    //           document_path: blob,
    //         };
    //         this.newApplicationService
    //           .updateDocumentFile(updateFileData, element.id)
    //           .subscribe((res) => {
    //           });
    //       });
    //   }
    // });
    var count = 0;
    var bar = new Promise<void>((resolve, reject) => {
      this.userDocuments.forEach((element, index, array) => {
        this.isLoading = true;
        if (element.document_id !== 50) {
          this.waterMark
            .insertWaterMark(element.document_path, 'compliant')
            .then((blob) => {
              const updateFileData = {
                document_status_id: 1,
                document_path: blob,
              };
              this.newApplicationService
                .updateDocumentFile(updateFileData, element.id)
                .subscribe((res) => {
                  count = count + 1;
                  if (count === array.length - 1) {
                    this.isLoading = false;
                    this.openSnackBar('Success! Forwarded to Payment of Fees!');
                    window.location.reload();
                  }
                });
            });
        }
      });
    });
  }

  handleTechnicalEvaluatorCompliant() {
    switch (this.evaluatorRole.code) {
      case 'CBAO-LG':
        const lg = {
          cbao_lg_status_id: 1,
          evaluator_user_id: this.evaluatorDetails.user_id,
        };
        this.updateCbaoStatus(lg);
        break;
      case 'CBAO-ARCH':
        const arch = {
          cbao_arch_status_id: 1,
          evaluator_user_id: this.evaluatorDetails.user_id,
        };
        this.updateCbaoStatus(arch);
        break;
      case 'CBAO-STR':
        const str = {
          cbao_str_status_id: 1,
          evaluator_user_id: this.evaluatorDetails.user_id,
        };
        this.updateCbaoStatus(str);
        break;
      case 'CBAO-SAN':
        const san = {
          cbao_san_status_id: 1,
          evaluator_user_id: this.evaluatorDetails.user_id,
        };
        this.updateCbaoStatus(san);
        break;
      case 'CBAO-ELEC':
        const elec = {
          cbao_elec_status_id: 1,
          evaluator_user_id: this.evaluatorDetails.user_id,
        };
        this.updateCbaoStatus(elec);
        break;
      case 'CBAO-MEC':
        const mec = {
          cbao_mec_status_id: 1,
          evaluator_user_id: this.evaluatorDetails.user_id,
        };
        this.updateCbaoStatus(mec);
        break;
    }
  }
  updateCbaoStatus(body) {
    this.applicationService
      .updateCbaoStatus(body, this.applicationId)
      .subscribe((res) => {
        Swal.fire('Success!', `Review Saved!`, 'success').then((result) => {
          window.location.reload();
        });
      });
  }
  handleRelease() {
    const body = {
      application_status_id: 11,
      releasing_status_id: 1,
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
  openUploadDocument(e) {
    const dialogRef = this.dialog.open(ReleaseBldgPermitComponent, {
      width: '1500px',
      height: '800px',
      data: {
        evaluator: this.evaluatorDetails,
        form: e,
        route: this.route,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  openRemarksHistory(e) {
    const dialogRef = this.dialog.open(RemarksHistoryTableComponent, {
      width: '1000px',
      height: '800px',
      data: {
        evaluator: this.evaluatorDetails,
        evaluatorRole: this.evaluatorRole,
        applicationInfo: this.applicationInfo,
        form: e,
        route: this.route,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }

  goToEsig(id) {
    this.router.navigate(['/evaluator/application', this.applicationId, id]);
  }

  fetchDocTypes() {
    this.newApplicationService.fetchDocumentTypes().subscribe((res) => {
      this.documentTypes = res.data;
    });
  }

  openMergedPlans() {
    window.open(this.mergedPlans);
  }

  handleReviewDone() {
    this.isLoading = true;
    let userDocuments;
    this.applicationService
      .fetchUserDocs(this.applicationId)
      .subscribe((result) => {
        userDocuments = result.data;
        switch (this.evaluatorRole.code) {
          case 'CBAO-LG':
            let lgEvaluated = this.userDocuments.every(
              (form) => form.cbao_lg_status_id == 0
            );
            if (lgEvaluated) {
              Swal.fire(
                'Notice!',
                `Please review a document first!`,
                'warning'
              ).then((result) => {});
            } else {
              const isNotCompliant = this.userDocuments.find(
                (form) => form.cbao_lg_status_id == 2
              );
              if (isNotCompliant) {
                this.handleTechnicalEvaluatorNonCompliant();
              } else {
                this.handleTechnicalEvaluatorCompliant();
              }
            }
          case 'CBAO-ARCH':
            const archEvaluated = this.userDocuments.every(
              (form) => form.cbao_arch_status_id == 0
            );
            if (archEvaluated) {
              Swal.fire(
                'Notice!',
                `Please review a document first!`,
                'warning'
              ).then((result) => {});
            } else {
              const isNotCompliant = this.userDocuments.find(
                (form) => form.cbao_arch_status_id == 2
              );
              if (isNotCompliant) {
                this.handleTechnicalEvaluatorNonCompliant();
              } else {
                this.handleTechnicalEvaluatorCompliant();
              }
            }
            break;
          case 'CBAO-STR':
            const strEvaluated = this.userDocuments.every(
              (form) => form.cbao_str_status_id == 0
            );
            if (strEvaluated) {
              Swal.fire(
                'Notice!',
                `Please review a document first!`,
                'warning'
              ).then((result) => {});
            } else {
              const isNotCompliant = this.userDocuments.find(
                (form) => form.cbao_str_status_id == 2
              );
              if (isNotCompliant) {
                this.handleTechnicalEvaluatorNonCompliant();
              } else {
                this.handleTechnicalEvaluatorCompliant();
              }
            }
            break;
          case 'CBAO-SAN':
            const sanEvaluated = this.userDocuments.every(
              (form) => form.cbao_san_status_id == 0
            );
            if (sanEvaluated) {
              Swal.fire(
                'Notice!',
                `Please review a document first!`,
                'warning'
              ).then((result) => {});
            } else {
              const isNotCompliant = this.userDocuments.find(
                (form) => form.cbao_san_status_id == 2
              );
              if (isNotCompliant) {
                this.handleTechnicalEvaluatorNonCompliant();
              } else {
                this.handleTechnicalEvaluatorCompliant();
              }
            }
            break;
          case 'CBAO-ELEC':
            const elecEvaluated = this.userDocuments.every(
              (form) => form.cbao_elec_status_id == 0
            );
            if (elecEvaluated) {
              Swal.fire(
                'Notice!',
                `Please review a document first!`,
                'warning'
              ).then((result) => {});
            } else {
              const isNotCompliant = this.userDocuments.find(
                (form) => form.cbao_elec_status_id == 2
              );
              if (isNotCompliant) {
                this.handleTechnicalEvaluatorNonCompliant();
              } else {
                this.handleTechnicalEvaluatorCompliant();
              }
            }
            break;
          case 'CBAO-MEC':
            const mecEvaluated = this.userDocuments.every(
              (form) => form.cbao_mec_status_id == 0
            );
            if (mecEvaluated) {
              Swal.fire(
                'Notice!',
                `Please review a document first!`,
                'warning'
              ).then((result) => {});
            } else {
              const isNotCompliant = this.userDocuments.find(
                (form) => form.cbao_mec_status_id == 2
              );
              if (isNotCompliant) {
                this.handleTechnicalEvaluatorNonCompliant();
              } else {
                this.handleTechnicalEvaluatorCompliant();
              }
            }
            break;

          default:
            break;
        }
      });
  }

  openAdminEditDialog(id, currentStatus) {
    //console.log(id,currentStatus)
    const dialogRef = this.dialog.open(AdminEditDialogComponent, {
      //width: '1000px',
      data: {
        type: 'Document',
        title: 'Change Document Status',
        id: id,
        currentStatus: currentStatus,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openAdminWatermark(document) {
    const dialogRef = this.dialog.open(AdminWatermarkComponent, {
      data: {
        document: document,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  async callSave() {
    this.isLoading = true;
    this.uploadTarpaulin();
  }

  addWaterMark(doc, id) {
    this.waterMark.generateQrCode(this.applicationId).subscribe((res) => {
      this.waterMark
        .insertQrCode(doc, res.data, 'building-permit')
        .then((blob) => {
          const updateFileData = {
            document_status_id: 1,
            document_path: blob,
          };
          this.newApplicationService
            .updateDocumentFile(updateFileData, id)
            .subscribe((res) => {
              const body = {
                application_status_id: 24,
                bo_status_id: 1,
              };
              this.applicationService
                .updateApplicationStatus(body, this.applicationId)
                .subscribe((res) => {
                  Swal.fire(
                    'Success!',
                    `Building Permit Approved`,
                    'success'
                  ).then((result) => {
                    this.isLoading = false;
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  });
                });
            });
        });
    });
  }

  uploadTarpaulin() {
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.evaluatorDetails.user_id,
      document_id: 15,
      document_status_id: 1,
      is_document_string: 1,
      document_path:
        'https://s3-ap-southeast-1.amazonaws.com/buildpass-storage/00DgfOpnvb3mMwPHHEE4z9HuutbCAfkXopDHml7l.pdf',
    };

    this.newApplicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        const doc = res.data.document_path;
        const id = res.data.id;
        this.newApplicationService
          .updateDocumentFile({ receiving_status_id: 1 }, id)
          .subscribe((res) => {
            this.newApplicationService
              .updateDocumentFile({ bfp_status_id: 1 }, id)
              .subscribe((res) => {
                this.newApplicationService
                  .updateDocumentFile({ cbao_status_id: 1 }, id)
                  .subscribe((res) => {
                    this.newApplicationService
                      .updateDocumentFile({ cepmo_status_id: 1 }, id)
                      .subscribe((res) => {
                        const uploadDocumentData = {
                          application_id: this.applicationId,
                          user_id: this.evaluatorDetails.user_id,
                          document_id: 50,
                          document_status_id: 1,
                          is_document_string: 1,
                          document_path:
                            'https://s3-ap-southeast-1.amazonaws.com/baguio-ocpas/EmzEcDCiyHbGKve0XteLdUd7LBGiBz5s102QQEGd.pdf',
                        };

                        this.newApplicationService
                          .submitDocument(uploadDocumentData)
                          .subscribe((res) => {
                            const doc = res.data.document_path;
                            const id = res.data.id;
                            this.newApplicationService
                              .updateDocumentFile(
                                { receiving_status_id: 1 },
                                id
                              )
                              .subscribe((res) => {
                                this.newApplicationService
                                  .updateDocumentFile({ bfp_status_id: 1 }, id)
                                  .subscribe((res) => {
                                    this.newApplicationService
                                      .updateDocumentFile(
                                        { cbao_status_id: 1 },
                                        id
                                      )
                                      .subscribe((res) => {
                                        this.newApplicationService
                                          .updateDocumentFile(
                                            { cepmo_status_id: 1 },
                                            id
                                          )
                                          .subscribe((res) => {
                                            this.addWaterMark(doc, id);
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  }

  openUpdateDocumentFile(e) {
    const dialogRef = this.dialog.open(UpdateDocumentFileComponent, {
      width: '1000px',
      height: '900px',
      data: {
        document: e,
        evaluator: this.evaluatorDetails,
        application: this.applicationInfo,
      },
    });
    const sub = dialogRef.componentInstance.onClose.subscribe(() => {
      this.fetchApplicationInfo();
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  deleteUserDocument(e) {
    this.isLoading = true;
    Swal.fire({
      title: `Are you sure you want to delete ${e.docName}`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Yes`,
      confirmButtonColor: '#330E08',
      denyButtonColor: '#D2AB48',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.userDocumentService.deleteUserDocument(e.id).subscribe((res) => {
          console.log(res);
          this.isLoading = false;
          this.fetchApplicationInfo();
        });
      } else if (result.isDenied) {
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }
  findTechnicalEvaluatorNonCompliantDocs() {
    this.technicalEvaluatorNonCompliantDocs = [];
    switch (this.evaluatorRole.code) {
      case 'CBAO-LG':
        this.userDocuments.forEach((form) => {
          if (form.cbao_lg_status_id == 2) {
            this.technicalEvaluatorNonCompliantDocs.push(form.docName);
          }
        });
      case 'CBAO-ARCH':
        this.userDocuments.forEach((form) => {
          if (form.cbao_arch_status_id == 2) {
            this.technicalEvaluatorNonCompliantDocs.push(form.docName);
          }
        });
        break;
      case 'CBAO-STR':
        this.userDocuments.forEach((form) => {
          if (form.cbao_str_status_id == 2) {
            this.technicalEvaluatorNonCompliantDocs.push(form.docName);
          }
        });
        break;
      case 'CBAO-SAN':
        this.userDocuments.forEach((form) => {
          if (form.cbao_san_status_id == 2) {
            this.technicalEvaluatorNonCompliantDocs.push(form.docName);
          }
        });
        break;
      case 'CBAO-ELEC':
        this.userDocuments.forEach((form) => {
          if (form.cbao_elec_status_id == 2) {
            this.technicalEvaluatorNonCompliantDocs.push(form.docName);
          }
        });
        break;
      case 'CBAO-MEC':
        this.userDocuments.forEach((form) => {
          if (form.cbao_mec_status_id == 2) {
            this.technicalEvaluatorNonCompliantDocs.push(form.docName);
          }
        });
        break;

      default:
        break;
    }
  }
}
