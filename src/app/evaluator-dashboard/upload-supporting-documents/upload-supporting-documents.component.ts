import { ApplicationInfoService } from './../../core/services/application-info.service';
import { Validators, FormControl, FormControlName } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-supporting-documents',
  templateUrl: './upload-supporting-documents.component.html',
  styleUrls: ['./upload-supporting-documents.component.scss'],
})
export class UploadSupportingDocumentsComponent implements OnInit {
  public files: File[] = [];
  fileName = new FormControl('', [Validators.required]);
  constructor(
    public dialogRef: MatDialogRef<UploadSupportingDocumentsComponent>,
    private applicationInfoService: ApplicationInfoService,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  handleUploadSupportingFiles() {
    const id = this.data.applicationDetails.id;
    const body = {
      user_id: this.data.evaluator.id,
      title: this.fileName.value,
      supporting_files: this.files,
    };
    console.log({ body });
    this.applicationInfoService
      .uploadSupportingFiles(body, id)
      .subscribe((res) => {
        Swal.fire('Success!', `${body.title} uploaded!`, 'success').then(
          (result) => {
            this.onNoClick();
          }
        );
      });
  }
}
