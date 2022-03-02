import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { AdminService } from 'src/app/core';


@Component({
  selector: 'app-admin-edit-dialog',
  templateUrl: './admin-edit-dialog.component.html',
  styleUrls: ['./admin-edit-dialog.component.scss']
})
export class AdminEditDialogComponent implements OnInit {
  public applicationStatusLists
  public newApplicationStatus = new FormControl('');
  public loading:boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,   
    private dialogRef: MatDialogRef<AdminEditDialogComponent>,
    private adminService: AdminService) {
  }

  ngOnInit(): void {
    console.log(this.data);

    switch (this.data.type) {
      case "Application":
        console.log(this.data.type)
        this.adminService.fetchAllApplicationStatusList().subscribe((data) => {
          this.applicationStatusLists = data.data;
       
          console.log(this.applicationStatusLists);
        });
        break;
      case "Document":
        console.log(this.data.type)
        break;
    }

  }

  saveChange() {
    switch (this.data.type) {
      case "Application":
        this.loading = true;
        this.adminService.changeApplicationStatus(this.data.applicationId, this.newApplicationStatus.value)
          .subscribe((result) => {
            console.log(result);
            window.location.reload();
            this.loading =false;

          },
          (error)=>{
            console.log(error);
          });

        break;
      case "Document":
        console.log(this.data.type)
        break;
    }

  }

  close(){
    this.dialogRef.close();
  

  }

}