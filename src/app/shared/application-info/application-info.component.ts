import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core';
import { applicationStatus } from '../../core/enums/application-status.enum';
import { applicationTypes } from '../../core/enums/application-type.enum';
import { documentStatus } from '../../core/enums/document-status.enum';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.scss']
})
export class ApplicationInfoComponent implements OnInit {
  private applicationId;
  public userInfo;
  public userRole;
  public applicationInfo;
  public applicationDocs;
  public selectedTab;
  public selectedDocument;
  public selectedDocumentTab;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private applicationService: ApplicationInfoService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.userInfo = JSON.parse(localStorage.getItem('user'));
      this.userRole = this.userInfo.user_roles[0].role[0];
    }

    this.applicationId = this.route.snapshot.params.id;
    this.getApplicationInfo(this.applicationId);
  }

  getApplicationInfo(id) {
    this.applicationService
      .fetchApplicationInfo(id)
      .subscribe((result) => {
        this.applicationInfo = result.data;
        this.applicationDocs = this.getApplicationDocs(result.data.user_docs);
      });
  }

  getApplicationType(id): string {
    return applicationTypes[id];
  }

  getApplicationStatus(id): string {
    return applicationStatus[id];
  }

  getApplicationDocs(docs): object {
    docs.forEach(doc => {
      doc.document_status = this.getDocumentStatus(doc, this.userRole.code);
    })
    return docs;
  }

  getDocumentStatus(doc, role): string {
    if (role == 'CBAO-REC') {
      if (doc.is_applicable == 2 && doc.receiving_status_id == 1)
        return 'Not Applicable';
      else
        return documentStatus[doc.receiving_status_id];
    } else if (
      this.applicationInfo.permit_type_id != 1 ||
      role == 'CBAO-DC' ||
      role == 'CBAO-BO' ||
      role == 'CBAO-REL'
    ) {
      if (doc.is_applicable == 2 && doc.document_status_id == 1)
        return 'Not Applicable';
      else
        return documentStatus[doc.document_status_id];
    } else {
      if (doc.is_applicable == 2 && doc.cbao_status_id == 1)
        return 'Not Applicable';
      else
        return documentStatus[doc.cbao_status_id];
    }
  }

  viewDocument(params): void {
    let data = this.applicationDocs.find(doc => doc.id == params.id);
    data.application_id = this.applicationInfo.id;
    this.selectedDocument = data;
    this.selectedDocumentTab = params.tab;
    this.selectedTab = 1;
  }

  updateDocument(update): void {
    this.selectedTab = 0;
  }
}
