import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import {single} from './data'
import { AuthService } from 'src/app/core/services/auth.service';
import { FeedService } from '../../core';
import { Feed } from '../../core';
import { Subscription } from 'rxjs';

const googleLogoURL =
  'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';

@Component({
  selector: 'app-evaluator-home',
  templateUrl: './evaluator-home.component.html',
  styleUrls: ['./evaluator-home.component.scss'],
})
export class EvaluatorHomeComponent implements OnInit {
  public user;
  public evaluatorDetails
  public department = "cbao"
  //piechart data
  single: any[];
  view: any[] = [700, 400];
  public date = new Date();
  //piechart options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  //piechart color
  colorScheme = {
    domain: ['#540b0e', '#9e2a2b', '#335c67', '#F9C232']
  };
  //card navigation
  navLinks: any[];
  activeLinkIndex = -1;

  public feeds: Feed[] = [];

  private feedSubscription: Subscription;

  constructor(
    private _router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private feedService: FeedService,
  ) {
    Object.assign(this, { single });

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
    this._router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this._router.url)
      );
    });
    // this.authService.currentUser.subscribe((currentUser) => {
    //   this.user = currentUser;
    //   this.authService.getFireBaseData(this.user.user.uid).subscribe(result =>{
    //     this.evaluatorDetails = result.data();
    //     console.log(this.evaluatorDetails)
    //   })
    // });
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
  handleView(){
    this._router.navigateByUrl('evaluator/application')
  }
  ngOnDestroy() {
    this.feedSubscription.unsubscribe();
  }
}
