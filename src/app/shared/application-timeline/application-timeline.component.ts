import { ActivatedRoute } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-application-timeline',
  templateUrl: './application-timeline.component.html',
  styleUrls: ['./application-timeline.component.scss'],
})
export class ApplicationTimelineComponent implements OnInit {
  @Input() id;
  @Input() page;
  public isLoading: boolean = false;
  public applicationId;
  public applicationTimeline;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(
    private applicationService: ApplicationInfoService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    if (this.page == 'home') {
      this.applicationId = this.id;
    } else {
      this.applicationId = this.route.snapshot.paramMap.get('id');
    }

    this.getApplicationTimeline();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.applicationId = changes.id.currentValue;
    this.getApplicationTimeline();
  }
  getApplicationTimeline() {
    this.applicationService
      .fetchApplicationTmeline(this.applicationId)
      .subscribe((res) => {
        this.applicationTimeline = res.data;
        this.isLoading = false;
      });
  }
}
