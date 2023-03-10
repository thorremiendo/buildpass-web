import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
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
  public permitType;
  public isExcavation;

  constructor(
    private router: Router,
    private newApplicationService: NewApplicationService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private applicationService: ApplicationInfoService
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params.id;
    this.userService.cast.subscribe((userSubject) => (this.user = userSubject));
    console.log(this.user);
    this.newApplicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationInfo = result.data;

        this.applicantCompleteName = `${this.applicationInfo.applicant_detail.first_name} ${this.applicationInfo.applicant_detail.last_name}`;
        this.applicantForms = this.applicationInfo.user_docs;
        switch (this.applicationInfo.permit_type_id) {
          case 1:
            this.permitType = 'Building Permit';
            break;
          case 2:
            this.permitType = 'Occupancy Permit';
            break;
          case 3:
            this.permitType = 'Excavation Permit';
            break;
          case 4:
            this.permitType = 'Fencing Permit';
            break;
          case 5:
            this.permitType = 'Demolition Permit';
            break;
        }
      });
  }
  goToLink(url: string) {
    window.open(url, '_blank');
  }
  getDocType(id): string {
    return documentTypes[id];
  }
  submit() {
    const body = {
      application_status_id: 7,
    };

    if (this.applicationInfo.permit_type_id == '1') {
      Swal.fire({
        title: 'Do you need an Excavation Permit?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            is_excavation: 1,
          };
          this.applicationService
            .updateApplicationStatus(data, this.applicationId)
            .subscribe((res) => {
              this.router.navigateByUrl('dashboard/new/step-one');
            });
        } else if (result.isDenied) {
          this.applicationService
            .updateApplicationStatus(body, this.applicationId)
            .subscribe((res) => {
              localStorage.removeItem('applicationDetails');
              this.router.navigateByUrl('dashboard/new/success');
            });
        }
      });
    } else if (this.applicationInfo.permit_type_id == '3') {
      this.router.navigateByUrl('dashboard/new/success');
    } else {
      this.router.navigateByUrl('dashboard');
    }
  }
  // handleRedirect() {
  //   this.router.navigateByUrl('dashboard/new/step-one');
  // }
}
