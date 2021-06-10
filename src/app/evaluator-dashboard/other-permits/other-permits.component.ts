import { ActivatedRoute } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-other-permits',
  templateUrl: './other-permits.component.html',
  styleUrls: ['./other-permits.component.scss'],
})
export class OtherPermitsComponent implements OnInit {
  @Input() applicationInfo;
  @Input() evaluatorRole;
  @Input() dataSource;
  public isLoading: boolean = true;
  public applicationId;

  constructor(
    private snackBar: MatSnackBar,
    private applicationService: ApplicationInfoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params.id;
  }

  checkFormsCompliant() {
    const isCompliant = this.dataSource.every(
      (form) => form.document_status_id == 1
    );
    return isCompliant;
  }

  checkFormsReviewed() {
    const isReviewed = this.dataSource.every(
      (form) => form.document_status_id == 1 || form.document_status_id == 2
    );
    return isReviewed;
  }
  updateApplicationStatus() {}
  forwardToDivisionChief() {}
  notifyBuildingOfficial() {}
  forPayment() {}
  handleRelease() {}
  otherPermitsReturnToApplicant() {
    if (this.checkFormsReviewed()) {
      this.isLoading = true;
      if (this.evaluatorRole.code == 'CBAO-REC') {
        const body = {
          application_status_id: 5,
          receiving_status_id: 2,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            this.isLoading = false;
            this.openSnackBar('Returned to Applicant!');
            window.location.reload();
          });
      } else if (this.evaluatorRole.code == 'CBAO-DC') {
        const body = {
          application_status_id: 5,
          dc_status_id: 2,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            this.isLoading = false;
            this.openSnackBar('Returned to Applicant!');
            window.location.reload();
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
            this.openSnackBar('Returned to Applicant!');
            window.location.reload();
          });
      } else {
        //IF TECHNICAL EVALUATORS\
        const body = {
          application_status_id: 5,
          cbao_status_id: 2,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            this.isLoading = false;
            this.openSnackBar('Returned to Applicant!');
            window.location.reload();
          });
      }
    } else {
      this.isLoading = false;
      this.openSnackBar('Review all documents first!');
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
