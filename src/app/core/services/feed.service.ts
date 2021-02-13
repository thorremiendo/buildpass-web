import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Feed } from '../models';
import { environment } from '../../../environments/environment'
import { ApiService} from './api.service';
import Pusher  from 'pusher-js';


@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private subject: Subject<Feed> = new Subject<Feed>();
  public pusher: Pusher;

  constructor(
    private _api: ApiService,
  ){
    const {
      key,
      cluster
    } = environment.pusher;
    this.pusher = new Pusher(key, { cluster });

  }

  subscribe(channelName){ 
    this.pusher.subscribe(channelName);
   
  }

  getFeedItems(): Observable<Feed> {
    return this.subject.asObservable();
  }

  getNotifTable(channel){
    const url =`/${channel}/channel`;

    return this._api.get(url).pipe(
      map((data: any) => {
        console.log('Notification Data', data);
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );


  }

  
}
