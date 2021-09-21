import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-technical-evaluation',
  templateUrl: './technical-evaluation.component.html',
  styleUrls: ['./technical-evaluation.component.scss'],
})
export class TechnicalEvaluationComponent implements OnInit {
  @Input() evaluatorDetails;
  @Input() applicationDetails;

  public cbaoTimeline;
  constructor(private applicationServce: ApplicationInfoService) {}

  ngOnInit(): void {
    console.log(this.applicationDetails);
    this.applicationServce
      .fetchCbaoTimeline(this.applicationDetails.id)
      .subscribe((res) => {
        this.cbaoTimeline = res.data;
      });
  }
}
