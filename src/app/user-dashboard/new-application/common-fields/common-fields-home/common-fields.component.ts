import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcavationPermitService } from 'src/app/core/services/excavation-permit.service';
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

  public useExistingInfo;
  constructor(
    private _router: Router,
    private newApplicationFormService: NewApplicationFormService,
    private newApplicationService: NewApplicationService,
    private excavationService: ExcavationPermitService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('newApplicationInfo')) {
      this.applicationInfo = JSON.parse(
        localStorage.getItem('newApplicationInfo')
      );
    } else {
      this.newApplicationFormService.newApplicationSubject
        .asObservable()
        .subscribe(
          (newApplicationSubject) =>
            (this.applicationInfo = newApplicationSubject)
        );
    }
    this.filterTabs();
  }

  filterTabs() {
    this._router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this._router.url)
      );
    });
    this.navLinks = [
      {
        label: 'Owner Information',
        link: './lot-owner',
        index: 0,
      },
      {
        label: 'Engineer/Architect Information',
        link: './in-charge',
        index: 1,
      },
      {
        label: 'Project Information',
        link: './project-site',
        index: 2,
      },
    ];
  }
}
