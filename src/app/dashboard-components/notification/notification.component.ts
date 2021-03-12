import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router'
import { FeedService } from '../../core';
import { Feed } from '../../core';
import { Subscription, } from 'rxjs';
import { Channel } from 'pusher-js';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() type = ''

  public channel: Channel;
  public feeds: Feed[] = [];
  public notifTable: any[];
  public show_notif: boolean = true;
  public config: PerfectScrollbarConfigInterface = {};
  private feedSubscription: Subscription;


  constructor(
    private feedService: FeedService,
    private router: Router,

  ) {

   

  
  
  }

  ngOnInit():void{

    if(this.type == "super admin"){
      this.show_notif = false

      if(this.show_notif){  
        this.feedService.checkUser();
        this.feedSubscription = this.feedService.getFeedItems().subscribe((feed: Feed) => {
          this.feeds.push(feed);

          this.feedService.getNotifTable().subscribe(data =>{
            this.feeds = data.data;
            console.log(this.feeds)
          })
        });
      }
    } 
  }

  openNotif(index, id){
    this.feeds.splice(index, 1)
    console.log(this.feeds)

    this.router.navigate(['evaluator/application', id])
    .then(() =>{
    }) 

  }


}


