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
      src: '../../../assets/applicant-checklists/Checklist_in_Securing_Certificate_of_Occupancy.pdf',
      caption:
        'CHECKLIST IN SECURING Certificate of Occupancy Pursuant to P.D. 1096, National Building Code of the Philippines and its IRR',
    },
    {
      title: 'Fencing Permit Checklist',
      src: '../../../assets/applicant-checklists/Checklist_in_securing_fencing_permit.pdf',
      caption:
        'CHECKLIST IN SECURING FENCING PERMIT Pursuant to P.D. 1096, National Building Code of the Philippines and its IRR',
    },
    {
      title: 'Excavation Permit Checklist',
      src: '../../../assets/applicant-checklists/Checklist_in_securing_excavation_permit.pdf',
      caption:
        'CHECKLIST IN SECURING EXCAVATION PERMIT Pursuant to P.D. 1096, National Building Code of the Philippines and its IRR',
    },
    {
      title: 'Demolition Permit Checklist',
      src: '../../../assets/applicant-checklists/Checklist_in_Securing_Demolition_Permit.pdf',
      caption:
        'CHECKLIST IN SECURING DEMOLITION PERMIT Pursuant to P.D. 1096, National Building Code of the Philippines and it’s IRR',
    },
    {
      title: 'Building Permit Checklist',
      src: '../../../assets/applicant-checklists/Building_Permit_Requirement_Checklist.pdf',
      caption:
        'BUILDING PERMIT REQUIREMENT CHECKLIST Pursuant to P.D. 1096, National Building Code of the Philippines and its IRR ',
    },
    {
      title: 'Temporary Sidewalk Enclosure and Occupancy Permit Checklist',
      src: '../../../assets/applicant-checklists/CHECKLIST_IN_SECURING_Temporary_Sidewalk_Enclosure_and_Occupancy_Permit.pdf',
      caption:
        'Temporary Sidewalk Enclosure and Occupancy Permit Pursuant to P.D. 1096, National Building Code of the Philippines and its IRR ',
    },
    {
      title: 'Scaffolding Permit Checklist',
      src: '../../../assets/applicant-checklists/CHECKLIST_IN_SECURING_SCAFFOLDING_PERMIT.pdf',
      caption:
        'Scaffolding Permit Checklist Pursuant to P.D. 1096, National Building Code of the Philippines and its IRR ',
    },
    {
      title: 'Sign Permit Checklist',
      src: '../../../assets/applicant-checklists/CHECKLIST_IN_SECURING_SIGN_PERMIT.pdf',
      caption:
        'Sign Permit Checklist Pursuant to P.D. 1096, National Building Code of the Philippines and its IRR ',
    },
    {
      title: 'Geodetic Engineer Affidavit',
      src: '../../../assets/applicant-checklists/GEODETIC-ENGINEER-AFFIDAVIT-updated.pdf',
      caption:
        'Geodetic Engineer Affidavit Pursuant to P.D. 1096, National Building Code of the Philippines and its IRR  ',
    },
    {
      title: 'Civil Engineer Affidavit',
      src: '../../../assets/applicant-checklists/CIVIL-ENGINEER-AFFIDAVIT-updated.pdf',
      caption:
        'Civil Engineer Affidavit Pursuant to P.D. 1096, National Building Code of the Philippines and its IRR   ',
    },
    {
      title: '20 x 30 - 1',
      src: '../../../assets/Format/20x30-1.pdf',
      caption: 'Template for plans designed for BuildPASS Applications.',
    },
    {
      title: '20 x 30 - 2',
      src: '../../../assets/Format/20x30-2.pdf',
      caption: 'Template for plans designed for BuildPASS Applications.',
    },
    {
      title: '30 x 40 - 1',
      src: '../../../assets/Format/30x40-1.pdf',
      caption: 'Template for plans designed for BuildPASS Applications.',
    },
    {
      title: '30 x 40 - 2',
      src: '../../../assets/Format/30x40-2.pdf',
      caption: 'Template for plans designed for BuildPASS Applications.',
    },
    {
      title: 'A3 - 1',
      src: '../../../assets/Format/A3-1.pdf',
      caption: 'Template for plans designed for BuildPASS Applications.',
    },
    {
      title: 'A3 - 2',
      src: '../../../assets/Format/A3-2.pdf',
      caption: 'Template for plans designed for BuildPASS Applications.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
  open(doc) {
    window.open(doc);
  }
}
