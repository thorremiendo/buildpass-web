import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FeedService } from '../../core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ApplicationInfoService } from '../../core';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
  providers: [FeedService],
})
export class UserHomeComponent implements OnInit {
  time = new Date();
  currentDate = new Date();
  timer;
  public config: PerfectScrollbarConfigInterface = {};
  public applicationId = 1;
  public userInfo;
  public applications: [];

  panelOpenState = false;
  reminders = ['Reminder 1', 'Reminder 2', 'Reminder 3', 'Reminder 4'];

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private applicatonInfoService: ApplicationInfoService
  ) {}

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user'));

    if (this.userInfo) {
      this.applicatonInfoService
        .fetchOngoingApplication(this.userInfo.id)
        .subscribe((data) => {
          this.applications = data.data;
          console.log(this.applications);
        });
    }
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }

  openApplication(id) {
    this._router.navigate(['dashboard/applications/view', id]);
  }
  goToNewApplication(id) {
    this._router.navigate([
      'dashboard/new/step-one',
      {
        new_application: id,
      },
    ]);
  }
}
