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
  public statusLists
  public newStatus = new FormControl('');
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
          this.statusLists = data.data;
       
          console.log(this.statusLists);
        });
        break;
      case "Document":
        this.adminService.fetchAllDocumentStatusList().subscribe((data) => {
          this.statusLists = data.data;
       
          console.log(this.statusLists);
        });
        break;
    }

  }

  saveChange() {
    switch (this.data.type) {
      case "Application":
        this.loading = true;
        this.adminService.changeApplicationStatus(this.data.id, this.newStatus.value)
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
        this.adminService.changeDocumentStatus(this.data.id, this.newStatus.value)
        .subscribe((result) => {
          console.log(result);
          window.location.reload();
          this.loading =false;

        },
        (error)=>{
          console.log(error);
        });
        break;
    }

  }

  close(){
    this.dialogRef.close();
  

  }

}