import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminUserService } from '../../../core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AdminEmployeeViewComponent } from '../admin-employee-view/admin-employee-view.component'

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
    'action'

    
  ];
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator = Object.create(null);
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(
    null
  );

  constructor(
    private adminUserservice: AdminUserService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.adminUserservice.fetchApplicant().subscribe((data) => {      
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.isFetching = false;
    });
  }

  deleteUser(id){
    const dialogRef = this.matDialog.open(
      ApplicantDeleteDialog,{
        width: '300px',
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.adminUserservice.deleteUser(id).subscribe( result =>{
        const index = this.dataSource.data.indexOf(id);
        this.snackBar.open('User Deleted', 'close');
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription(); 
        this.dataSource.paginator = this.paginator; 
       })
      }
    });
  }

  viewUserInfo(data){
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

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}

@Component({
  selector: 'dialog-applicant-delete',
  templateUrl: './admin-applicant-delete.component.html',
  styleUrls: ['./admin-applicant-list.component.scss'],
})
export class ApplicantDeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<ApplicantDeleteDialog>
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
 
}
