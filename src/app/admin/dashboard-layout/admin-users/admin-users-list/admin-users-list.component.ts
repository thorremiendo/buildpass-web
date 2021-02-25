import { Component, OnInit } from '@angular/core';
import { AdminUserService } from 'src/app/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminUsersCreateComponent } from '../admin-users-create/admin-users-create.component';
import { AdminUsersViewComponent } from '../admin-users-view/admin-users-view.component';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.scss'],
})
export class AdminUsersListComponent implements OnInit {
  public dataSource: any[] = [];
  public message: String;
  public displayedColumns: string[] = [
    'id',
    'full_name',
    'employee_number',
    'position',
    'office',
    'is_admin',
    'action',
  ];

  constructor(
    private _adminUserservice: AdminUserService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this._adminUserservice.getData().subscribe((data) => {
      this.dataSource = data;
    });
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
