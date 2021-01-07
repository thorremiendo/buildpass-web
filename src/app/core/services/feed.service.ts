import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Feed } from '../models';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private subject: Subject<Feed> = new Subject<Feed>();

  private pusherClient: Pusher;

  constructor() {
    this.pusherClient = new Pusher("a6ade48d9acbba1dd2e7", { cluster: 'ap1' });

    const channel = this.pusherClient.subscribe('realtime-feeds');

    channel.bind(
      'App\\Events\\PermitStatusChanged',
      (data: { title: string; body: string; time: string }) => {
        this.subject.next(new Feed(data.title, data.body, new Date(data.time)));
      }
    );

  //   channel.bind('App\\Events\\PermitStatusChanged', function(data) {
  //     // this is called when the event notification is received...
  //     console.log("Success")
  //     console.log(data);
  // });
  }

  getFeedItems(): Observable<Feed> {
    return this.subject.asObservable();
  }
}
