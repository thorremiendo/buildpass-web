import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-esig-pdf-preview',
  templateUrl: './esig-pdf-preview.component.html',
  styleUrls: ['./esig-pdf-preview.component.scss'],
})
export class EsigPdfPreviewComponent implements OnInit {
  public src;
  constructor(
    public dialogRef: MatDialogRef<EsigPdfPreviewComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.src = this.data.pdf;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
