import { Injectable } from '@angular/core';
import { Subject, Observable, throwError, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Feed } from '../models';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import Pusher from 'pusher-js';
import { Channel } from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  public user: any;
  public firebase_uid: string;
  public channel: Channel;
  private channelName: string;
  private channelType: string;
  private user_sender_id: string | number;
  private notifChannel;
  private pusherBind: string;

  private subject: Subject<Feed> = new Subject<Feed>();

  public pusher: Pusher;

  constructor(private _api: ApiService) {
    const { key, cluster } = environment.pusher;
    this.pusher = new Pusher(key, { cluster });
  }

  checkUser() {
    var user = JSON.parse(localStorage.getItem('user'));

    if (user.employee_detail != null) {
      this.user = user;
      this.channelType = 'evaluator';
      this.notifChannel = this.user.employee_detail.user_notif.channel;
      this.channelName = `evaluator-${this.user.employee_detail.user_notif.channel}`;
      this.pusherBind = 'EvaluatorStatusChanged';
    } else {
      this.user = user;
      this.firebase_uid = this.user.user_credentials[0].firebase_uid;
      this.channelType = 'applicant';
      this.notifChannel = this.user.user_credentials[0]?.firebase_uid;
      this.channelName = `applicant-${this.user.user_credentials[0]?.firebase_uid}`;
      this.pusherBind = 'ApplicantStatusChanged';
    }
    // this.pusherSubscribe();
    // this.getUnreadTable();
  }

  pusherSubscribe() {
    this.channel = this.pusher.subscribe(this.channelName);

    this.channel.bind(
      `App\\Events\\${this.pusherBind}`,
      (data: {
        id:number,
        is_viewed:number,
        application_id: number;
        application_number: string;
        status: string;
        message: string;
        currentTime: string;
      }) => {
        this.subject.next(
          new Feed(
            data.id,
            data.is_viewed,
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

  subscribe(channelName) {
    this.pusher.subscribe(channelName);
  }

  unSubscribe(channelName) {
    this.pusher.unsubscribe(channelName);
  }

  getFeedItems(): Observable<Feed> {
    return this.subject.asObservable();
  }

  isViewed(id) {
    const url = `/notification/${id}/viewed`;
    const body = {
      is_viewed: 1,
    };

    return this._api.post(url, body);
  }

  getUnreadTable() {
    const url = `/notification/${this.notifChannel}/${this.channelType}`;
    return this._api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  getReadNotifTable(){
    const url = `/notification/${this.user.id}/user-notif/viewed`;

    return this._api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  getUnReadNotifTable(){
    const url = `/notification/${this.user.id}/user-notif/unseen`;

    return this._api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }


  getNotifMessageTable() {
    const url = `/chat/${this.user.id}/user-notif`;
    return this._api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  
  

  getTotalUnseenChat() {
    const url = `/chat/${this.user.id}/unseen`;
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
