import { Component, Input, OnInit } from '@angular/core';
import { documentTypes } from '../../core/enums/document-type.enum';

@Component({
  selector: 'app-applicant-building-permit-docs',
  templateUrl: './applicant-building-permit-docs.component.html',
  styleUrls: ['./applicant-building-permit-docs.component.scss'],
})
export class ApplicantBuildingPermitDocsComponent implements OnInit {
  @Input() forms;
  public applicantForms;
  displayedColumns: string[] = ['index', 'name', 'action'];
  constructor() {}

  ngOnInit(): void {
    this.filterBuildingPermitForms();
  }

  filterBuildingPermitForms() {
    // const forms = this.forms.filter(
    //   (obj) =>
    //     obj.document_id == 26 ||
    //     obj.document_id == 50 ||
    //     obj.document_id == 44 ||
    //     obj.document_id == 34 ||
    //     obj.document_id == 35 ||
    //     obj.document_id == 46 ||
    //     obj.document_id == 14
    // );
    this.applicantForms = this.forms;
  }

  getDocType(id): string {
    return documentTypes[id];
  }
}
