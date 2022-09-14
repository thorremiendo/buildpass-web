import { PopOutNotificationsService } from './../../core/services/pop-out-notification.service';
import { NoticeOfViolationService } from 'src/app/core/services/notice-of-violation.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import { EsignatureService } from 'src/app/core/services/esignature.service';
import { PasswordPromptComponent } from 'src/app/shared/password-prompt/password-prompt.component';

@Component({
  selector: 'app-notice-of-violation-esig',
  templateUrl: './notice-of-violation-esig.component.html',
  styleUrls: ['./notice-of-violation-esig.component.scss'],
})
export class NoticeOfViolationEsigComponent implements OnInit {
  public novId;
  public docId;
  public userPdfSignature;
  public isLoading: boolean = false;
  public userDetails;
  public userSignature;
  public esigRendered: boolean = false;
  subDetails;
  submitting: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private esignatureService: EsignatureService,
    private nov: NoticeOfViolationService,
    private notif: PopOutNotificationsService
  ) {}

  ngOnInit(): void {
    this.novId = this.route.snapshot.params.id;
    this.userDetails = JSON.parse(localStorage.getItem('user'));
    this.fetchUserSignature();
    this.nov.getSubById(this.novId).subscribe((res) => {
      this.subDetails = res.data[0];
      console.log(this.subDetails);
      this.isLoading = false;
    });
  }

  goToEsig() {
    this.router.navigate([
      '/evaluator/application/sign',
      this.novId,
      this.docId,
    ]);
  }

  openDialog() {
    // this.esignatureService.goToEsig(this.novId, this.docId, this.userSignature);
  }

  pageRendered(e: CustomEvent) {
    this.esigRendered = true;
  }

  fetchUserSignature() {
    this.isLoading = true;
    this.esignatureService
      .generateSignature(this.userDetails.id)
      .subscribe((res) => {
        this.userPdfSignature = res.data;
        this.isLoading = false;
      });
  }

  public selectSignature() {
    html2canvas(document.querySelector('.pdf-container') as HTMLElement).then(
      (canvas: any) => {
        this.getCanvasToDownload(canvas);
      }
    );
  }

  private getCanvasToDownload(canvas: any) {
    this.submitting = true;
    // let ctx = canvas.getContext('2d');
    // // ctx.scale(10, 10);
    let image = canvas
      .toDataURL('image/png', 1.0)
      .replace('image/png', 'image/png');
    this.userSignature = image;
    // this.openDialog();
    this.nov
      .inserEsig(
        this.subDetails.notice_of_violation_form_path,
        this.userSignature
      )
      .then((blob) => {
        this.nov.uploadFile({ file: blob }).subscribe(
          (res) => {
            console.log('res', res);
          },
          (err) => {
            this.nov
              .updateSub(
                {
                  notice_of_violation_form_path: err.error.text,
                },
                this.subDetails.id
              )
              .subscribe((res) => {
                this.subDetails = res.data;
                this.submitting = false;
                this.notif.openSnackBar('Success!');
                this.router.navigate(['/evaluator/nov/view', res.data.id]);
              });
          }
        );
      });
  }
}
