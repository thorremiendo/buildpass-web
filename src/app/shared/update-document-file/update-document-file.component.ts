import { ApplicationInfoService } from './../../core/services/application-info.service';
import { NewApplicationService } from './../../core/services/new-application.service';
import { PopOutNotificationsService } from './../../core/services/pop-out-notification.service';
import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-update-document-file',
  templateUrl: './update-document-file.component.html',
  styleUrls: ['./update-document-file.component.scss'],
})
export class UpdateDocumentFileComponent implements OnInit {
  onClose = new EventEmitter();

  public loading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<UpdateDocumentFileComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private snackbar: PopOutNotificationsService,
    private newApplicationService: NewApplicationService,
    private applicationService: ApplicationInfoService
  ) {}

  ngOnInit(): void {}

  onSelect($event: NgxDropzoneChangeEvent) {
    if (!$event.rejectedFiles.length) {
      this.loading = true;
      const file = $event.addedFiles[0];
      this.checkEncryptedFile(file);
    } else {
      this.snackbar.openSuccessToast('You can only upload PDF files.');
    }
  }

  checkEncryptedFile(file) {
    var fileReader: FileReader = new FileReader();
    fileReader.onload = (e) => {
      const isEncrypted = fileReader.result.toString().includes('Encrypt');
      if (isEncrypted) {
        this.snackbar.openSuccessToast(
          'You can only upload unprotected PDF files.'
        );
      } else {
        this.uploadFile(file);
      }
    };
    fileReader.readAsText(file);
  }

  uploadFile(file) {
    this.loading = true;
    const uploadDocumentData = {
      document_path: file,
    };
    this.applicationService
      .updateDocumentFile(uploadDocumentData, this.data.document.id)
      .subscribe((res) => {
        if (this.data.application.permit_type_id == 2) {
          const body = {
            document_status_id: 1,
            receiving_status_id: 1,
          };
          this.newApplicationService
            .updateDocumentFile(body, res.data.id)
            .subscribe((res) => {
              this.snackbar.openSuccessToast('File updated!');
              this.dialogRef.close();
              this.loading = false;
              this.onDialogClose();
            });
        } else {
          this.snackbar.openSuccessToast('File updated!');
          this.dialogRef.close();
          this.loading = false;
          this.onDialogClose();
        }
      });
  }

  onDialogClose() {
    this.onClose.emit();
  }
}
