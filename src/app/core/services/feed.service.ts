import { Injectable } from '@angular/core';
import { Subject, Observable, throwError, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Feed } from '../models';
import { environment } from '../../../environments/environment'
import { ApiService} from './api.service';
import Pusher  from 'pusher-js';
import { Channel } from 'pusher-js';


@Injectable({
  providedIn: 'root',
})
export class FeedService {
  public user:any;
  public channel: Channel;
  public feeds: Feed[] = [];
  private channelName:string;
  private channelType: string;
  private notifChannel;
  private pusherBind:string;

 
  private subject: Subject<Feed> = new Subject<Feed>();

  public pusher: Pusher;

  constructor(
    private _api: ApiService,
  )
  {
    const {key, cluster} = environment.pusher;
    this.pusher = new Pusher(key, { cluster });
      
  }

  checkUser(){
    var evaluator = JSON.parse(localStorage.getItem('currentUser'));
    var applicant = JSON.parse(localStorage.getItem('user'));

    if(evaluator != null){
      this.user = evaluator;
      this.channelType = 'evaluator'; 
      this.notifChannel = this.user.employee_detail.user_notif.channel;
      this.channelName = `evaluator-${this.user.employee_detail.user_notif.channel}`;
      this.pusherBind= 'EvaluatorStatusChanged';
      
    }
    else{
      this.user = applicant
      this.channelType = 'applicant'; 
      this.notifChannel = this.user.uid;
      this.channelName = `applicant-${this.user.uid}`;
      this.pusherBind= 'ApplicantStatusChanged';
   
    }

    this.pusherSubscribe();
    this.getNotifTable();

  }

  pusherSubscribe() {
    this.channel = this.pusher.subscribe(this.channelName);
    this.channel.bind(
      `App\\Events\\${this.pusherBind}`,
      (data: {
        application_id: number;
        application_number: string;
        status: string;
        message: string;
        currentTime: string;
      }) => {
        this.subject.next(
          new Feed(
            data.application_id,
            data.application_number,
            data.status,
            data.message,
            new Date(data.currentTime)
          )
        );
      }
    );
  }

  subscribe(channelName){ 
    this.pusher.subscribe(channelName);

  }

  getFeedItems(): Observable<Feed> {
    return this.subject.asObservable();
  }

  getNotifTable(){
    const url =`/notification/${this.notifChannel}/${this.channelType}`;
    return this._api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
}
