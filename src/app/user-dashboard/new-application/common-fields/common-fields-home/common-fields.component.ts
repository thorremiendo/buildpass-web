import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';

@Component({
  selector: 'app-common-fields',
  templateUrl: './common-fields.component.html',
  styleUrls: ['./common-fields.component.scss'],
})
export class CommonFieldsComponent implements OnInit {
  public applicationInfo;
  navLinks: any[];
  activeLinkIndex = -1;
  public applicationId;
  constructor(
    private _router: Router,
    private newApplicationFormService: NewApplicationFormService,
    private newApplicationService: NewApplicationService
  ) {}

  ngOnInit(): void {
    this.applicationId = localStorage.getItem('app_id');
    if (this.applicationId) {
      this.fetchApplicationInfo();
    } else {
      this.newApplicationFormService.newApplicationSubject
        .asObservable()
        .subscribe(
          (newApplicationSubject) =>
            (this.applicationInfo = newApplicationSubject)
        );
      this.filterTabs();
    }
  }

  filterTabs() {
    this._router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this._router.url)
      );
    });
    if (this.applicationInfo.is_representative == '2') {
      this.navLinks = [
        {
          label: 'Owner/Applicant Information',
          link: './lot-owner',
          index: 0,
        },
        {
          label: 'Project Information',
          link: './project-site',
          index: 1,
        },
      ];
    } else {
      this.navLinks = [
        {
          label: 'Owner/Applicant Information',
          link: './lot-owner',
          index: 0,
        },
        {
          label: 'Project Information',
          link: './project-site',
          index: 1,
        },
        {
          label: 'Representative Information',
          link: './representative',
          index: 2,
        },
      ];
    }
  }

  fetchApplicationInfo() {
    this.newApplicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationInfo = result.data;
        localStorage.setItem(
          'applicationDetails',
          JSON.stringify(this.applicationInfo)
        );
        this.filterTabs();
      });
  }
}
