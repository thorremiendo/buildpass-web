import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { FeedService } from '../../../core';
import { Feed } from '../../../core';
import { Subscription, Subject, Observable, throwError } from 'rxjs';
import { Channel } from 'pusher-js';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public user;
  public channelName;
  public channel: Channel;
  private feedSubscription: Subscription;
  public feeds: Feed[] = [];
  public notifTable: any[];

  constructor(
    private _feedService: FeedService,
    private _router: Router,
    private _dialogRef: MatDialogRef<NotificationComponent>,
    private _dialog: MatDialog,


  ) {
  
    this.feedSubscription = this._feedService.getFeedItems().subscribe((feed: Feed) => {
      this.feeds.push(feed);
      console.log('feed' + feed);
    
    });
   }

  ngOnInit(): void {
    this._feedService.getNotifTable().subscribe(data =>{
      console.log("fethNotifTable"+data);
      this.feeds = data.data;
    })
   
  }

  openApplication(id){
    
    this._router.navigate(['evaluator/application', id])
      .then(() =>{

      })
    
  }

  ngOnDestroy() {
    this.feedSubscription.unsubscribe();
  }

}
