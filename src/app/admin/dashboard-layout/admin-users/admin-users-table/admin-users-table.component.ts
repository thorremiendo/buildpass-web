import { Component, OnInit, Input, Output, EventEmitter,  } from '@angular/core';
import { AdminUserService} from '../../../../core';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-admin-users-table',
  templateUrl: './admin-users-table.component.html',
  styleUrls: ['./admin-users-table.component.scss']
})
export class AdminUsersTableComponent{
  @Input() public dataSource : any[] = [];

  @Output() verifyEmailClicked: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = [

    'id',
    'full_name',  
    'employee_number',
    'position',
    'office',
    'is_admin',
    'action',
  
  ];
  
  
  
  constructor(
    private _router: Router,
  ) {}

  ngOnInit(): void {}

  openUserClick(uid) {
    console.log("clicked" + JSON.stringify(uid));

    this._router.navigate(["/admin/dashboard/users", uid]);
  }
  
}
