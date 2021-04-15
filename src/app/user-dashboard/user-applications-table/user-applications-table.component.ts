import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';

@Component({
  selector: 'app-user-applications-table',
  templateUrl: './user-applications-table.component.html',
  styleUrls: ['./user-applications-table.component.scss'],
})
export class UserApplicationsTableComponent implements OnInit {
  public user;
  public applications;

  constructor(
    private userService: UserService,
    private newApplicationService: NewApplicationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.fetchUserApplications(this.user.id).subscribe((result) => {
      this.applications = result.data;
    });
  }

  continueApplication(user_id, application_id) {
    this.newApplicationService
      .fetchDraftDetails(user_id, application_id)
      .subscribe((res) => {
        localStorage.setItem(
          'app_id',
          res.data[res.data.length - 1].application_id
        );
        this.router.navigateByUrl(res.data[res.data.length - 1].url);
      });
  }

  viewApplication(id) {
    this.router.navigate(['dashboard/applications/view', id]);
  }
}
