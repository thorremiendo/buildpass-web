import { ActivatedRoute } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-timeline',
  templateUrl: './application-timeline.component.html',
  styleUrls: ['./application-timeline.component.scss'],
})
export class ApplicationTimelineComponent implements OnInit {
  public applicationId;
  public applicationTimeline;
  constructor(
    private applicationService: ApplicationInfoService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params.id;
    this.getApplicationTimeline();
  }
  getApplicationTimeline() {
    this.applicationService
      .fetchApplicationTmeline(this.applicationId)
      .subscribe((res) => {
        this.applicationTimeline = res.data;
      });
  }
}
