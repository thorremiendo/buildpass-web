import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { AuthService } from 'src/app/core/services/auth.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { UserService } from 'src/app/core/services/user.service';
import { userDocuments } from 'src/app/core/variables/documents';
import Swal from 'sweetalert2';
import { documentTypes } from '../../../core/enums/document-type.enum';

@Component({
  selector: 'app-checklist-summary',
  templateUrl: './checklist-summary.component.html',
  styleUrls: ['./checklist-summary.component.scss'],
})
export class ChecklistSummaryComponent implements OnInit {
  public applicationInfo;
  public user;
  public userDetails;
  public applicationId;
  public applicantCompleteName;
  public applicantForms;
  constructor(
    private router: Router,
    private newApplicationService: NewApplicationService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params.id;
    this.userService.cast.subscribe((userSubject) => (this.user = userSubject));
    console.log(this.user);
    // this.newApplicationService.applicationId
    //   .asObservable()
    //   .subscribe((applicationId) => (this.applicationId = applicationId));
    // console.log('application id:', this.applicationId);
    this.newApplicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationInfo = result.data;
        this.applicantCompleteName = `${this.applicationInfo.applicant_detail.first_name} ${this.applicationInfo.applicant_detail.last_name}`;
        this.applicantForms = this.applicationInfo.user_docs;
      });
  }
  goToLink(url: string) {
    window.open(url, '_blank');
  }
  getDocType(id): string {
    return documentTypes[id];
  }
  submit() {
    this.router.navigateByUrl('dashboard/new/success');
  }
}
