import { Injectable } from '@angular/core';
import { Subject, Observable, throwError, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/Rx';
import { SelectedMessageModel } from '../models';
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
  private channelName: string;
  private channelType: string;
  private chatChannel;
  private pusherBind: string;

  private subject: Subject<any> = new Subject<any>();

  public pusher: Pusher;

  messagesStream = new ReplaySubject<any>(1);

  constructor(private api: ApiService) {

    Pusher.logToConsole = true;
    const { key, cluster } = environment.pusher;
    this.pusher = new Pusher(key, { cluster });
  }

  generateRandomNumber() {
    let randomNumber = Math.floor(1000 * Math.random());
    return randomNumber;
  }

  applicantChatSubscribe() {
    //let channelName = `chat-${this.generateRandomNumber()}`;
    let channelName = "chat-1"
    let pusherBind = "RealTimeMessagingEvent"
    console.log(channelName);
    this.channel = this.pusher.subscribe(channelName);
    this.channel.bind(`App\\Events\\${pusherBind}`, (data:{
        type: string,
        msg:string,
        currentTime:string,
    }) => {
        this.subject.next(
          new SelectedMessageModel (
            data.type,
            data.msg,
            new Date(data.currentTime),
          )
        );
      }

    )
  }

  fetchConvo(current_user_id){
      const url = `/chat/${current_user_id}/sender`;

      return this.api.get(url);
  }

  createConvo(body){
    const url = `/chat`;

    return this.api.post(url,body).subscribe(result =>{
        console.log(result);
    });

  }

  sendConvo(chat_id, current_user_id, message,  ) {
      const url = `/chat/message`;
     

      var body = {
          chat_id: chat_id,
          current_user_id: current_user_id,
          message: message
      }
      console.log(body);

      return this.api.post(url,body).subscribe(result =>{
        console.log(result);
    });

}



  evaluatorChatSubscribe(channelName) {
    let pusherBind = "RealTimeMessagingEvent"
    console.log(channelName);
    this.channel = this.pusher.subscribe(channelName);
    this.channel.bind(`App\\Events\\${pusherBind}`, (data:{
        type: string,
        msg:string,
        currentTime:string,
    }) => {
        this.subject.next(
          new SelectedMessageModel (
            data.type,
            data.msg,
            new Date(data.currentTime),
          )
        );
      }

    )
  }

  subscribe(channelName) {
    this.pusher.subscribe(channelName);
  }

  getApplicantChatItems(): Observable<any> {
    return this.subject.asObservable();
  }
}
