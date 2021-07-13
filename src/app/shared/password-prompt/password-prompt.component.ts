import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-prompt',
  templateUrl: './password-prompt.component.html',
  styleUrls: ['./password-prompt.component.scss'],
})
export class PasswordPromptComponent implements OnInit {
  public passwordInput = new FormControl();
  constructor(
    public dialogRef: MatDialogRef<PasswordPromptComponent>,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  verifyPassword() {
    if (this.passwordInput.value === 'password') {
      this.onNoClick();
    } else {
      this.openSnackBar('Wrong Password! Please try again.');
      this.passwordInput.reset();
    }
  }
  handeBack() {
    this.router.navigateByUrl('/evaluator/home/table');
    this.onNoClick();
  }

  openSnackBar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
