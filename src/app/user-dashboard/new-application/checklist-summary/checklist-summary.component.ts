import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

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

  constructor(
    private router: Router,
    private newApplicationService: NewApplicationService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private applicationService: ApplicationInfoService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.applicationId = this.route.snapshot.params.id;
    this.user = JSON.parse(localStorage.getItem('user'));

    this.newApplicationService.fetchDocumentTypes().subscribe((res) => {
      this.documentTypes = res.data;
    });

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
          const docType = this.documentTypes[element.document_id]
            .document_category_id;
          console.log(docType);
          switch (docType) {
            case 1:
              this.sortedForms.documents.data.push(element);
              break;
            case 2:
              this.sortedForms.permits.data.push(element);
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
            case 6:
              this.sortedForms.clearances.data.push(element);
              break;
            //case 7:
            default:
              this.sortedForms.others.data.push(element);
              break;
          }
        });
        this.sortedForms = Object.values(this.sortedForms);
        this.isLoading = false;
      });
  }
  goToLink(url: string) {
    window.open(url, '_blank');
  }
  getDocType(id): string {
    return this.documentTypes[id - 1].name;
  }

  proceed() {
    this.newApplicationService
      .fetchDraftDetails(this.applicationInfo.user_id, this.applicationInfo.id)
      .subscribe((res) => {
        console.log(res.data);
        localStorage.setItem(
          'app_id',
          res.data[res.data.length - 1].application_id
        );
        this.router.navigateByUrl(res.data[res.data.length - 1].url);
      });
  }

  submit() {
    if (this.applicationInfo.permit_type_id == '1') {
      Swal.fire({
        title: 'Do you need an Excavation Permit?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          this.updateApplicationWithExcavation();
        } else if (result.isDenied) {
          this.isLoading = true;
          this.updateApplicationStatusToPayment();
        }
      });
    } else {
      this.isLoading = true;
      this.updateApplicationStatusToPayment();
    }
  }

  updateApplicationWithExcavation() {
    const data = {
      application_status_id: 7,
      is_excavation: 1,
    };
    this.applicationService
      .updateApplicationStatus(data, this.applicationId)
      .subscribe((res) => {
        this.saveApplicationDetailsToLocal();
        this.router.navigateByUrl('dashboard/new/excavation-permit');
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
      });
  }

  updateApplicationStatusToPayment() {
    const body = {
      application_status_id: 7,
    };
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        console.log(res);
        localStorage.removeItem('application_details_for_excavation');
        this.isLoading = false;
        this.router.navigate([
          'dashboard/new/success',
          { application_number: res.data },
        ]);
      });
  }
}
