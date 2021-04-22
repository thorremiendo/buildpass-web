import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA  } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EvaluatorService } from "../../core";


@Component({
  selector: 'app-employee-reset-password',
  templateUrl: './employee-reset-password.component.html',
  styleUrls: ['./employee-reset-password.component.scss']
})
export class EmployeeResetPasswordComponent{
  public title:string = "Reset Password";
  public userName:string;
  public tempPass:string;
  public confirmed:boolean = false;
  public loading:boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data,
    private evaluatorService: EvaluatorService,
    private snackBar: MatSnackBar
  ) {}

  confirmClicked() {
    this.title = "Resetting Password..."
    this.loading = true;
    this.evaluatorService
      .resetPassword(this.data.employeeId)
      .subscribe(
        (res) => {
          
          let data = res.data[0];
          
          this.title = "Password reset successfully"
          this.userName = data.username;
          this.tempPass = data.password;
           this.loading = false;
           this.confirmed = true;

        },

        (err) => {
          this.snackBar.open("Something went wrong...", "Close", {
            horizontalPosition: "left",
          });
        }
      );
  }
}
