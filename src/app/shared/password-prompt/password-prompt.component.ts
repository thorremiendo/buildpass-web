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
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  verifyPassword() {
    if (this.passwordInput.value === 'password') {
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
