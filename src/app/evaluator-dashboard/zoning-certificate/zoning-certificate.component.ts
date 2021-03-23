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
import { userDocuments } from 'src/app/core/variables/documents';

@Component({
  selector: 'app-zoning-certificate',
  templateUrl: './zoning-certificate.component.html',
  styleUrls: ['./zoning-certificate.component.scss'],
})
export class ZoningCertificateComponent implements OnInit {
  public zoningComplianceForm: File;
  public formData = {};
  public userId;
  public applicationId;
  public userInfo;
  public userDocument = userDocuments[42];

  constructor(
    private newApplicationService: NewApplicationService,
    private watermark: WaterMarkService,
    public dialogRef: MatDialogRef<ZoningCertificateComponent>,
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
        console.log('User', this.userId);
      });
  }

  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'zoningComplianceForm':
        this.zoningComplianceForm = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'zoningComplianceForm':
        this.zoningComplianceForm = null;
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  callSave() {
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.userId,
      document_id: this.userDocument.id,
      document_status_id: 1,
    };

    if (this.zoningComplianceForm) {
      uploadDocumentData['document_path'] = this.zoningComplianceForm;
    }

    console.log(uploadDocumentData);
    this.newApplicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        const doc = res.data.document_path;
        const id = res.data.id;
        this.watermark.generateQrCode(this.applicationId).subscribe((res) => {
          this.watermark
            .insertQrCode(doc, res.data, 'zoning-permit')
            .then((blob) => {
              const updateFileData = {
                document_status_id: 1,
                document_path: blob,
              };
              this.newApplicationService
                .updateDocumentFile(updateFileData, id)
                .subscribe((res) => {
                  console.log(res);
                  Swal.fire(
                    'Success!',
                    `${this.userDocument.name} uploaded!`,
                    'success'
                  ).then((result) => {
                    this.onNoClick();
                  });
                });
            });
        });
      });
  }
}
