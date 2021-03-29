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
export class ChatService {
  public user: any;
  public channel: Channel;
  public feeds: Feed[] = [];
  private channelName: string;
  private channelType: string;
  private chatChannel;
  private pusherBind: string;

  private subject: Subject<any> = new Subject<any>();

  public pusher: Pusher;

  constructor(private _api: ApiService) {
    const { key, cluster } = environment.pusher;
    this.pusher = new Pusher(key, { cluster });
  }

  generateRandomNumber() {
    let randomNumber = Math.floor(1000 * Math.random());
    return randomNumber;
  }

  applicantChatSubscribe() {
    let channelName = `chat-${this.generateRandomNumber()}`;

    this.channel = this.pusher.subscribe(channelName);
    this.channel.bind(`App\\Events\\${this.pusherBind}`, (data) => {
      this.subject.next(data);
    });
  }

  send(message, channelName) {
    this.channel = this.pusher.subscribe(channelName);
    this.channel.trigger(`App\\Events\\${this.pusherBind}`, (message) => {
        this.subject.next(message);
      });
    
  }

  evaluatorChatSubscribe(channelName) {
    this.channel = this.pusher.subscribe(channelName);

    this.channel.bind(`App\\Events\\${this.pusherBind}`, (data) => {
      this.subject.next(data);
    });
  }

  subscribe(channelName) {
    this.pusher.subscribe(channelName);
  }

  getApplicantChatItems(): Observable<any> {
    return this.subject.asObservable();
  }
}
