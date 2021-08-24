import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminUserService } from '../../../core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminEmployeeCreateComponent } from '../admin-employee-create/admin-employee-create.component';
import { AdminEmployeeViewComponent } from '../admin-employee-view/admin-employee-view.component';
import { EmployeeResetPasswordComponent } from '../../employee-reset-password/employee-reset-password.component'

@Component({
  selector: 'app-admin-employee-list',
  templateUrl: './admin-employee-list.component.html',
  styleUrls: ['./admin-employee-list.component.scss'],
})
export class AdminEmployeeListComponent implements OnInit {
  public dataSource;
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
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator = Object.create(null);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(
    null
  );

  constructor(
    private _adminUserservice: AdminUserService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._adminUserservice.fetchEmployees().subscribe((data) => {      
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
      AdminEmployeeCreateComponent,
      dialogConfig
    );
  }

  editUser(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'create-user';
    dialogConfig.height = '90%';
    dialogConfig.width = '1000px';
    dialogConfig.data = { data:data };
    const modalDialog = this.matDialog.open(
      AdminEmployeeViewComponent,
      dialogConfig
    );
  }

  sendEmailResetPassword(employee) {
    this.matDialog.open(EmployeeResetPasswordComponent, {
      data: {
        first_name: employee.first_name,
        last_name: employee.last_name,
        middle_name: employee.middle_name,
        employeeId: employee.id,
      },
      height: '220px',
      width: '600px',
    });
  }

  evaluatorChangeStatus(id, status){
    this._adminUserservice.evaluatorStatus(id, status).subscribe( res =>{
      console.log(res);
    })
    
  }

  approveFillingFee(value) {
    this._adminUserservice.approveFillingFee(value).subscribe((res) => {
      this.message = res;
    });
  }

  approvePermitFee(value) {
    this._adminUserservice.approvePermitFee(value).subscribe((res) => {
      this.message = res.message;
    });
  }

  
}
