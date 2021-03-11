import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminUserService } from 'src/app/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminUsersCreateComponent } from '../admin-users-create/admin-users-create.component';
import { AdminUsersViewComponent } from '../admin-users-view/admin-users-view.component';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.scss'],
})
export class AdminUsersListComponent implements OnInit {
 
  public dataSource;;
  public message: String;
  public isFetching = true;
  public displayedColumns: string[] = [
    'id',
    'full_name',
    'employee_number',
    'office',
    'is_admin',
    'action',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);

  constructor(
    private _adminUserservice: AdminUserService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._adminUserservice.getData().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.isFetching = false;
    });
  }

applyFilter(filterValue: string): void {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

  createUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'create-user';
    dialogConfig.height = '90%';
    dialogConfig.width = '1000px';
    const modalDialog = this.matDialog.open(
      AdminUsersCreateComponent,
      dialogConfig
    );
  }

  editUser(uid) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'create-user';
    dialogConfig.height = '90%';
    dialogConfig.width = '1000px';
    dialogConfig.data = { uid: uid };
    const modalDialog = this.matDialog.open(
      AdminUsersViewComponent,
      dialogConfig
    );
  }

  
 


  approveFillingFee(value) {
    this._adminUserservice.approveFillingFee(value).subscribe((res) => {
      console.log(res);
      this.message = res;
    });
  }

  approvePermitFee(value) {
    this._adminUserservice.approvePermitFee(value).subscribe((res) => {
      this.message = res.message;
    });
  }
}
