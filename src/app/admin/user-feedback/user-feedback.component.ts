import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AdminFeedBackService } from '../../core';
import { FeedbackModel } from './feedback.model';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.scss'],
})
export class UserFeedbackComponent implements OnInit {
  public suggestion: number;
  public problem: number;
  public question: number;
  public compliment: number;

  public isFetching: boolean = true;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator = Object.create(null);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);

  displayedColumns: string[] = [
    'id',
    'full_name',
    'role',
    'page',
    'feedback',
    'date',
    'action',
  ];
  public dataSource: any;

  constructor(
    public dialog: MatDialog,
    private adminFeedbackService: AdminFeedBackService
  ) {}

  ngOnInit(): void {
    this.adminFeedbackService.fetchAllFeedBack().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.isFetching = false;

      this.suggestion = this.fetchFeedbackCount('suggestion');
      this.problem = this.fetchFeedbackCount('problem');
      this.question = this.fetchFeedbackCount('question');
      this.compliment = this.fetchFeedbackCount('compliment');

      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  fetchFeedbackCount(val: string): number {
    this.dataSource.filter = val.trim().toLowerCase();
    return this.dataSource.filteredData.length;
  }

  btnCategoryClick(val: string) {
    this.isFetching = true;
    this.adminFeedbackService.fetchFeedBackFilter(val).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.isFetching = false;
    });
  }

  openDialog(data) {
    this.dialog.open(FeedbackDialogComponent, {
      data: data,
      height: '400px',
      width: '600px',
    });
  }
}

@Component({
  selector: 'feedback-dialog',
  templateUrl: 'feedback-dialog.component.html',
})
export class FeedbackDialogComponent {
  public fullName: string;
  public contact: string;
  public email: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.fullName =
      `${data.user_detail.first_name}` + ' ' + `${data.user_detail.last_name}`;
    this.contact = data.contact_number;
    this.email = data.email_address;
  }
}
