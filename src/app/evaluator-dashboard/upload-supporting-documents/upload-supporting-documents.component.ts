import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-upload-supporting-documents',
  templateUrl: './upload-supporting-documents.component.html',
  styleUrls: ['./upload-supporting-documents.component.scss'],
})
export class UploadSupportingDocumentsComponent implements OnInit {
  public files: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<UploadSupportingDocumentsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {}
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
}
