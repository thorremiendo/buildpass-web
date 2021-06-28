import { ActivatedRoute } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-application-timeline',
  templateUrl: './application-timeline.component.html',
  styleUrls: ['./application-timeline.component.scss'],
})
export class ApplicationTimelineComponent implements OnInit {
  @Input() id: string;
  @Input() type: string;
  @Input() lite: string
  @ViewChild('stepper') stepper: MatStepper;
  public loading = true;
  public applicationId;
  public permitType;
  public applicationTimeline = {};
  public cbaoTimeline = {};
  public cbaoStatus = 'compliant';
  public cbaoExpandable = false;
  public timelineLoading = true;

  constructor(
    private applicationService: ApplicationInfoService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.id) this.applicationId = this.id;
    else this.applicationId = this.route.snapshot.paramMap.get('id');
    if (this.type) this.permitType = this.type;
    this.applicationTimeline = {};
    this.cbaoTimeline = {};
    this.cbaoExpandable = false;
    this.getApplicationTimeline(true);
  }

  ngOnChanges(): void {
    if (this.id) this.applicationId = this.id;
    if (this.type) this.permitType = this.type;
    this.applicationTimeline = {};
    this.cbaoTimeline = {};
    this.cbaoExpandable = false;
    this.getApplicationTimeline(false);
  }

  getApplicationTimeline(init) {
    if (init || (!init && !this.timelineLoading)) {
      this.timelineLoading = true;
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
                if (this.cbaoTimeline[division].length > 1) this.cbaoExpandable = true;
                if (this.cbaoTimeline[division][this.cbaoTimeline[division].length-1].color == 'red') nonCompliantFlag = true;
                else if (this.cbaoTimeline[division][this.cbaoTimeline[division].length-1].color != 'green') pendingFlag = true;
              });
              if (nonCompliantFlag) this.cbaoStatus = 'non-compliant';
              else if (pendingFlag || !Object.keys(this.cbaoTimeline).length) this.cbaoStatus = 'pending';
              this.loading = false;
              this.timelineLoading = false;
            });
        });
    }
  }
  
  expandTimelineBox(box) {
    const boxes = document.querySelectorAll('.application-timeline.flowchart .timeline-box');
    const target: HTMLElement = document.querySelector(`.application-timeline.flowchart #${box} .timeline-box`);
    const expanded = target.classList.contains('timeline-full');
    boxes.forEach(box => {
      box.classList.remove('timeline-full');
    });
    if (!expanded) target.classList.add('timeline-full');
  }
}
