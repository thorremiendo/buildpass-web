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
  public applicationCount;

  constructor(
    private userService: UserService,
    private newApplicationService: NewApplicationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.fetchUserApplications(this.user.id).subscribe((result) => {
      this.applications = result.data;
      this.applicationCount = this.applications.length;
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
        this.newApplicationService
          .fetchApplicationInfo(res.data[res.data.length - 1].application_id)
          .subscribe((res) => {
            const permitType = res.data.permit_type_id;
            switch (permitType) {
              case 1:
                this.router.navigateByUrl('/dashboard/new/building-permit');
                break;
              case 2:
                this.router.navigateByUrl('/dashboard/new/occupancy-permit');
                break;
              case 3:
                this.router.navigateByUrl('/dashboard/new/excavation-permit');
                break;
              case 4:
                this.router.navigateByUrl('/dashboard/new/fencing-permit');
                break;
              case 5:
                this.router.navigateByUrl('/dashboard/new/demolition-permit');
                break;
              case 6:
                this.router.navigateByUrl('/dashboard/new/scaffolding-permit');
                break;
              case 7:
                this.router.navigateByUrl('/dashboard/new/sign-permit');
                break;
              case 8:
                this.router.navigateByUrl('/dashboard/new/sidewalk-permit');
                break;
              case 9:
                this.router.navigateByUrl('/dashboard/new/mechanical-permit');
                break;
            }
          });
      });
  }

  viewApplication(id) {
    this.router.navigate(['dashboard/applications/view', id]);
  }
}
