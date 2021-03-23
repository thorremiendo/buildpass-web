import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  @Input() applicationInfo;
  public projectDetails;
  public details;
  constructor(private currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
    this.projectDetails = this.applicationInfo.project_detail;
    this.details = [
      {
        title: 'Project Title',
        value: this.projectDetails.project_title,
      },
      {
        title: 'Complete Project Location',
        value: `${this.projectDetails.house_number} ${this.projectDetails.lot_number} ${this.projectDetails.street_name} ${this.projectDetails.barangay}`,
      },
      {
        title: 'Landmark',
        value: this.projectDetails.landmark,
      },
      {
        title: 'Number of Basement',
        value:
          this.projectDetails.number_of_basement == 0
            ? 'N/A'
            : this.projectDetails.number_of_basement,
      },
      {
        title: 'Number of Storey',
        value: this.projectDetails.number_of_storey,
      },
      {
        title: 'Number of Units',
        value:
          this.projectDetails.number_of_units == 0
            ? 'N/A'
            : this.projectDetails.number_of_units,
      },
      {
        title: 'Total Floor Area',
        value: this.projectDetails.total_floor_area,
      },
      {
        title: 'Project Cost',
        value: this.currencyPipe.transform(
          this.projectDetails.project_cost_cap,
          'PHP '
        ),
      },
      {
        title: 'Tax Declaration Number',
        value: this.projectDetails.tax_dec_number,
      },
      {
        title: 'True Copy of Title Number',
        value: this.projectDetails.tct_number,
      },
    ];
  }
}
