import { EsignatureService } from './../../core/services/esignature.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticeOfViolationService } from 'src/app/core/services/notice-of-violation.service';
import { PopOutNotificationsService } from 'src/app/core/services/pop-out-notification.service';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-notice-of-violation-summary',
  templateUrl: './notice-of-violation-summary.component.html',
  styleUrls: ['./notice-of-violation-summary.component.scss'],
})
export class NoticeOfViolationSummaryComponent implements OnInit {
  subId: any;
  isLoading: boolean = false;
  subDetails: any;
  userRole: string;
  userInfo;
  isSubmitting: boolean = false;
  userPdfSignature;
  userSignature;
  constructor(
    private nov: NoticeOfViolationService,
    private route: ActivatedRoute,
    private router: Router,
    private notif: PopOutNotificationsService,
    private NgxExtendedPdfViewerService: NgxExtendedPdfViewerService,
    private esignatureService: EsignatureService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.userRole = this.userInfo.user_roles[0].role[0].code;
    this.subId = this.route.snapshot.params.id;
    this.nov.getSubById(this.subId).subscribe((res) => {
      this.subDetails = res.data[0];
      console.log(this.subDetails);
      this.isLoading = false;
    });
  }
  async handleUpdateForm() {
    this.isSubmitting = true;
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
            this.notif.openSnackBar('Form Saved!');
            this.nov.getSubById(this.subId).subscribe((res) => {
              this.subDetails = res.data[0];
              console.log(this.subDetails);
              this.isSubmitting = false;
            });
          });
      }
    );
  }

  handleForwardDc() {
    this.isLoading = true;
    this.nov.updateSub({ status_id: 1 }, this.subId).subscribe((res) => {
      this.nov.getSubById(this.subId).subscribe((res) => {
        this.subDetails = res.data[0];
        console.log(this.subDetails);
        this.notif.openSnackBar('Success!');
        this.isLoading = false;
      });
    });
  }

  handleForward() {
    this.isLoading = true;
    this.nov.updateSub({ status_id: 2 }, this.subId).subscribe((res) => {
      this.nov.getSubById(this.subId).subscribe((res) => {
        this.subDetails = res.data[0];
        console.log(this.subDetails);
        this.notif.openSnackBar('Success!');
        this.isLoading = false;
      });
    });
  }
  handleReturn() {
    this.isLoading = true;
    this.nov.updateSub({ status_id: 5 }, this.subId).subscribe((res) => {
      this.nov.getSubById(this.subId).subscribe((res) => {
        this.subDetails = res.data[0];
        console.log(this.subDetails);
        this.notif.openSnackBar('Success!');
        this.isLoading = false;
      });
    });
  }

  forHearing() {}

  getStatus(id) {
    switch (id) {
      case 1:
        return 'For Initial Review of Division Chief';
      case 2:
        return 'For Signature of Department Head';
      case 3:
        return 'Delivered';
      case 5:
        return 'Pending';
    }
  }
  getType(id) {
    switch (id) {
      case 1:
        return 'First Notice of Violation';
      case 2:
        return 'Second Notice of Violation';
      case 3:
        return 'Third and Final Notice of Violation';
    }
  }

  handleSignature() {
    this.router.navigate(['evaluator/nov/sign', this.subId]);

    // this.esignatureService
    //   .generateSignature(this.userInfo.id)
    //   .subscribe((res) => {
    //     this.userPdfSignature = res.data;
    //     html2canvas(
    //       document.querySelector('.pdf-container') as HTMLElement
    //     ).then((canvas: any) => {
    //       let image = canvas
    //         .toDataURL('image/png', 1.0)
    //         .replace('image/png', 'image/png');
    //       this.userSignature = image;
    //       this.nov.bldgPermitSignature(
    //         this.subDetails.notice_of_violation_form_path,
    //         this.userSignature
    //       );
    //     });
    //   });
  }
}
