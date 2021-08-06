import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-attach-bp',
  templateUrl: './attach-bp.component.html',
  styleUrls: ['./attach-bp.component.scss'],
})
export class AttachBpComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AttachBpComponent>) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
