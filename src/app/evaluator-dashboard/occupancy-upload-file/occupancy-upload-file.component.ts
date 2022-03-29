import { NewApplicationService } from './../../core/services/new-application.service';
import { OccupancyService } from './../../core/services/occupancy.service';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-occupancy-upload-file',
  templateUrl: './occupancy-upload-file.component.html',
  styleUrls: ['./occupancy-upload-file.component.scss'],
})
export class OccupancyUploadFileComponent implements OnInit {
  public selectedDocument;
  public documentList;
  public oldBpDetails;
  public selectedFile: File;
  public selectedOldBpNumber;
  public oldBpList;
  public selectedOldBpDetails;
  public evaluator;
  public isLoading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<OccupancyUploadFileComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private occupancyService: OccupancyService,
    private applicationService: NewApplicationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.evaluator = JSON.parse(localStorage.getItem('user'));
    this.applicationService.fetchDocumentTypes().subscribe((res) => {
      const DOCS = res.data.filter(
        (doc) =>
          doc.id == 26 ||
          doc.id == 50 ||
          doc.id == 3 ||
          doc.id == 59 ||
          doc.id == 76 ||
          doc.id == 77 ||
          doc.id == 79 ||
          doc.id == 81 ||
          doc.id == 82 ||
          doc.id == 83 ||
          doc.id == 84 ||
          doc.id == 125 ||
          doc.id == 4 ||
          doc.id == 64 ||
          doc.id == 117 ||
          doc.id == 86 ||
          doc.id == 87 ||
          doc.id == 34 ||
          doc.id == 35 ||
          doc.id == 46 ||
          doc.id == 47 ||
          doc.id == 57 ||
          doc.id == 21 ||
          doc.id == 170 ||
          doc.id == 14 ||
          doc.id == 88 ||
          doc.id == 173 ||
          doc.id == 43 ||
          doc.id == 59
      );
      this.documentList = DOCS;
    });
    this.occupancyService
      .fetchUserOldBp(this.data.application.id)
      .subscribe((res) => {
        this.oldBpList = res.data;
      });
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

  onNoClick(): void {
    this.dialogRef.close();
  }
  // onOldBpSelected(item) {
  //   console.log('selected', item);
  // }
  handleUploadOccupancyFile() {
    this.isLoading = true;
    const application = this.data.application;
    const uploadDocumentData = {
      application_id: this.data.application.id,
      user_id: application.user_id,
      evaluator_user_id: this.evaluator.employee_detail.user_id,
      document_id: this.selectedDocument,
      document_path: this.selectedFile,
      document_status: '0',
    };

    this.applicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        this.openSnackBar('Saved!');
        this.isLoading = false;
        window.location.reload();
      });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      // horizontalPosition: 'right',
      // verticalPosition: 'top',
    });
  }
}
