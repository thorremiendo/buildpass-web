import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticeOfViolationService } from 'src/app/core/services/notice-of-violation.service';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { PopOutNotificationsService } from 'src/app/core/services/pop-out-notification.service';

@Component({
  selector: 'app-notice-of-violation-forms',
  templateUrl: './notice-of-violation-forms.component.html',
  styleUrls: ['./notice-of-violation-forms.component.scss'],
})
export class NoticeOfViolationFormsComponent implements OnInit {
  subId: any;
  isLoading: boolean = false;
  sample =
    'https://s3-ap-southeast-1.amazonaws.com/buildpass-storage/L9DPJZn9bqUkUpJI7JQlCBmBb4iepqclrpz5iMLG.pdf';
  pdfSource =
    'https://s3-ap-southeast-1.amazonaws.com/buildpass-storage/ThYFr6CHAhwp8DcL4Di11hKiFngYvY7lnNEpliQX.pdf';
  subDetails: any;
  formData;
  actions = [];
  actionList = [];
  constructor(
    private nov: NoticeOfViolationService,
    private route: ActivatedRoute,
    private router: Router,
    private NgxExtendedPdfViewerService: NgxExtendedPdfViewerService,
    private notif: PopOutNotificationsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subId = this.route.snapshot.params.id;
    this.nov.getSubById(this.subId).subscribe((res) => {
      this.subDetails = res.data[0];
      this.actions = this.subDetails.actions.split(',');
      this.getActions();
      this.generateImages();
    });
  }

  getActions() {
    this.nov.getActions(this.subDetails.type_id).subscribe((res) => {
      this.actions.forEach((e, index, array) => {
        let find = res.data.find((f) => f.id == e);
        if (find) {
          this.actionList.push(find);
        }
        if (index == array.length - 1) {
          this.generateFormData();
        }
      });
    });
  }

  generateFormData() {
    console.log('actions', this.actionList);
    this.formData = {
      first: this.subDetails.type_id == 1 ? 'Yes' : null,
      second: this.subDetails.type_id == 2 ? 'Yes' : null,
      third: this.subDetails.type_id == 3 ? 'Yes' : null,
      location_a: `${this.subDetails.main_detail.structure_house_number}  ${this.subDetails.main_detail.structure_purok}`,
      location_b: `${this.subDetails.main_detail.structure_street}  ${this.subDetails.main_detail.structure_subdivision}`,
      action_a: this.actionList[0] ? this.actionList[0].action : null,
      action_b: this.actionList[1] ? this.actionList[1].action : null,
      action_c: this.actionList[2] ? this.actionList[2].action : null,
      action_d: this.actionList[3] ? this.actionList[3].action : null,
    };

    console.log(this.formData);
  }

  generateImages() {
    this.nov
      .generatePdf(this.subDetails.photo_a_path, this.subDetails.photo_b_path)
      .then((blob) => {
        this.nov.uploadFile({ file: blob }).subscribe(
          (res) => {
            console.log('res', res);
          },
          (err) => {
            this.nov
              .updateSub(
                {
                  notice_of_violation_photo_path: err.error.text,
                },
                this.subDetails.id
              )
              .subscribe((res) => {
                this.subDetails = res.data;
                console.log('update', this.subDetails);
              });
          }
        );
      });
  }

  async handleNext() {
    const blob =
      await this.NgxExtendedPdfViewerService.getCurrentDocumentAsBlob();

    this.nov.uploadFile({ file: blob }).subscribe(
      (res) => {},
      (err) => {
        this.nov
          .updateSub(
            { notice_of_violation_form_path: err.error.text },
            this.subDetails.id
          )
          .subscribe((res) => {
            this.notif.openSnackBar('Success!');
            this.router.navigate(['/evaluator/nov/view', res.data.id]);
          });
      }
    );
  }
}
