import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminUserService } from '../../../core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-applicant-list',
  templateUrl: './admin-applicant-list.component.html',
  styleUrls: ['./admin-applicant-list.component.scss']
})
export class AdminApplicantListComponent implements OnInit {
  public dataSource;
  public message: String;
  public isFetching = true;
  public displayedColumns: string[] = [
    'id',
    'full_name',
    'address',
    'created_at',

    
  ];
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator = Object.create(null);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(
    null
  );

  constructor(
    private adminUserservice: AdminUserService,
  ) {}

  ngOnInit(): void {
    this.adminUserservice.fetchApplicant().subscribe((data) => {      
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.isFetching = false;
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
