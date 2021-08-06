import { OccupancyService } from './../../core/services/occupancy.service';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-old-bp-details',
  templateUrl: './old-bp-details.component.html',
  styleUrls: ['./old-bp-details.component.scss'],
})
export class OldBpDetailsComponent implements OnInit {
  public oldBpDetails;
  constructor(
    public dialogRef: MatDialogRef<OldBpDetailsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private occupancyService: OccupancyService
  ) {}

  ngOnInit(): void {
    this.occupancyService
      .fetchSpecificOldBp(this.data.application.old_permit_number)
      .subscribe((res) => {
        this.oldBpDetails = res.data[0];
      });
  }
}
