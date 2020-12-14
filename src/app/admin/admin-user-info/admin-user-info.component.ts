import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService, AdminUserService } from '../../core'



@Component({
  selector: 'app-admin-user-info',
  templateUrl: './admin-user-info.component.html',
  styleUrls: ['./admin-user-info.component.scss']
})
export class AdminUserInfoComponent implements OnInit {
  public userInfo;
  public isLoading: Boolean = true;
  public isUpdating: Boolean = false;
  private _uid;


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _adminUserService: AdminUserService,
  )
   {
    this._uid = this._activatedRoute.snapshot.params.uid;
   
    
    
   }

   

  ngOnInit(): void {
    
    console.log("uid"+this._uid);
    this.fetchUserInfo()
    

  }

  

  fetchUserInfo(){

    this._userService
      .getUserInfo(this._uid)
      .subscribe(data =>{
        this.userInfo = data;
        console.log("Selected Employee" + data);
        this.isLoading = false;
      })
  }

  approve(uid){
    this.isUpdating = true
    this._adminUserService.approveEmployee(uid).subscribe(result =>
      {
        this.isUpdating = false;
      })


  }

}
