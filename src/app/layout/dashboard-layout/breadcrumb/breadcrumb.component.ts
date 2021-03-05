import { Component, OnInit, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, Data } from '@angular/router';
import { filter, map, mergeMap, catchError } from 'rxjs/operators';
import { NotificationComponent } from '../notification/notification.component';
import { MatDialog } from '@angular/material/dialog';


import { FeedService } from '../../../core';
import { Feed } from '../../../core';
import { Subscription, Subject, Observable, throwError } from 'rxjs';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { Channel } from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: [],
})
export class BreadcrumbComponent implements OnInit {

  private feedSubscription: Subscription;
  public feeds: Feed[] = [];
  pageInfo: Data = Object.create(null);
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private dialog: MatDialog,
    private _feedService: FeedService,
    private _router: Router,
    public _applicationInfoService: ApplicationInfoService,

    
  ) {
    this._feedService.checkUser();
    this.feedSubscription = this._feedService.getFeedItems().subscribe((feed: Feed) => {
      this.feeds.push(feed);
    
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((event) => {
        this.titleService.setTitle(event['title']);
        this.pageInfo = event;
      });
  }

  ngOnInit(): void{
    this._feedService.getNotifTable().subscribe(data =>{
      this.feeds = data.data;
    })
   
  }
  
  openApplication(id){
    this._router.navigate(['evaluator/application', id]);
  }

  ngOnDestroy() {
    this.feedSubscription.unsubscribe();
  }

  openNotif(){

    this.dialog.open(NotificationComponent);
  }

}

 


