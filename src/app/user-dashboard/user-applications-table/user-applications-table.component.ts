import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { applicationStatus } from '../../core/enums/application-status.enum';
import { applicationTypes } from '../../core/enums/application-type.enum';

@Component({
  selector: 'app-user-applications-table',
  templateUrl: './user-applications-table.component.html',
  styleUrls: ['./user-applications-table.component.scss'],
})
export class UserApplicationsTableComponent implements OnInit {
  public columnsToDisplay: string[] = [
    'applicationNumber',
    'applicationType',
    'applicationDate',
    'applicationStatus',
    'action',
  ];
  public user;
  public applicationInfoData;
  constructor(
    private userService: UserService,
    private router: Router,
    private newApplicationService: NewApplicationService
  ) {}

  ngOnInit(): void {
    this.userService.cast.subscribe((userSubject) => {
      this.user = userSubject;
      this.userService
        .fetchUserApplications(this.user.id)
        .subscribe((result) => {
          this.applicationInfoData = result.data;
          console.log(this.applicationInfoData);
        });
    });
  }

  continueApplication(id, application_id) {
    this.newApplicationService
      .fetchDraftDetails(id, application_id)
      .subscribe((res) => {
        console.log(res.data);
        localStorage.setItem(
          'app_id',
          res.data[res.data.length - 1].application_id
        );
        this.router.navigateByUrl(res.data[res.data.length - 1].url);
      });
  }
  getApplicationStatus(id): string {
    return applicationStatus[id];
  }
  getPermitType(id): string {
    return applicationTypes[id];
  }
  viewApplication(id) {
    this.router.navigate(['dashboard/applications/view', id]);
  }
}
