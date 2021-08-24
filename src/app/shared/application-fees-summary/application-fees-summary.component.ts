import { ActivatedRoute } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { ApplicationFeesService } from 'src/app/core/services/application-fees.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-fees-summary',
  templateUrl: './application-fees-summary.component.html',
  styleUrls: ['./application-fees-summary.component.scss'],
})
export class ApplicationFeesSummaryComponent implements OnInit {
  public applicationFee;
  public applicationId;
  public applicationDetails;

  constructor(
    private applicationFeeService: ApplicationFeesService,
    private applicationService: ApplicationInfoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params.id;
    this.fetchApplicationFees();
    this.fetchApplicationDetails();
  }

  fetchApplicationFees() {
    this.applicationFeeService
      .fetchFees(this.applicationId)
      .subscribe((res) => {
        this.applicationFee = res.data[res.data.length - 1];
        console.log(this.applicationFee);
      });
  }

  fetchApplicationDetails() {
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationDetails = result.data;
      });
  }
}
