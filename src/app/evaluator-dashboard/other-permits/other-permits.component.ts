import { WaterMarkService } from './../../core/services/watermark.service';
import { NewApplicationService } from './../../core/services/new-application.service';
import { ActivatedRoute } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-other-permits',
  templateUrl: './other-permits.component.html',
  styleUrls: ['./other-permits.component.scss'],
})
export class OtherPermitsComponent implements OnInit {
  @Input() applicationInfo;
  @Input() evaluatorRole;
  @Input() evaluatorDetails;
  @Input() userDocuments;

  public isLoading: boolean = false;
  public applicationId;

  constructor(
    private snackBar: MatSnackBar,
    private applicationService: ApplicationInfoService,
    private route: ActivatedRoute,
    private newApplicationService: NewApplicationService,
    private waterMarkService: WaterMarkService
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params.id;
    this.getTechnicalStatus();
  }

  checkFormsCompliant() {
    const isCompliant = this.userDocuments.every(
      (form) => form.document_status_id == 1
    );
    return isCompliant;
  }

  checkFormsReviewed() {
    const isReviewed = this.userDocuments.every(
      (form) => form.document_status_id == 1 || form.document_status_id == 2
    );
    return isReviewed;
  }

  canEvaluate() {
    if (this.evaluatorRole.code == 'CBAO-LG') {
      if (
        this.applicationInfo.cbao_lg_status_id == 1 ||
        this.applicationInfo.cbao_lg_status_id == 2
      ) {
        return false;
      } else return true;
    } else if (this.evaluatorRole.code == 'CBAO-STR') {
      if (
        this.applicationInfo.cbao_str_status_id == 1 ||
        this.applicationInfo.cbao_str_status_id == 2
      ) {
        return false;
      } else return true;
    } else if (this.evaluatorRole.code == 'CBAO-ELEC') {
      if (
        this.applicationInfo.cbao_elec_status_id == 1 ||
        this.applicationInfo.cbao_elec_status_id == 2
      ) {
        return false;
      } else return true;
    }
  }
  forwardToTechnicalEvalautors() {
    this.isLoading = true;
    const body = {
      application_status_id: 18,
      receiving_status_id: 1,
    };
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        this.userDocuments.forEach((element) => {
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
  }
  returnToApplicant() {
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
            cbao_status_id: 2,
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
  forwardToDivisionChief() {
    this.isLoading = true;
    const body = {
      application_status_id: 12,
    };
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        this.isLoading = false;
        this.openSnackBar('Forwarded to Division Chief!');
      });
  }
  notifyBuildingOfficial() {
    this.isLoading = true;
    // if (this.applicationInfo.main_permit_id) {
    //   this.applicationService
    //     .fetchApplicationInfo(this.applicationInfo.main_permit_id)
    //     .subscribe((res) => {
    //       const status = res.data.application_status_id;

    //       if (status == 12 || status == 13) {
    //         this.forwardToBuildingOfficial();
    //       } else {
    //         this.isLoading = false;
    //         this.openSnackBar(
    //           'Associated Building Permit applicatition is still under technical evaluation.'
    //         );
    //       }
    //     });
    // } else {
    //   this.forwardToBuildingOfficial();
    // }
    this.forwardToBuildingOfficial();
  }
  forwardToBuildingOfficial() {
    this.isLoading = true;
    const body = {
      application_status_id: 13,
      dc_status_id: 1,
    };
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        this.isLoading = false;
        this.openSnackBar('Forwarded to Building Official!');
        window.location.reload();
      });
  }
  forPayment() {
    this.isLoading = true;
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
  addWatermarkToAllCompliant() {
    var count = 0;
    var bar = new Promise<void>((resolve, reject) => {
      this.userDocuments.forEach((element, index, array) => {
        this.isLoading = true;
        if (element.document_id !== 50) {
          this.waterMarkService
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
                    this.openSnackBar('Permit Approved!');
                    window.location.reload();
                  }
                });
            });
        }
      });
    });
  }
  handleRelease() {
    this.isLoading = true;
    const body = {
      application_status_id: 11,
      releasing_status_id: 1,
    };
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        this.isLoading = false;
        this.openSnackBar('Permit Released!');
        window.location.reload();
      });
  }
  getTechnicalStatus() {
    this.applicationService
      .fetchTechnicalStatus(this.applicationId)
      .subscribe((res) => {
        console.log(res);
        this.validateTechnicalStatus(res.data);
        if (this.applicationInfo.application_status_id == 18) {
          if (this.validateTechnicalStatus(res.data) == true) {
            console.log('ready', res);
            this.forwardToDivisionChief();
          } else {
            console.log('err');
          }
        }
      });
  }
  validateTechnicalStatus(data) {
    delete data.id;
    const status = data;

    const check = Object.entries(status).every(([key, value]) => {
      if (value == 0) {
        return false;
      } else return true;
    });
    return check;
  }
  handleTechnicalStatus(status) {
    switch (this.evaluatorRole.code) {
      case 'CBAO-LG':
        const lg = {
          cbao_lg_status_id: status,
          evaluator_user_id: this.evaluatorDetails.user_id,
        };
        this.updateCbaoStatus(lg);
        break;
      case 'CBAO-STR':
        const str = {
          cbao_str_status_id: status,
          evaluator_user_id: this.evaluatorDetails.user_id,
        };
        this.updateCbaoStatus(str);
        break;
      case 'CBAO-ELEC':
        const elec = {
          cbao_elec_status_id: status,
          evaluator_user_id: this.evaluatorDetails.user_id,
        };
        this.updateCbaoStatus(elec);
        break;
      case 'CBAO-ARCH':
        const arch = {
          cbao_arch_status_id: status,
          evaluator_user_id: this.evaluatorDetails.user_id,
        };
        this.updateCbaoStatus(arch);
        break;
    }
  }
  updateCbaoStatus(body) {
    this.isLoading = true;
    this.applicationService
      .updateCbaoStatus(body, this.applicationId)
      .subscribe((res) => {
        Swal.fire('Success!', `Review Saved!`, 'success').then((result) => {
          this.isLoading = false;
          window.location.reload();
        });
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
