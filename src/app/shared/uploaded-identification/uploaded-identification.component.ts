import { Component, OnInit, Inject, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-uploaded-identification',
  templateUrl: './uploaded-identification.component.html',
  styleUrls: ['./uploaded-identification.component.scss'],
})
export class UploadedIdentificationComponent implements OnInit {
  public images = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    this.images.push(this.data.image);
    console.log(this.images);
  }
}
