import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { FeedService } from '../../core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
  providers: [FeedService],
})
export class UserHomeComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  public applicationId = 1;
  public userInfo;



  panelOpenState = false;
  reminders = ['Reminder 1', 'Reminder 2', 'Reminder 3','Reminder 4'];

  constructor(
    private _router: Router,
    ) 
    {

    }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
   
  
    
  }

  openApplication(id){
    this._router.navigate(['dashboard/applications/view', id]);
  }

 

}
