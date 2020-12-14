import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminUserParams, AdminUserService, UserModel, UserCredential } from 'src/app/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.scss']
})
export class AdminUsersListComponent implements OnInit {

  public dataSource : any[] = [];

  constructor(
    private _adminUserservice : AdminUserService,
    private _router: Router
    ){
    this._adminUserservice.getData().subscribe(data => {
      this.dataSource = data;
    
      console.log(data);
    })
  }
  

  ngOnInit(){}

  openUser(uid) {
    console.log("clicked");
    this._router.navigate(["/admin/dashboard/users", uid]);
  }

  

 
  

}
