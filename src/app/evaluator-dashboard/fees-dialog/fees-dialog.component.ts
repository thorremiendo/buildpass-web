import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { UserService } from 'src/app/core/services/user.service';
import { ApplicationFeesService } from 'src/app/core/services/application-fees.service';
@Component({
  selector: 'app-fees-dialog',
  templateUrl: './fees-dialog.component.html',
  styleUrls: ['./fees-dialog.component.scss'],
})
export class FeesDialogComponent implements OnInit {
  public user;
  public userDetails;
  public applicationId;
  public feesDetails: FormGroup;
  public evaluatorDetails;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newApplicationService: NewApplicationService,
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private applicationFeeService: ApplicationFeesService,
    public dialogRef: MatDialogRef<FeesDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.evaluatorDetails = this.user.employee_detail;
    console.log('Current user', this.user);
    this.applicationId = this.data.route.snapshot.params.id;
    console.log(this.applicationId);
    console.log(this.data);
    this.feesDetails = this.fb.group({
      description: new FormControl(''),
      amount: new FormControl(''),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    const value = this.feesDetails.value;
    const newItem = {
      application_id: this.applicationId,
      name: value.description,
      amount: value.amount,
      office_id: this.evaluatorDetails.office_id,
      evaluator_user_id: this.evaluatorDetails.id,
    };
    this.applicationFeeService.addFee(newItem).subscribe((res) => {
      console.log(res);
      this.onNoClick();
    });
  }
}
