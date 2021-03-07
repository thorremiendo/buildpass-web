import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';





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
  public date = new Date();

  navLinks: any[];
  activeLinkIndex = -1;

  constructor(
    private _router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    public applicationInfoService: ApplicationInfoService,
  
  ) {
   

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

  }

  ngOnInit(): void {
    this._router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this._router.url)
      );
    });
    this.applicationInfoService.fetchApplications().subscribe((res) => {
      this.applications = res.data;
     
    });
  }

  
 


  openApplication(id){
    this._router.navigate(['evaluator/application', id]);
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
 
}
