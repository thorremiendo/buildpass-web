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
    private newApplicationService: NewApplicationService
  ) {}

  ngOnInit(): void {}

  handleReviewDone() {
    switch (this.evaluatorRole.code) {
      case 'CBAO-REC':
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
          this.alert.openInfoToast('Review all documents first!');
        }
        break;

      default:
        break;
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
        this.isLoading = false;
        this.alert.openInfoToast('Returned to Applicant!');
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
        this.updateApplicationStatus();
      }
    });
  }

  updateApplicationStatus() {
    const body = {
      application_status_id: 3,
      receiving_status_id: 1,
    };
    this.applicationService
      .updateApplicationStatus(body, this.applicationInfo.id)
      .subscribe((res) => {
        this.isLoading = false;
        this.alert.openInfoToast('Forwarded to BFP, CEPMO and CBAO!');
        window.location.reload();
      });
  }

  isAuthorized() {
    const role = this.evaluatorRole.code;
    const status = this.applicationInfo.application_status_id;
    if (role == 'CBAO-REC') {
      if (status == 1) return true;
      else return false;
    }
  }
}
