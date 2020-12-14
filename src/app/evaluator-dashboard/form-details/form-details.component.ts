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
    this.authService.currentUser.subscribe((currentUser) => {
      this.user = currentUser;
      this.userService.fetchUserInfo(this.user.user.uid).subscribe((result) => {
        this.userDetails = result.data;
        console.log(this.userDetails);
      });
    });
    this.applicationId = this.data.route.snapshot.params.id;
    console.log(this.applicationId)

    this.permitDetails = this.fb.group({
      form_remarks: new FormControl(''),
      is_compliant: new FormControl('')
    })
  }

  callSave() {
    console.log(this.permitDetails.value);
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.userDetails.id,
      document_id: this.data.form.document_id,
      document_status_id: this.permitDetails.value.is_compliant,
    };
    console.log(uploadDocumentData)
    this.newApplicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        Swal.fire(
          'Success!',
          `Review saved!`,
          'success'
        ).then((result) => {
        });
      });
    this.onNoClick();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
