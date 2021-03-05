import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { FeedService } from '../../core';
import { Feed, UserService } from '../../core';
import { Subscription, Subject, Observable } from 'rxjs';
import { Channel } from "pusher-js";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
  providers: [FeedService],
})
export class UserHomeComponent implements OnInit {
  public user;
  private channelName:string;
  private channelType:string="applicant"
  public channel: Channel;

  public feeds: Feed[] = [];


  private feedSubscription: Subscription;
  private subject: Subject<Feed> = new Subject<Feed>();

  panelOpenState = false;
  reminders = ['Reminder 1', 'Reminder 2', 'Reminder 3','Reminder 4'];

  constructor(
    private feedService: FeedService,
    private userService: UserService,
    private _router: Router,
    ) 
    {

    }

  ngOnInit(): void {
   
  
    
  }

  openApplication(id){
    this._router.navigate(['dashboard/applications/view', id]);
  }

 

}
