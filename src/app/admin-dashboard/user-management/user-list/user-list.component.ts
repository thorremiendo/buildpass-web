import { Component, OnInit } from '@angular/core';
import { AdminUserService } from 'src/app/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminUsersCreateComponent } from '../create-user/create-user.component';
import { AdminUsersViewComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class AdminUsersListComponent implements OnInit {
  public dataSource : any[] = [];
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
    private _adminUserservice : AdminUserService,
    private matDialog: MatDialog
  ) {}
  
  ngOnInit() {
    this._adminUserservice.getData().subscribe(data => {
      this.dataSource = data;
    })
  }

  createUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "create-user";
    dialogConfig.height = "90%";
    dialogConfig.width = "1000px";
    const modalDialog = this.matDialog.open(AdminUsersCreateComponent, dialogConfig);
  }

  editUser(uid) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "create-user";
    dialogConfig.height = "90%";
    dialogConfig.width = "1000px";
    dialogConfig.data = {uid: uid}
    const modalDialog = this.matDialog.open(AdminUsersViewComponent, dialogConfig);
  }
}
