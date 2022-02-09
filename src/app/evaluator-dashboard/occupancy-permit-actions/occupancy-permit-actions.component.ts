import { WaterMarkService } from './../../core/services/watermark.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { ActivatedRoute } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-occupancy-permit-actions',
  templateUrl: './occupancy-permit-actions.component.html',
  styleUrls: ['./occupancy-permit-actions.component.scss'],
})
export class OccupancyPermitActionsComponent implements OnInit {
  @Input() applicationInfo;
  @Input() evaluatorRole;
  @Input() evaluatorDetails;
  @Input() occupancyDocs;
  public applicationId;
  public isLoading: boolean = false;
  constructor(
    private snackBar: MatSnackBar,
    private applicationService: ApplicationInfoService,
    private route: ActivatedRoute,
    private newApplicationService: NewApplicationService,
    private waterMark: WaterMarkService
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params.id;
  }

  isTechnicalEvaluator() {
    if (
      this.evaluatorRole.code == 'CBAO-LG' ||
      this.evaluatorRole.code == 'CBAO-STR' ||
      this.evaluatorRole.code == 'CBAO-ARCH' ||
      this.evaluatorRole.code == 'CBAO-SAN' ||
      this.evaluatorRole.code == 'CBAO-ELEC' ||
      this.evaluatorRole.code == 'CBAO-MEC'
    ) {
      return true;
    } else {
      return false;
    }
  }
  checkFormNonCompliant() {
    const isNonCompliant = this.occupancyDocs.find(
      (form) => form.document_status_id == 2
    );
    return isNonCompliant;
  }
  checkFormsCompliant() {
    const isCompliant = this.occupancyDocs.every(
      (form) => form.document_status_id == 1
    );
    return isCompliant;
  }

  checkFormsReviewed() {
    const isReviewed = this.occupancyDocs.every(
      (form) => form.document_status_id == 1 || form.document_status_id == 2
    );
    return isReviewed;
  }

  returnToApplicant() {
    this.isLoading = true;
    if (this.checkFormsReviewed()) {
      if (this.checkFormsCompliant()) {
        this.openSnackBar('All documents are compliant!');
        this.isLoading = false;
      } else {
        this.updateApplicationNonCompliant();
      }
    } else {
      this.openSnackBar('Please review all documents first!');
      this.isLoading = false;
    }
  }

  updateApplicationNonCompliant() {
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
        if (this.evaluatorRole.code == 'CBAO-REC') {
          const body = {
            application_status_id: 5,
            receiving_status_id: 2,
          };
          this.updateStatus(body);
        } else if (this.evaluatorRole.code == 'CBAO-DC') {
          const body = {
            application_status_id: 5,
            dc_status_id: 2,
          };
          this.updateStatus(body);
        } else if (this.evaluatorRole.code == 'CBAO-BO') {
          const body = {
            application_status_id: 5,
            bo_status_id: 2,
          };
          this.updateStatus(body);
        }
      } else if (result.isDenied) {
        this.isLoading = false;
      }
    });
  }

  updateStatus(body) {
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        this.isLoading = false;
        this.openSnackBar('Returned to Applicant!');
        window.location.reload();
      });
  }

  updateFormStatus() {
    this.isLoading = true;
    this.occupancyDocs.forEach((element) => {
      let body = {
        document_status_id: 0,
      };
      this.newApplicationService
        .updateDocumentFile(body, element.id)
        .subscribe((res) => {});
    });
    this.updateApplicationStatus();
  }

  updateApplicationStatus() {
    const body = {
      application_status_id: 3,
      receiving_status_id: 1,
    };
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        this.isLoading = false;
        Swal.fire('Success!', `BFP, CEPMO, CBAO Notified`, 'success').then(
          (result) => {}
        );
        window.location.reload();
      });
  }

  forwardToOffices() {
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
      this.openSnackBar('Please review documents.');
    }
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
    this.isLoading = true;
    this.applicationService
      .updateCbaoStatus(body, this.applicationId)
      .subscribe((res) => {
        this.isLoading = false;
        Swal.fire('Success!', `Review Saved!`, 'success').then((result) => {
          window.location.reload();
        });
      });
  }

  notifyBuildingOfficial() {
    this.isLoading = true;
    if (this.checkFormsCompliant()) {
      this.forwardToBuildingOfficial();
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
    var count = 0;
    var bar = new Promise<void>((resolve, reject) => {
      this.occupancyDocs.forEach((element, index, array) => {
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
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
