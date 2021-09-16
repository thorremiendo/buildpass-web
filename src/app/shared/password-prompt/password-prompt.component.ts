import { EsignatureService } from 'src/app/core/services/esignature.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-prompt',
  templateUrl: './password-prompt.component.html',
  styleUrls: ['./password-prompt.component.scss'],
})
export class PasswordPromptComponent implements OnInit {
  public applicationId;
  public docId;
  public passwordInput = new FormControl();
  public isLoading: boolean = false;
  public userDetails;
  constructor(
    public dialogRef: MatDialogRef<PasswordPromptComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private router: Router,
    private snackbar: MatSnackBar,
    private esignatureService: EsignatureService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  verifyPassword() {
    this.isLoading = true;
    const username = this.userDetails.user_credentials[0].username;
    const body = {
      username: username,
      password: this.passwordInput.value,
    };
    this.esignatureService.verifyEvaluator(body).subscribe(
      (res) => {
        if (res.data) {
          this.esignatureService.goToEsig(
            this.data.appId,
            this.data.docId,
            this.data.signature
          );
          this.esignatureService.setStep(2);
          this.onNoClick();
        } else {
          this.openSnackBar('Wrong Password! Please try again.');
          this.passwordInput.reset();
        }
      },
      (error) => {
        this.openSnackBar('Error! Please try again.');
        this.passwordInput.reset();
      }
    );
  }
  handeBack() {
    this.onNoClick();
  }

  openSnackBar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
