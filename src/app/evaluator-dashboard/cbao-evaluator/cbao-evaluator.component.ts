import { RemarksHistoryTableComponent } from './../remarks-history-table/remarks-history-table.component';
import { NewApplicationService } from './../../core/services/new-application.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { FormDetailsComponent } from '../form-details/form-details.component';
import { documentTypes } from '../../core/enums/document-type.enum';
import { documentStatus } from '../../core/enums/document-status.enum';
import Swal from 'sweetalert2';
import { ReleaseBldgPermitComponent } from '../release-bldg-permit/release-bldg-permit.component';
import { WaterMarkService } from '../../core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public mainPermitStatus;
  public pdfSrc =
    'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/forms/Application_Form_for_Certificate_of_Zoning_Compliance-revised_by_TSA-Sept_4__2020+(1).pdf';
  constructor(
    private applicationService: ApplicationInfoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private newApplicationService: NewApplicationService,
    private waterMark: WaterMarkService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params.id;
    this.applicationService
      .fetchUserDocs(this.applicationId)
      .subscribe((result) => {
        this.filterUserDocs(result.data);
        this.fetchEvaluatorDetails();
        this.checkFormsCompliant();
        this.checkFormsReviewed();
        this.isLoading = false;
      });
    this.fetchApplicationInfo();
    this.changeDetectorRefs.detectChanges();
  }
  filterUserDocs(forms) {
    const USER_FORMS = forms.filter((doc) => doc.document_id !== 107);
    this.dataSource = USER_FORMS;
    this.isLoading = false;
  }
  fetchApplicationInfo() {
    this.isLoading = true;
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        this.applicationInfo = res.data;
        if (this.applicationInfo.application_status_id == 3) {
          this.checkTechnicalEvaluationCompliant();
        }
        this.isLoading = false;
      });
  }
  checkTechnicalEvaluationDone() {
    const app = this.applicationInfo;
    const status = [
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
    const isAllReviewed = status.every((tech) => tech.id == 1 || tech.id == 2);

    return isAllReviewed;
  }
  checkTechnicalEvaluationCompliant() {
    if (this.checkTechnicalEvaluationDone()) {
      const app = this.applicationInfo;
      const status = [
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
      const isCompliant = status.every((tech) => tech.id == 1);
      if (isCompliant) {
        this.isLoading = true;
        if (this.applicationInfo.parallel_cbao_status_id !== 1) {
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
    this.user = JSON.parse(localStorage.getItem('user'));
    this.evaluatorDetails = this.user.employee_detail;
    this.evaluatorRole = this.user.user_roles[0].role[0];
  }

  getDocType(id): string {
    return documentTypes[id];
  }
  getDocStatus(id): string {
    if (
      this.evaluatorRole.code == 'CBAO-REC' &&
      this.applicationInfo.receiving_status_id == '1'
    ) {
      return 'Compliant';
    }
    return documentStatus[id];
  }

  openFormDialog(element): void {
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
      }
    } else {
      this.openSnackBar('Please review documents.');
    }
  }

  nonCompliant() {
    this.isLoading = true;
    if (this.checkFormsReviewed()) {
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
          obj.document_id == 72 ||
          obj.document_id == 33
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
    if (this.applicationInfo.permit_type_id == 1) {
      if (this.checkFormsCompliant) {
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
      this.dataSource.forEach((element, index, array) => {
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
      duration: 3000,
    });
  }
}
