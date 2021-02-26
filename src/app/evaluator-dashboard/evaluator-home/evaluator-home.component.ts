import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { single } from './data';
import { AuthService } from 'src/app/core/services/auth.service';
import { FeedService } from '../../core';
import { Feed } from '../../core';
import { Subscription, Subject, Observable, throwError } from 'rxjs';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { Channel } from 'pusher-js';
import { map, catchError } from 'rxjs/operators';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, ThemeService, MultiDataSet } from 'ng2-charts';


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
  public notifTable: any[];
  private subject: Subject<Feed> = new Subject<Feed>();
  private channleType: string = 'evaluator';
  public date = new Date();

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
          gridLines: {
              display:false
          }
      }],
      yAxes: [{
          gridLines: {
              display:false
          }   
      }]
  }


  };
  public barChartLabels: Label[] = ['2020', '2021', '2022', '2023', '2024'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56], label: 'Building Permit' },
    { data: [28, 48, 40, 19, 86], label: 'Other Permit' }
  ];

  doughnutChartLabels: Label[] = ['New Task', 'Opened Task', 'Close Task'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';


 
  
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(
    private _router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private feedService: FeedService,
    public applicationInfoService: ApplicationInfoService,
    private _themeService: ThemeService
    
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.channelName = `evaluator-${this.user.employee_detail.user_notif.channel}`;
    console.log(this.channelName);

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

    this.feedSubscription = this.getFeedItems().subscribe((feed: Feed) => {
      this.feeds.push(feed);
      console.log('feed' + feed);
    });
  }

  ngOnInit(): void {
    this.pusherSubscribe();
    this.getNotificationTable();
    this._router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this._router.url)
      );
    });
    this.applicationInfoService.fetchApplications().subscribe((res) => {
      this.applications = res.data;
      console.log(this.applications);
    });
  }

  pusherSubscribe() {
    this.channel = this.feedService.pusher.subscribe(this.channelName);
    console.log(this.channelName);
    this.channel.bind(
      'App\\Events\\EvaluatorStatusChanged',
      (data: {
        application_id: number;
        application_number: string;
        status: string;
        message: string;
        currentTime: string;
      }) => {
        this.subject.next(
          new Feed(
            data.application_id,
            data.application_number,
            data.status,
            data.message,
            new Date(data.currentTime)
          )
        );
        console.log(data);
        console.log(data.currentTime);
      }
    );
  }

  pusherUnsubscribe() {
    this.channel.unbind();
    this.feedService.pusher.unsubscribe(this.channelName);
    this.feedSubscription.unsubscribe();
  }

  getNotificationTable() {
    this.feedService 
      .getNotifTable(
        this.user.employee_detail.user_notif.channel,
        this.channleType
      )
      .subscribe(
        (data) => {
          this.feeds = data.data;
          console.log(JSON.stringify(data))
        },
        catchError((error) => {
          return throwError('Something went wrong.');
        })
      );
  }

  getFeedItems(): Observable<Feed> {
    return this.subject.asObservable();
  }

  openApplication(id){
    this._router.navigate(['evaluator/application', id]);
  }

//   public chartColors() {
//     return [{
//       //backgroundColor: this.alert.severityColor,
//       borderColor: 'rgba(225,10,24,0.2)',
//       pointBackgroundColor: 'rgba(225,10,24,0.2)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(225,10,24,0.2)'
//   }]
// }

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
    this.pusherUnsubscribe();
  }
}
