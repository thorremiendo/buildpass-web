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
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-fire-clearance',
  templateUrl: './fire-clearance.component.html',
  styleUrls: ['./fire-clearance.component.scss'],
})
export class FireClearanceComponent implements OnInit {
  public fireClearanceFile: File;
  public formData = {};
  public userId;
  public applicationId;
  public userInfo;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newApplicationService: NewApplicationService,
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FireClearanceComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.applicationId = this.data.route.snapshot.params.id;
    this.newApplicationService
      .fetchUserInfo(this.applicationId)
      .subscribe((res) => {
        this.userInfo = res.data[0];
        this.userId = this.userInfo.user_detail.id;
        console.log(this.userId);
      });
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'fireClearanceFile':
        this.fireClearanceFile = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'fireClearanceFile':
        this.fireClearanceFile = null;
        break;
    }
  }
  callSave() {
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.userId,
      document_id: 45,
      document_status_id: 1,
    };
    if (this.fireClearanceFile) {
      uploadDocumentData['document_path'] = this.fireClearanceFile;
    }
    this.newApplicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        Swal.fire('Success!', `File uploaded!`, 'success').then((result) => {
          this.onNoClick();
        });
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
