import { Component, OnInit, Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, AdminUserService } from '../../core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-user-info',
  templateUrl: './admin-user-info.component.html',
  styleUrls: ['./admin-user-info.component.scss'],
})
export class AdminUserInfoComponent implements OnInit {
  public userInfo;
  //public isLoading: Boolean = true;
  public isUpdating: Boolean = false;
  private _id;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _adminUserService: AdminUserService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.userInfo = data;
    //this._id = this._activatedRoute.snapshot.params.uid;
  }

  ngOnInit(): void {
    //this.fetchUserInfo();
  }

  fetchUserInfo() {
    this._userService.getUserInfo(this._id).subscribe((data) => {
      console.log(data)
      this.userInfo = data;
      //this.isLoading = false;
    });
  }

  approve(id) {
    this.isUpdating = true;
    this._adminUserService.approveEmployee(id).subscribe((result) => {
      this.isUpdating = false;
    });
  }
}
