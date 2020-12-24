import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { applicationStatus } from '../../core/enums/application-status.enum';

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
  constructor(private userService: UserService, private router: Router) {}

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
  getApplicationStatus(id): string {
    return applicationStatus[id];
  }
  viewApplication(id) {
    this.router.navigate(['dashboard/applications/view', id]);
  }
}
