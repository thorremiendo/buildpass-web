import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-privacy',
  templateUrl: './data-privacy.component.html',
  styleUrls: ['./data-privacy.component.scss']
})
export class DataPrivacyComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DataPrivacyComponent>
  ) { }
  
  ngOnInit(): void {
  }

  closeModal(dataPrivacyFlag) {
    this.dialogRef.close(dataPrivacyFlag);
  }
}
