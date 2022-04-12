import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';
import { environment } from './../../../../environments/environment';

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
  public isLoading;
  public documentTypes;
  public isAuthorized;
  public receiveApplications: boolean;

  constructor(
    private router: Router,
    private newApplicationService: NewApplicationService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private applicationService: ApplicationInfoService
  ) {}

  ngOnInit(): void {
    this.receiveApplications = environment.receiveApplications;
    this.isAuthorized = false;
    this.isLoading = true;
    this.applicationId = this.route.snapshot.params.id;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.applicationService
      .verifyUserApplication(this.applicationId, this.user.id)
      .subscribe(
        (res) => {
          this.isLoading = true;
          this.isAuthorized = true;
          this.newApplicationService.fetchDocumentTypes().subscribe((res) => {
            this.documentTypes = res.data;
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
                    this.permitType = 'Certificate of Occupancy';
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
                  case 6:
                    this.permitType = 'Scaffolding Permit';
                    break;
                  case 7:
                    this.permitType = 'Sign Permit';
                    break;
                }
                if (this.applicantForms) this.sortForms();
              });
          });
        },
        (error) => {
          this.router.navigateByUrl('dashboard/applications');
        }
      );
  }

  getDocType(id): string {
    return this.documentTypes[id - 1].name;
  }

  proceed() {
    this.newApplicationService
      .fetchDraftDetails(this.applicationInfo.user_id, this.applicationInfo.id)
      .subscribe((res) => {
        localStorage.setItem(
          'app_id',
          res.data[res.data.length - 1].application_id
        );
        this.router.navigateByUrl(res.data[res.data.length - 1].url);
      });
  }

  submit() {
    this.isLoading = true;
    const body = {
      application_status_id: 1,
    };
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        if (res.includes('Maximum')) {
          this.isLoading = false;
          Swal.fire(
            'Info!',
            'Maximum applications reached for the day. Please try again tomorrow.',
            'info'
          );
        } else {
          this.isLoading = false;
          this.goToSuccessPage();
        }
      });
  }

  updateApplicationWithExcavation() {
    const data = {
      application_status_id: 1,
      is_excavation: 1,
    };
    this.applicationService
      .updateApplicationStatus(data, this.applicationId)
      .subscribe((res) => {
        this.saveApplicationDetailsToLocal();
      });
  }

  saveApplicationDetailsToLocal() {
    this.newApplicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        localStorage.setItem(
          'application_details_for_excavation',
          JSON.stringify(res.data)
        );
        this.isLoading = false;
        this.router.navigateByUrl('dashboard/new/excavation-permit');
      });
  }

  goToSuccessPage() {
    this.router.navigate([
      'dashboard/new/success',
      { application_number: this.applicationInfo.ocpas_code },
    ]);
  }

  submitDocument(file: File, doctypeId: string) {
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.user.id,
      document_id: doctypeId,
      document_path: file,
      document_status: '0',
    };

    this.newApplicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        const path = res.data.document_path;
        this.applicantForms.forEach((form, index) => {
          if (form.document_id == doctypeId) form.document_path = path;
          index++;

          if (index == this.applicantForms.length) this.sortForms();
        });
      });
  }

  sortForms() {
    this.sortedForms = {
      forms: {
        label: 'Forms',
        data: [],
      },
      documents: {
        label: 'Documentary Requirements',
        data: [],
      },
      plans: {
        label: 'Plans, Designs, Specifications, Cost Estimate',
        data: [],
      },
      professional: {
        label:
          'Photocopy of Professional Details (Professional Tax Receipt and Professional Regulation Commission ID, signed and sealed)',
        data: [],
      },
      affidavits: {
        label: 'Affidavits',
        data: [],
      },
      others: {
        label: 'Others',
        data: [],
      },
    };

    this.applicantForms.forEach((element) => {
      const docType =
        this.documentTypes[element.document_id - 1]?.document_category_id;

      switch (docType) {
        case 1:
          this.sortedForms.forms.data.push(element);
          break;
        case 2:
          this.sortedForms.documents.data.push(element);
          break;
        case 3:
          this.sortedForms.plans.data.push(element);
          break;
        case 4:
          this.sortedForms.professional.data.push(element);
          break;
        case 5:
          this.sortedForms.affidavits.data.push(element);
          break;
        default:
          this.sortedForms.others.data.push(element);
          break;
      }
    });

    this.sortedForms = Object.values(this.sortedForms);

    this.isLoading = false;
  }
}
