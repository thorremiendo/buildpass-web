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

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss'],
})
export class FormDetailsComponent implements OnInit {
  panelOpenState = false;
  public permitDetails: FormGroup;
  public user;
  public userDetails;
  public applicationId;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newApplicationService: NewApplicationService,
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormDetailsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    this.userService.cast.subscribe((userSubject) => (this.user = userSubject));
    console.log("Current user", this.user);
    this.applicationId = this.data.route.snapshot.params.id;
    console.log(this.applicationId);
    console.log(this.data)
    this.permitDetails = this.fb.group({
      form_remarks: new FormControl(''),
      is_compliant: new FormControl(''),
    });
  }

  callSave() {
    console.log(this.permitDetails.value);
    const uploadDocumentData = {
      evaluator_user_id: this.data.evaluator.id,
      remarks: this.permitDetails.value.form_remarks,
      receiving_status_id: this.permitDetails.value.is_compliant,
    };
    console.log(uploadDocumentData, this.data.form.id);
    this.newApplicationService
      .updateUserDocs(uploadDocumentData, this.data.form.id)
      .subscribe((res) => {
        Swal.fire('Success!', `Review saved!`, 'success').then((result) => {});
      });
    this.onNoClick();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  callUpdate(){
    console.log("Update clicked")
  }
}
