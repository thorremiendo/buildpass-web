import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { single } from './data';
import { AuthService } from 'src/app/core/services/auth.service';
import { FeedService } from '../../core';
import { Feed } from '../../core';
import { Subscription, Subject, Observable } from 'rxjs';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { Channel } from "pusher-js";


const googleLogoURL =
  'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';

@Component({
  selector: 'app-evaluator-home',
  templateUrl: './evaluator-home.component.html',
  styleUrls: ['./evaluator-home.component.scss'],
})
export class EvaluatorHomeComponent implements OnInit {
  public user;
  public applications;
  public evaluatorDetails;
  public channelName;
  public channel: Channel;
  private feedSubscription: Subscription;
  public feeds: Feed[] = [];
  private subject: Subject<Feed> = new Subject<Feed>();


  public chartData: any[] = [
    {
      name: 'Pending',
      value: 0,
    },
    {
      name: 'In Process',
      value: 1,
    },
    {
      name: 'Flagged',
      value: 0,
    },
    {
      name: 'Completed',
      value: 0,
    },
  ];
  view: any[] = [700, 400];
  public date = new Date();
  //piechart options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  //piechart color
  colorScheme = {
    domain: ['#540b0e', '#9e2a2b', '#335c67', '#F9C232'],
  };
  //card navigation
  navLinks: any[];
  activeLinkIndex = -1;

  

  constructor(
    private _router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private feedService: FeedService,
    public applicationInfoService: ApplicationInfoService
  ) {

    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL)
    );

    this.navLinks = [
      {
        label: 'Table View',
        link: './table',
        index: 0,
      },
      {
        label: 'Calendar View',
        link: './calendar',
        index: 1,
      },
    ];

    this.feedSubscription = feedService
      .getFeedItems()
      .subscribe((feed: Feed) => {
        this.feeds.push(feed);
        console.log(feed);
      });
  }

  ngOnInit(): void {
    this.pusherSubscribe();
    this._router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this._router.url)
      );
    });
    this.applicationInfoService.fetchApplications().subscribe(res => {
      this.applications = res.data
      console.log(this.applications)
    })
  }

  pusherSubscribe(){
    this.channel =this.feedService.pusher.subscribe(this.channelName);
    console.log(this.channelName)
    this.channel.bind('App\\Events\\PermitStatusChanged',
    (data: { application_number: string; status: string; message:string, currentTime: string }) => {
      this.subject.next(new Feed(data.application_number, data.status, data.message, new Date(data.currentTime)));
      console.log(data);
      console.log(data.currentTime);
      
    }
  );
  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  handleView() {
    this._router.navigateByUrl('evaluator/application');
  }
  ngOnDestroy() {
    this.feedSubscription.unsubscribe();
  }
}
