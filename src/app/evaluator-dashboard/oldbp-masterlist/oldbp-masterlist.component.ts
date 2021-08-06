import { AttachBpComponent } from './../attach-bp/attach-bp.component';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OccupancyService } from './../../core/services/occupancy.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-oldbp-masterlist',
  templateUrl: './oldbp-masterlist.component.html',
  styleUrls: ['./oldbp-masterlist.component.scss'],
})
export class OldbpMasterlistComponent implements OnInit {
  columnsToDisplay: string[] = ['application_no', 'name', 'location', 'action'];
  dataSource;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator = Object.create(null);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);

  constructor(
    private occupancyService: OccupancyService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.occupancyService.fetchOldBps().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openFormDialog(): void {
    const dialogRef = this.dialog.open(AttachBpComponent, {
      width: '1500px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
