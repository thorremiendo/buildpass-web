import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { officeTypes } from 'src/app/core/enums/offices.enum';
@Component({
  selector: 'app-view-fees',
  templateUrl: './view-fees.component.html',
  styleUrls: ['./view-fees.component.scss'],
})
export class ViewFeesComponent implements OnInit {
  columnsToDisplay: string[] = ['number', 'description', 'amount', 'office'];
  public dataSource;
  constructor(
    public dialogRef: MatDialogRef<ViewFeesComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    this.dataSource = this.data.fees;
    console.log(this.dataSource);
  }
  getOfficeType(id): string {
    return officeTypes[id];
  }
}
