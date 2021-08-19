import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { EsignatureService } from 'src/app/core/services/esignature.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material/dialog';
import { PasswordPromptComponent } from './../password-prompt/password-prompt.component';

@Component({
  selector: 'app-esig-prompt',
  templateUrl: './esig-prompt.component.html',
  styleUrls: ['./esig-prompt.component.scss'],
})
export class EsigPromptComponent implements OnInit {
  public applicationId;
  public docId;
  public userPdfSignature;
  public isLoading: boolean = false;
  public userDetails;
  public userSignature;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private esignatureService: EsignatureService,
    private applicationService: ApplicationInfoService
  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    this.applicationId = this.route.snapshot.params.id;
    this.docId = this.route.snapshot.params.docId;
    this.userDetails = JSON.parse(localStorage.getItem('user'));
    this.fetchUserSignature();
  }

  goToEsig() {
    this.router.navigate([
      '/evaluator/application/sign',
      this.applicationId,
      this.docId,
    ]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(PasswordPromptComponent, {
      disableClose: true,
      width: '400px',
      data: {
        signature: this.userSignature,
        docId: this.docId,
        appId: this.applicationId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  fetchUserSignature() {
    this.isLoading = true;
    const body = {
      user_document_id: this.docId,
    };
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
    let ctx = canvas.getContext('2d');
    ctx.scale(3, 3);
    let image = canvas.toDataURL('image/png').replace('image/png', 'image/png');
    this.userSignature = image;
    this.openDialog();
  }
}
