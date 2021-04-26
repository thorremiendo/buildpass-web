import { Component, OnInit, Inject, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-representative-details',
  templateUrl: './representative-details.component.html',
  styleUrls: ['./representative-details.component.scss'],
})
export class RepresentativeDetailsComponent implements OnInit {
  public representativeDetails;
  @Input()
  dataFromParent;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}
  public images = [];
  ngOnInit(): void {
    const info = this.dataFromParent
      ? this.dataFromParent
      : this.data.representativeDetails;
    this.representativeDetails = info;
    console.log(this.representativeDetails);
    this.images.push(
      this.representativeDetails.prc_id_back_photo_path,
      this.representativeDetails.prc_id_front_photo_path,
      this.representativeDetails.id_front_photo_path,
      this.representativeDetails.id_back_photo_path
    );
  }
}
