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
  public sortedForms;

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
    this.user = JSON.parse(localStorage.getItem('user'));
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

        this.sortedForms = {
          documents: {
            label: 'Documents',
            data: [],
          },
          permits: {
            label: 'Duly Accomplished Building Permit Forms',
            data: [],
          },
          plans: {
            label: 'Plans, Designs, Specifications, Cost Estimate',
            data: [],
          },
          professional: {
            label:
              'Porfessional Details (Professional Tax Receipt and Professional Regulation Commission ID, signed and sealed)',
            data: [],
          },
          affidavits: {
            label: 'Affidavits',
            data: [],
          },
          clearances: {
            label: 'Clearances (CPDO, CEPMO, BFP)',
            data: [],
          },
          others: {
            label: 'Other Requirements',
            data: [],
          },
        };
        this.applicantForms.forEach((element) => {
          switch (element.document_id) {
            case 1:
            case 21:
            case 26:
            case 27:
            case 23:
            case 25:
            case 57:
              this.sortedForms.documents.data.push(element);
              break;
            case 2:
            case 3:
            case 4:
              this.sortedForms.permits.data.push(element);
              break;
            case 28:
            case 29:
            case 30:
            case 31:
            case 32:
            case 33:
            case 59:
            case 61:
            case 62:
            case 63:
            case 64:
              this.sortedForms.plans.data.push(element);
              break;
            case 34:
            case 35:
            case 36:
              this.sortedForms.professional.data.push(element);
              break;
            case 37:
            case 38:
              this.sortedForms.affidavits.data.push(element);
              break;
            case 39:
            case 43:
            case 44:
            case 45:
              this.sortedForms.clearances.data.push(element);
              break;
            case 40:
            case 41:
            case 42:
              this.sortedForms.others.data.push(element);
              break;
          }
        });
        this.sortedForms = Object.values(this.sortedForms);
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
