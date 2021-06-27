import { ActivatedRoute } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-application-timeline',
  templateUrl: './application-timeline.component.html',
  styleUrls: ['./application-timeline.component.scss'],
})
export class ApplicationTimelineComponent implements OnInit {
  @Input() id;
  @Input() page;
  @Input() permitType;
  @ViewChild('stepper') stepper: MatStepper;
  public loading = true;
  public applicationId;
  public applicationTimeline = {};
  public cbaoTimeline = {};
  public cbaoStatus = 'compliant';

  constructor(
    private applicationService: ApplicationInfoService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
        res.data.forEach(log => {
          const officeId = `${log.office_id}.${log.sub_office_id}`;
          if (!this.applicationTimeline[officeId]) this.applicationTimeline[officeId] = [{...log}];
          else this.applicationTimeline[officeId].push({...log});
        });

        this.applicationService
          .fetchCbaoTimeline(this.applicationId)
          .subscribe((res) => {
            this.cbaoStatus = 'compliant';
            let pendingFlag = false;
            let nonCompliantFlag = false;
            res.data.forEach(log => {
              if (!this.cbaoTimeline[log.name]) this.cbaoTimeline[log.name] = [{...log}];
              else this.cbaoTimeline[log.name].push({...log});
            });
            Object.keys(this.cbaoTimeline).forEach(division => {
              if (this.cbaoTimeline[division][this.cbaoTimeline[division].length-1].color == 'red') nonCompliantFlag = true;
              else if (this.cbaoTimeline[division][this.cbaoTimeline[division].length-1].color != 'green') pendingFlag = true;
            });
            if (nonCompliantFlag) this.cbaoStatus = 'non-compliant';
            else if (pendingFlag) this.cbaoStatus = 'pending';
            this.loading = false;
          });
      });
  }
}
