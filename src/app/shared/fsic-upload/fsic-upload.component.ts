import { WaterMarkService } from './../../core/services/watermark.service';
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
import { ViewSDKClient } from 'src/app/core/services/view-sdk.service';

@Component({
  selector: 'app-fsic-upload',
  templateUrl: './fsic-upload.component.html',
  styleUrls: ['./fsic-upload.component.scss'],
})
export class FsicUploadComponent implements OnInit {
  public fsicDocument: File;
  public formData = {};
  public userId;
  public applicationId;
  public userInfo;

  public isSubmitting: boolean = false;
  constructor(
    private newApplicationService: NewApplicationService,
    private watermark: WaterMarkService,
    public dialogRef: MatDialogRef<FsicUploadComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    this.applicationId = this.data.route.snapshot.params.id;
    this.newApplicationService
      .fetchUserInfo(this.applicationId)
      .subscribe((res) => {
        this.userInfo = res.data[0];
        this.userId = this.userInfo.user_detail.id;
      });
  }

  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'fsicDocument':
        this.fsicDocument = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'fsicDocument':
        this.fsicDocument = null;
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  callSave() {
    this.isSubmitting = true;
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.userId,
      document_id: 203,
      document_status_id: 1,
    };

    if (this.fsicDocument) {
      uploadDocumentData['document_path'] = this.fsicDocument;
    }

    this.newApplicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        const doc = res.data.document_path;
        const id = res.data.id;
        this.newApplicationService
          .updateDocumentFile({ receiving_status_id: 1 }, id)
          .subscribe((res) => {
            this.newApplicationService
              .updateDocumentFile({ bfp_status_id: 1 }, id)
              .subscribe((res) => {
                this.newApplicationService
                  .updateDocumentFile({ cbao_status_id: 1 }, id)
                  .subscribe((res) => {
                    this.newApplicationService
                      .updateDocumentFile({ cepmo_status_id: 1 }, id)
                      .subscribe((res) => {
                        Swal.fire(
                          'Success!',
                          `Document Uploaded`,
                          'success'
                        ).then((result) => {
                          this.isSubmitting = false;
                          this.onNoClick();
                        });
                      });
                  });
              });
          });
      });
  }
}
