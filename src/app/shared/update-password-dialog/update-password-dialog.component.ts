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
  public title: string = 'Change Password';
  public userName: string;
  public tempPass: string;
  public confirmed: boolean = false;
  public loading: boolean = false;
  public submitted: boolean = false;

  public changePasswordForm: FormGroup;

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
    this.createForm();
  }

  get changePasswordFormControl() {
    return this.changePasswordForm.controls;
  }

  createForm() {
    this.changePasswordForm = this.fb.group(
      {
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.formValidator.patternValidator(),
          ]),
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.formValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  confirmClicked(value) {
    this.title = 'Processing...';
    this.submitted = true;
    this.loading = true;

    let body = {
      password: value.password,
    };

    if (this.changePasswordForm.valid) {
      if(this.data.firebase_uid != null){

        this.authService
          .ChangePassword(value.password)
          .then((result) =>{
            if(result == "Something went wrong"){
              this.snackBar.open('Something went wrong...', 'Close', {
                horizontalPosition: 'left',
              });
              this.dialogRef.close();
            }
            else{
              this.title = 'Warning';
              this.confirmed = true;
              this.loading = false;
            }
          })
      }
      else{
        this.userService.updateUserInfo(body, this.data.user_id).subscribe(
          (res) => {
            this.title = 'Warning';
            this.confirmed = true;
            this.loading = false;
          },
  
          (err) => {
            this.snackBar.open('Something went wrong...', 'Close', {
              horizontalPosition: 'left',
            });
            this.dialogRef.close();
          }
        );
      }
    }
  }

  logOut() {
    if(this.data.firebase_uid != null){
      this.authService.userSignOut();
    }
    else{
      this.authService.evaluatorSignOut();
    }
  }
}
