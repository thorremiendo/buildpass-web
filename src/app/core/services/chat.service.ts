import { Injectable } from '@angular/core';
import { Subject, Observable, throwError, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SelectedMessageModel } from '../models';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import Pusher from 'pusher-js';
import { Channel } from 'pusher-js';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public user: any;
  public channel: Channel;

  private subject: Subject<any> = new Subject<any>();

  public pusher: Pusher;

  constructor(private api: ApiService) {
    const { key, cluster } = environment.pusher;
    this.pusher = new Pusher(key, { cluster });
  }

  generateRandomNumber() {
    let randomNumber = uuidv4();
    return randomNumber;
  }

  applicantChatSubscribe(channel) {
    let pusherBind = 'RealTimeMessagingEvent';
    this.channel = this.pusher.subscribe(channel);
    this.channel.bind(
      `App\\Events\\${pusherBind}`,
      (data: { type: string; msg: string; currentTime: string }) => {
        this.subject.next(
          new SelectedMessageModel(
            data.type,
            data.msg,
            new Date(data.currentTime)
          )
        );
      }
    );
  }

  fetchConvo(id, user) {
    var url;
    if (user == 'sender') {
      url = `/chat/${id}/sender`;
    } else {
      url = `/chat/${id}/office`;
    }

    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  createConvo(body) {
    const url = `/chat`;
    return this.api.post(url, body);
  }

  sendConvo(chat_id, current_user_id, message) {
    const url = `/chat/message`;

    var body = {
      chat_id: chat_id,
      current_user_id: current_user_id,
      message: message,
    };

    return this.api.post(url, body).subscribe((result) => {});
  }

  evaluatorChatSubscribe(channel) {
    let pusherBind = 'RealTimeMessagingEvent';
    this.channel = this.pusher.subscribe(channel);
    this.channel.bind(
      `App\\Events\\${pusherBind}`,
      (data: { type: string; msg: string; currentTime: string }) => {
        this.subject.next(
          new SelectedMessageModel(
            data.type,
            data.msg,
            new Date(data.currentTime)
          )
        );
      }
    );
  }

  isViewed(chat_id){
    const url = `/chat/${chat_id}/viewed`;
    const body = {
      is_viewed:1
    }
    console.log(chat_id);

    return this.api.post(url, body).subscribe( res =>{
      console.log(res);
    });

  }
  subscribe(channelName) {
    this.pusher.subscribe(channelName);
  }

  unSubscribe(channelName) {
    this.pusher.unsubscribe(channelName);
  }

  getApplicantChatItems(): Observable<any> {
    return this.subject.asObservable();
  }
}
