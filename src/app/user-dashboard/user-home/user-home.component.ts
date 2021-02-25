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
    this.user = JSON.parse(localStorage.getItem('user'));
    this.channelName = `applicant-${this.user.uid}`;
   
    this.feedSubscription = this.getFeedItems()
      .subscribe((feed: Feed) => {
        this.feeds.push(feed);
        console.log(feed);
      });
  }

  ngOnInit(): void {
    this.getNotificationTable();
    this.pusherSubscribe();
    
  }

  pusherSubscribe(){
    this.channel =this.feedService.pusher.subscribe(this.channelName);
    console.log(this.channelName)
    this.channel.bind('App\\Events\\ApplicantStatusChanged',
    (data: { application_id: number; application_number: string; status: string; message:string, currentTime: string }) => {
      this.subject.next(new Feed(data.application_id,data.application_number, data.status, data.message, new Date(data.currentTime)));
      console.log(data);
      console.log(data.currentTime);
      
    }
  );
  }

  getNotificationTable(){
    this.feedService.getNotifTable(this.user?.uid,this.channelType).subscribe( data =>{
      this.feeds = data.data;

    })
    
  } 

  openApplication(id){
    this._router.navigate(['dashboard/applications/view', id]);
  }

  getFeedItems(): Observable<Feed> {
    return this.subject.asObservable();
  }

  removeItem(i: number): void {
    this.feeds.splice(i, 1);
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
