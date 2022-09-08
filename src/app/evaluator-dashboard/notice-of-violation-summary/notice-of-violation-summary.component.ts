import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticeOfViolationService } from 'src/app/core/services/notice-of-violation.service';
import { PopOutNotificationsService } from 'src/app/core/services/pop-out-notification.service';

@Component({
  selector: 'app-notice-of-violation-summary',
  templateUrl: './notice-of-violation-summary.component.html',
  styleUrls: ['./notice-of-violation-summary.component.scss'],
})
export class NoticeOfViolationSummaryComponent implements OnInit {
  subId: any;
  isLoading: boolean = false;
  subDetails: any;

  constructor(
    private nov: NoticeOfViolationService,
    private route: ActivatedRoute,
    private router: Router,
    private notif: PopOutNotificationsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subId = this.route.snapshot.params.id;
    this.nov.getSubById(this.subId).subscribe((res) => {
      this.subDetails = res.data[0];
      console.log(this.subDetails);
      this.isLoading = false;
    });
  }

  getStatus(id) {
    switch (id) {
      case 1:
        return 'For Initial Review of Division Chief';
      case 2:
        return 'For Signature of Department Head';
    }
  }
  getType(id) {
    switch (id) {
      case 1:
        return 'First Notice of Violation';
      case 2:
        return 'Second Notice of Violation';
      case 3:
        return 'Third and Final Notice of Violation';
    }
  }
}
