import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-downloadable-forms',
  templateUrl: './downloadable-forms.component.html',
  styleUrls: ['./downloadable-forms.component.scss'],
})
export class DownloadableFormsComponent implements OnInit {
  public docs = [
    {
      title: 'Certificate of Occupancy Checklist',
      src:
        '../../../assets/applicant-checklists/Checklist_in_Securing_Certificate_of_Occupancy.pdf',
      caption:
        'CHECKLIST IN SECURING Certificate of Occupancy Pursuant to P.D. 1096, National Building Code of the Philippines and its IRR',
    },
    {
      title: 'Fencing Permit Checklist',
      src:
        '../../../assets/applicant-checklists/Checklist_in_Securing_Fencing_Permit_(LATEST)_0_(1).pdf',
      caption:
        'CHECKLIST IN SECURING FENCING PERMIT Pursuant to P.D. 1096, National Building Code of the Philippines and its IRR',
    },
    {
      title: 'Excavation Permit Checklist',
      src:
        '../../../assets/applicant-checklists/Checklist_in_securing_excavation_permit_(LATEST)_0_0_(1).pdf',
      caption:
        'CHECKLIST IN SECURING EXCAVATION PERMIT Pursuant to P.D. 1096, National Building Code of the Philippines and its IRR',
    },
    {
      title: 'Demolition Permit Checklist',
      src:
        '../../../assets/applicant-checklists/Checklist_in_Securing_Demolition_Permit_(LATEST)_0_(3).pdf',
      caption:
        'CHECKLIST IN SECURING DEMOLITION PERMIT Pursuant to P.D. 1096, National Building Code of the Philippines and it’s IRR',
    },
    {
      title: 'Building Permit Checklist',
      src:
        '../../../assets/applicant-checklists/Building_Permit_Requirement_Checklist.pdf',
      caption:
        'BUILDING PERMIT REQUIREMENT CHECKLIST Pursuant to P.D. 1096, National Building Code of the Philippines and its IRR ',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
  open(doc) {
    window.open(doc);
  }
}
