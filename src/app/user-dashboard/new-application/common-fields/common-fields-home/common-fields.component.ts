import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-common-fields',
  templateUrl: './common-fields.component.html',
  styleUrls: ['./common-fields.component.scss'],
})
export class CommonFieldsComponent implements OnInit {
  public applicationInfo;
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(
    private _router: Router,
    private newApplicationService: NewApplicationFormService
  ) {}

  ngOnInit(): void {
    this._router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this._router.url)
      );
    });
    this.newApplicationService.newApplicationSubject
      .asObservable()
      .subscribe(
        (newApplicationSubject) =>
          (this.applicationInfo = newApplicationSubject)
      );
    if (this.applicationInfo.is_representative == 'No') {
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
}
