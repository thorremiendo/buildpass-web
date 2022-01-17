import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FeedService } from '../../core';
import { Feed } from '../../core';
import { Subscription } from 'rxjs';
import { Channel } from 'pusher-js';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() type = '';
  public user;
  public channel: Channel;
  public feeds: Feed[] = [];
  public show_notif: boolean = true;
  public config: PerfectScrollbarConfigInterface = {};
  public totalUnReadNotif: string | number;
  public readNotif = [];
  private feedSubscription: Subscription;

  constructor(private feedService: FeedService, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.type == 'super admin') {
      this.show_notif = false;
    } else {
      this.feedService.checkUser();
      console.log("init");

      this.feedSubscription = this.feedService
        .getFeedItems()
        .subscribe((feed: Feed) => {
          this.feeds.push(feed);
        });

        this.updateNotifTable();
     

    }
  }

  updateNotifTable(){
    this.feedService.getUnReadNotifTable().subscribe((data) => {
      console.log("unread",data)
      this.feeds = data.data;
      this.totalUnReadNotif = data.data.length;
    });

    this.feedService.getReadNotifTable().subscribe( data => {
    console.log("read", data)
      this.readNotif = data.data;    
   
    })
 
  }

  openNotif(id, applicationId, is_viewed) {
    console.log(is_viewed);
    if(is_viewed == 0 ){
      this.feedService.isViewed(id).subscribe( res => {
        this.updateNotifTable();
      });
    }
    if (this.user.is_evaluator == 1) {
      this.router.navigate(['evaluator/application', applicationId]).then(() => {});
    } else {
      this.router.navigate(['dashboard/applications/view', applicationId]);
    }
  }

}
