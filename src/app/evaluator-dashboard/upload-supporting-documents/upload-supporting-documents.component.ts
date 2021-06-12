import { ApplicationInfoService } from './../../core/services/application-info.service';
import { Validators, FormControl, FormControlName } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-upload-supporting-documents',
  templateUrl: './upload-supporting-documents.component.html',
  styleUrls: ['./upload-supporting-documents.component.scss'],
})
export class UploadSupportingDocumentsComponent implements OnInit {
  public isSubmitting: boolean = false;
  public selectedFile: File;
  fileName = new FormControl('', [Validators.required]);
  fileDesc = new FormControl('');
  constructor(
    public dialogRef: MatDialogRef<UploadSupportingDocumentsComponent>,
    private applicationInfoService: ApplicationInfoService,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {}
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'selectedFile':
        this.selectedFile = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'selectedFile':
        this.selectedFile = null;
        break;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  handleUploadSupportingFiles() {
    const id = this.data.applicationDetails.id;
    this.isSubmitting = true;
    if (this.data.evaluator) {
      const body = {
        evaluator_user_id: this.data.evaluator.user_id,
        title: this.fileName.value,
        file_path: this.selectedFile,
      };
      this.applicationInfoService
        .uploadSupportingFiles(body, id)
        .subscribe((res) => {
          Swal.fire('Success!', `${body.title} uploaded!`, 'success').then(
            (result) => {
              this.onNoClick();
              this.isSubmitting = false;
            }
          );
        });
    } else {
      const body = {
        applicant_user_id: this.data.user.id,
        title: this.fileName.value,
        file_path: this.selectedFile,
      };
      this.applicationInfoService
        .uploadSupportingFiles(body, id)
        .subscribe((res) => {
          Swal.fire('Success!', `${body.title} uploaded!`, 'success').then(
            (result) => {
              this.onNoClick();
              this.isSubmitting = false;
            }
          );
        });
    }
  }
}
