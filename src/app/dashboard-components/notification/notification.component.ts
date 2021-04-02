import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FeedService } from '../../core';
import { Feed } from '../../core';
import { Subscription } from 'rxjs';
import { Channel } from 'pusher-js';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

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
  private feedSubscription: Subscription;

  constructor(private feedService: FeedService, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.type == 'super admin') {
      this.show_notif = false;
    } else {
      this.feedService.checkUser();
      this.feedSubscription = this.feedService
        .getFeedItems()
        .subscribe((feed: Feed) => {
          this.feeds.push(feed);
        });

      this.feedService.getNotifTable().subscribe((data) => {
        this.feeds = data.data;
      });
    }
  }

  openNotif(index, id) {
    this.feeds.splice(index, 1);
    if (this.user.is_evaluator == 1) {
      this.router.navigate(['evaluator/application', id]).then(() => {});
    } else {
      this.router.navigate(['dashboard/applications/view', id]);
    }
  }
}
