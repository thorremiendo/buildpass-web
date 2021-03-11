import { Component, OnInit, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, Data } from '@angular/router';
import { filter, map, mergeMap, catchError } from 'rxjs/operators';
import { NotificationComponent } from '../notification/notification.component';
import { MatDialog } from '@angular/material/dialog';


import { FeedService } from '../../../core';
import { Feed } from '../../../core';
import { Subscription } from 'rxjs';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: [],
})
export class BreadcrumbComponent implements OnInit {
  public userInfo;
  public is_admin:boolean = true;
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
    this.userInfo = JSON.parse(localStorage.getItem('user'));

    if(this.userInfo?.is_admin == 0){
      this.is_admin = false;
      console.log(this.is_admin);
      this._feedService.checkUser();
      this.feedSubscription = this._feedService.getFeedItems().subscribe((feed: Feed) => {
      this.feeds.push(feed);

    
      });

      this._feedService.getNotifTable().subscribe(data =>{
        this.feeds = data.data;
        })
    }
   

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
   
   
   
  }
  
  openApplication(id){
    this._router.navigate(['evaluator/application', id]);
  }

  ngOnDestroy() {
    if(!this.is_admin){
      this.feedSubscription.unsubscribe();
    }
   
  }

  openNotif(){

    this.dialog.open(NotificationComponent);
  }

}

 


