import { PopOutNotificationsService } from './../../core/services/pop-out-notification.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss'],
})
export class UploadDocumentComponent implements OnInit {
  public selectedFile: File;
  public isLoading: boolean = false;
  public evaluator;
  constructor(
    public dialogRef: MatDialogRef<UploadDocumentComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private applicationService: NewApplicationService,
    private popout: PopOutNotificationsService
  ) {}

  ngOnInit(): void {
    this.evaluator = this.data.evaluator;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

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

  handleFileUpload() {
    this.isLoading = true;
    const application = this.data.application;
    const uploadDocumentData = {
      application_id: this.data.application.id,
      user_id: application.user_id,
      evaluator_user_id: this.evaluator.employee_detail.user_id,
      document_id: 224,
      document_path: this.selectedFile,
      document_status: 1,
    };

    this.applicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        this.popout.openSnackBar('Saved!');
        this.isLoading = false;
        window.location.reload();
      });
  }
}
