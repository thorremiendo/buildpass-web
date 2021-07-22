import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, FormValidatorService, UserService } from '../../core';

@Component({
  selector: 'app-update-password-dialog',
  templateUrl: './update-password-dialog.component.html',
  styleUrls: ['./update-password-dialog.component.scss'],
})
export class UpdatePasswordDialogComponent implements OnInit {
  public hide: boolean = true;
  public loading: boolean = false;
  public submitted: boolean = false;
  public changePasswordForm: FormGroup;
  
  get changePasswordFormControl() {
    return this.changePasswordForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private formValidator: FormValidatorService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<UpdatePasswordDialogComponent>
  ) {}

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.formValidator.patternValidator(),
          ]),
        ],
        confirmPassword: [
          '', 
          Validators.compose([
            Validators.required,
          ]),
        ],
      },
      {
        validator: this.formValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      });
  }

  updatePassword() {
    this.submitted = true;
    if (this.changePasswordForm.valid) {
      this.loading = true;
      const newPassword = this.changePasswordForm.value.password;
      if (this.data.firebase_uid) {
        this.authService
          .ChangePassword(newPassword)
          .then(res => {
            this.snackBar.open('Password successfully changed.', 'Close', {
              horizontalPosition: 'center',
            });
            this.dialogRef.close();
          });
      } else {
        this.userService
          .updateUserInfo(
            {
              password: newPassword,
            }, 
            this.data.user_id
          )
          .subscribe(res => {
            this.snackBar.open('Password successfully changed.', 'Close', {
              horizontalPosition: 'center',
            });
            this.dialogRef.close();
          });
      }
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}