import { CheckEvaluatorFeesService } from './../../core/services/check-evaluator-fees.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { PopOutNotificationsService } from './../../core/services/pop-out-notification.service';
import { Component, Input, OnInit } from '@angular/core';
import { NewApplicationService } from 'src/app/core/services/new-application.service';

@Component({
  selector: 'app-review-button',
  templateUrl: './review-button.component.html',
  styleUrls: ['./review-button.component.scss'],
})
export class ReviewButtonComponent implements OnInit {
  @Input() applicationInfo;
  @Input() evaluatorRole;
  @Input() evaluatorDetails;
  @Input() docs;
  public isLoading: boolean = false;
  constructor(
    private alert: PopOutNotificationsService,
    private applicationService: ApplicationInfoService,
    private newApplicationService: NewApplicationService,
    private checkFees: CheckEvaluatorFeesService
  ) {}

  ngOnInit(): void {}

  handleReviewDone() {
    this.isLoading = true;
    if (this.evaluatorRole.code == 'CBAO-REC') {
      if (
        this.docs.every(
          (form) =>
            form.receiving_status_id == 1 || form.receiving_status_id == 2
        )
      ) {
        if (this.docs.find((form) => form.receiving_status_id == 2)) {
          //RETURN TO APPLICANT
          this.updateApplicationNonCompliant();
        } else if (this.docs.every((form) => form.receiving_status_id == 1)) {
          //FORWARD
          this.updateFormStatus();
        }
      } else {
        this.alert.openSnackBar('Review all documents first!');
        this.isLoading = false;
      }
    } else if (this.isTechnicalEvaluator()) {
      switch (this.evaluatorRole.code) {
        case 'CBAO-LG':
          let lgEvaluated = this.docs.every(
            (form) => form.cbao_lg_status_id == 0
          );
          if (lgEvaluated) {
            this.alert.openSnackBar('Please review a document first.');
            this.isLoading = false;
          } else {
            const isNotCompliant = this.docs.find(
              (form) => form.cbao_lg_status_id == 2
            );
            if (isNotCompliant) {
              this.handleTechnicalEvaluatorNonCompliant();
            } else {
              this.handleTechnicalEvaluatorCompliant();
            }
          }
          break;
        case 'CBAO-ARCH':
          const archEvaluated = this.docs.every(
            (form) => form.cbao_arch_status_id == 0
          );
          if (archEvaluated) {
            this.alert.openSnackBar('Please review a document first.');
            this.isLoading = false;
          } else {
            const isNotCompliant = this.docs.find(
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
          const strEvaluated = this.docs.every(
            (form) => form.cbao_str_status_id == 0
          );
          if (strEvaluated) {
            this.alert.openSnackBar('Please review a document first.');
            this.isLoading = false;
          } else {
            const isNotCompliant = this.docs.find(
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
          const sanEvaluated = this.docs.every(
            (form) => form.cbao_san_status_id == 0
          );
          if (sanEvaluated) {
            this.alert.openSnackBar('Please review a document first.');
            this.isLoading = false;
          } else {
            const isNotCompliant = this.docs.find(
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
          const elecEvaluated = this.docs.every(
            (form) => form.cbao_elec_status_id == 0
          );
          if (elecEvaluated) {
            this.alert.openSnackBar('Please review a document first.');
            this.isLoading = false;
          } else {
            const isNotCompliant = this.docs.find(
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
          const mecEvaluated = this.docs.every(
            (form) => form.cbao_mec_status_id == 0
          );
          if (mecEvaluated) {
            this.alert.openSnackBar('Please review a document first.');
            this.isLoading = false;
          } else {
            const isNotCompliant = this.docs.find(
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
    } else if (
      this.evaluatorRole.code == 'CBAO-DC' ||
      this.evaluatorRole.code == 'CBAO-BO'
    ) {
      if (
        this.docs.every(
          (form) => form.document_status_id == 1 || form.document_status_id == 2
        )
      ) {
        if (this.docs.find((form) => form.document_status_id == 2)) {
          //RETURN TO APPLICANT
          this.updateApplicationNonCompliant();
        } else if (this.docs.every((form) => form.document_status_id == 1)) {
          //FORWARD
          this.updateApplicationStatus(this.evaluatorRole.code);
        }
      } else {
        this.alert.openSnackBar('Review all documents first!');
        this.isLoading = false;
      }
    }
  }

  updateApplicationNonCompliant() {
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
  }

  updateStatus(body) {
    this.applicationService
      .updateApplicationStatus(body, this.applicationInfo.id)
      .subscribe((res) => {
        this.alert.openSnackBar('Returned to Applicant!');
        setTimeout(() => {
          this.isLoading = false;
          window.location.reload();
        }, 1500);
      });
  }

  updateFormStatus() {
    this.isLoading = true;
    this.docs.forEach((element, index, array) => {
      let body = {
        document_status_id: 0,
      };
      this.newApplicationService
        .updateDocumentFile(body, element.id)
        .subscribe((res) => {
          console.log(index, array);
        });
      if (index == array.length - 1) {
        this.updateApplicationStatus(this.evaluatorRole.code);
      }
    });
  }

  updateApplicationStatus(role) {
    let body;
    switch (role) {
      case 'CBAO-REC':
        body = {
          application_status_id: 3,
          receiving_status_id: 1,
        };
        break;
      case 'CBAO-DC':
        body = {
          application_status_id: 13,
          dc_status_id: 1,
        };
        break;
      case 'CBAO-BO':
        body = {
          application_status_id: 24,
          bo_status_id: 1,
        };
        break;

      default:
        break;
    }
    this.applicationService
      .updateApplicationStatus(body, this.applicationInfo.id)
      .subscribe((res) => {
        if (role == 'CBAO-BO' && this.applicationInfo.permit_type_id == 2) {
          this.uploadOccupancyCertificate();
        } else {
          this.isLoading = false;

          this.alert.openSnackBar('Review Saved!');
          window.location.reload();
        }
      });
  }

  uploadOccupancyCertificate() {
    const uploadDocumentData = {
      application_id: this.applicationInfo.id,
      user_id: this.evaluatorDetails.user_id,
      document_id: 225,
      document_status_id: 1,
      is_document_string: 1,
      document_path:
        'https://s3-ap-southeast-1.amazonaws.com/buildpass-storage/DvOImkBsO6KUobW3D5qJYQ6pPBzafCvgotohdgo6.pdf',
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
                        this.isLoading = false;
                        this.alert.openSnackBar('Approved!');
                        window.location.reload();
                      });
                  });
              });
          });
      });
  }

  isAuthorized() {
    const role = this.evaluatorRole.code;
    const status = this.applicationInfo.application_status_id;
    if (role == 'CBAO-REC' && status == 1) return true;
    else if (
      this.isTechnicalEvaluator() ||
      this.isBfpEvaluator() ||
      this.isCepmoEvaluator()
    ) {
      if (status == 3) return true;
      else return false;
    } else if (role == 'CBAO-DC' && status == 12) return true;
    else if (role == 'CBAO-BO' && status == 13) return true;
    else if (role == 'CBAO-REL' && status == 4) return true;
    else return false;
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

  isBfpEvaluator() {
    if (
      this.evaluatorRole.code == 'DH-BFP' ||
      this.evaluatorRole.code == 'BFP-FCA' ||
      this.evaluatorRole.code == 'BFP-INS' ||
      this.evaluatorRole.code == 'BFP-CHF' ||
      this.evaluatorRole.code == 'BFP-CFD'
    ) {
      return true;
    } else return false;
  }
  isCepmoEvaluator() {
    if (
      this.evaluatorRole.code == 'DH-CEPMO' ||
      this.evaluatorRole.code == 'CEPMO-ENGR' ||
      this.evaluatorRole.code == 'CEPMO-DV'
    ) {
      return true;
    } else return false;
  }

  handleTechnicalEvaluatorNonCompliant() {
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
  }

  handleTechnicalEvaluatorCompliant() {
    this.checkFees
      .checkEvaluatorFees(4, this.applicationInfo.id, this.evaluatorRole.code)
      .subscribe((res) => {
        if (res == true) {
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
        } else {
          this.alert.openSuccessToast('Please add a fee');
          this.isLoading = false;
        }
      });
  }

  updateCbaoStatus(body) {
    this.applicationService
      .updateCbaoStatus(body, this.applicationInfo.id)
      .subscribe((res) => {
        this.alert.openSnackBar('Review Saved!');
        setTimeout(() => {
          this.isLoading = false;
          window.location.reload();
        }, 1500);
      });
  }
}
