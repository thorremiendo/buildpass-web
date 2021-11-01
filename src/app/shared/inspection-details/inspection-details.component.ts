import { SchedulingService } from './../../core/services/scheduling.service';
import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { inspectionStatus } from './../../core/enums/inspection-status.enum';
import { officeTypes } from '../../core/enums/offices.enum';
@Component({
  selector: 'app-inspection-details',
  templateUrl: './inspection-details.component.html',
  styleUrls: ['./inspection-details.component.scss'],
})
export class InspectionDetailsComponent implements OnInit {
  onClose = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<InspectionDetailsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    public dialog: MatDialog,
    private inspectionService: SchedulingService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  getInspectionStatus(id): string {
    return inspectionStatus[id];
  }

  getOffice(id): string {
    return officeTypes[id];
  }
  onDialogClose() {
    this.onClose.emit();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateStatus(status) {
    const body = {
      status_id: status,
    };
    this.inspectionService
      .updateInspection(this.data.inspection.id, body)
      .subscribe((res) => {
        this.onNoClick();
        this.onDialogClose();
      });
  }
}
