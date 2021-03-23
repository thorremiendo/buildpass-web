import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss'],
})
export class ApplicantDetailsComponent implements OnInit {
  @Input() applicationInfo;
  public applicantDetails;
  public details;
  constructor() {}

  ngOnInit(): void {
    this.applicantDetails = this.applicationInfo.applicant_detail;
    this.details = [
      {
        title: 'Complete Name',
        value: `${this.applicantDetails.first_name} ${this.applicantDetails.middle_name} ${this.applicantDetails.last_name}`,
      },
      {
        title: 'Email Address',
        value: this.applicantDetails.email_address,
      },
      {
        title: 'Contact Number',
        value: this.applicantDetails.contact_number,
      },
      {
        title: 'TIN Number',
        value: this.applicantDetails.tin_number,
      },
      {
        title: 'Complete Address',
        value: `${this.applicantDetails.house_number} ${this.applicantDetails.street_name} ${this.applicantDetails.barangay}`,
      },
    ];
  }
}
