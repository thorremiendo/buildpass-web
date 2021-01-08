import { Component, OnInit, OnDestroy } from '@angular/core';
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
  public channelName;
  public channel: Channel;
  public feeds: Feed[] = [];

  private feedSubscription: Subscription;
  private subject: Subject<Feed> = new Subject<Feed>();

  panelOpenState = false;
  reminders = ['Reminder 1', 'Reminder 2', 'Reminder 3','Reminder 4'];

  constructor(
    private feedService: FeedService,
    private userService: UserService,
    ) 
    {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.channelName = `applicant-${this.user.uid}`;
    //this.channelName = "realtime-feeds" 
   
    this.feedSubscription = this.getFeedItems()
      .subscribe((feed: Feed) => {
        this.feeds.push(feed);
        console.log(feed);
      });
  }

  ngOnInit(): void {
     this.pusherSubscribe()
    
  }

  pusherSubscribe(){
    this.channel =this.feedService.pusher.subscribe(this.channelName);
    console.log(this.channelName)
    this.channel.bind('App\\Events\\PermitStatusChanged',
    (data: { application_number: string; status: string; message:string }) => {
      this.subject.next(new Feed(data.application_number, data.status, data.message));
      console.log(data);
      
    }
  );
  }

  getFeedItems(): Observable<Feed> {
    return this.subject.asObservable();
  }

 

  pusherUnsubscribe() {
    this.channel.unbind();
    this.feedService.pusher.unsubscribe(this.channelName);
    this.feedSubscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.pusherUnsubscribe();
  }

}
