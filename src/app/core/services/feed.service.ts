import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Feed } from '../models';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private subject: Subject<Feed> = new Subject<Feed>();

  public pusher: Pusher;

  constructor() {
    this.pusher = new Pusher("a6ade48d9acbba1dd2e7", { cluster: 'ap1' });

  }

  subscribe(channelName){ // Naka Abang na 
    this.pusher.subscribe(channelName);
   
  }

  getFeedItems(): Observable<Feed> {
    return this.subject.asObservable();
  }
}
