import { Component, OnInit } from '@angular/core';
import { Router, Data } from '@angular/router';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { DataFormBindingService } from 'src/app/core/services/data-form-binding.service';
import { documentTypes } from '../../../core/enums/document-type.enum';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-building-permit',
  templateUrl: './building-permit.component.html',
  styleUrls: ['./building-permit.component.scss'],
})
export class BuildingPermitComponent implements OnInit {
  public user;
  public pdfSource;
  public formData;
  public applicationId;
  public applicationDetails;
  public isLoading: boolean = true;
  public zoningForm;
  public forms: any = [
    {
      id: 1,
      src:
        '../../../../assets/forms/Application_Form_for_Certificate_of_Zoning_Compliance.pdf',
    },
    {
      id: 2,
      src:
        '../../../../assets/forms/Unified_Application_for_Building_Permit.pdf',
    },
    {
      id: 3,
      src: '../../../../assets/forms/Sanitary_Plumbing_Permit.pdf',
    },
    {
      id: 48,
      src: '../../../../assets/forms/Notice_of_Construction.pdf',
    },
    {
      id: 4,
      src: '../../../../assets/forms/Electrical_Permit.pdf',
    },
  ];

  public fieldSets: any = [
    {
      label: 'Documentary Requirements',
      documents: [21, 23, 24, 25, 26, 27],
    },
    {
      label: 'Design Analysis',
      documents: [28, 29, 30, 31, 32, 33],
    },
    {
      label: 'Building Plans',
      documents: [59, 61, 63, 62, 64],
    },
    {
      label: 'Professional Details',
      documents: [34, 35, 36, 47, 46],
    },
    {
      label: 'Other Requirements',
      documents: [39, 40, 41, 42, 72, 73, 74, 75],
    },
  ];

  constructor(
    private newApplicationService: NewApplicationService,
    private applicationService: ApplicationInfoService,
    private dataBindingService: DataFormBindingService,
    private router: Router,
    private snackBar: MatSnackBar,
    private NgxExtendedPdfViewerService: NgxExtendedPdfViewerService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.newApplicationService.applicationId
      .asObservable()
      .subscribe((applicationId) => {
        if (applicationId) this.applicationId = applicationId;
        else this.applicationId = localStorage.getItem('app_id');

        this.applicationService
          .fetchApplicationInfo(this.applicationId)
          .subscribe((res) => {
            this.applicationDetails = res.data;
            this.formData = this.dataBindingService.getFormData(
              this.applicationDetails
            );

            /*const isRepresentative = this.applicationDetails.is_representative == '1' ? true : false;
          const isOwner = this.applicationDetails.rol_status_id == '1' ? true : false;
          const isRegistered = this.applicationDetails.registered_owner == '1' ? true : false;

          this.fieldSets[0] = this.fieldSets[0].filter(field => {
            if (field.for == 'representative' && !isRepresentative) return false;
            else if (field.for == 'lessee' && isOwner) return false;
            else if (field.for == 'lot-owner' && !isRegistered) return false;
            else if (field.for == 'not-owner' && isRegistered) return false;
            else return true;
          });*/

            this.initData();
            this.setFilePaths();
            this.checkExistingZoningFormData();
            this.pdfSource = this.forms[0].src;
          });
      });
    this.isLoading = false;
  }

  ngAfterViewInit() {
    this.saveRoute();
  }

  saveRoute() {
    const body = {
      user_id: this.user.id,
      application_id: this.applicationId,
      url: this.router.url,
    };

    this.newApplicationService.saveAsDraft(body).subscribe((res) => {});
  }

  initPdfViewer(event) {
    const index = event.selectedIndex;
    const pdfViewer = document.getElementById('pdf-viewer');
    const pdfContainer = document.getElementById(`form-${index}`);
    this.forms[index] ? (this.pdfSource = this.forms[index].src) : null;
    pdfContainer ? pdfContainer.appendChild(pdfViewer) : null;
  }

  getDocType(id): string {
    return documentTypes[id];
  }

  initData() {
    for (let i = 0; i < this.forms.length; i++) {
      this.forms[i] = {
        id: this.forms[i].id,
        src: this.forms[i].src,
        description: this.getDocType(this.forms[i].id),
        path: '',
      };
    }
    for (let i = 0; i < this.fieldSets.length; i++) {
      for (let j = 0; j < this.fieldSets[i].documents.length; j++) {
        this.fieldSets[i].documents[j] = {
          id: this.fieldSets[i].documents[j],
          description: this.getDocType(this.fieldSets[i].documents[j]),
          path: '',
        };
      }
    }
  }

  setFilePaths() {
    const docs = this.applicationDetails.user_docs;
    this.forms.forEach((form) => {
      docs.forEach((doc) => {
        if (form.id == doc.document_id) {
          form.path = doc.document_path;
        }
      });
    });
    this.fieldSets.forEach((fieldSet) => {
      fieldSet.documents.forEach((field) => {
        docs.forEach((doc) => {
          if (field.id == doc.document_id) {
            field.path = doc.document_path;
          }
        });
      });
    });
  }

  submitDocument(file: File, doctypeId: string) {
    this.isLoading = true;
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
        this.isLoading = false;
        const path = res.data.document_path;
        this.forms.forEach((form) => {
          if (form.id == doctypeId) form.path = path;
        });
        this.fieldSets.forEach((fieldSet) => {
          fieldSet.documents.forEach((field) => {
            if (field.id == doctypeId) field.path = path;
          });
        });

        Swal.fire('Success!', 'File uploaded!', 'success').then((result) => {});
      });
  }

  submitApplication() {
    this.router.navigate(['dashboard/new/summary', this.applicationId]);
  }
  checkExistingZoningFormData() {
    this.applicationService
      .fetchZoningFormData(this.applicationId)
      .subscribe((res) => {
        if (res.data.length !== 0) {
          this.zoningForm = res.data;
        }
        console.log(this.zoningForm);
      });
  }
  public async upload(id): Promise<void> {
    const blob = await this.NgxExtendedPdfViewerService.getCurrentDocumentAsBlob();
    if (blob) {
      console.log({ blob });
      this.isLoading = true;
      const uploadDocumentData = {
        application_id: this.applicationId,
        user_id: this.user.id,
        document_id: id,
        document_path: blob,
        document_status: '0',
      };

      this.newApplicationService
        .submitDocument(uploadDocumentData)
        .subscribe((res) => {
          this.isLoading = false;
          this.openSnackBar('Uploaded!');
        });
    } else {
      console.log('Blob failed');
    }
  }

  handleSaveFormData(id) {
    switch (id) {
      case 1:
        const data =
          this.zoningForm == undefined ? this.formData : this.zoningForm;
        const body = {
          applicant_first_name: data.applicant_first_name
            ? data.applicant_first_name
            : '',
          applicant_middle_name: data.applicant_middle_name
            ? data.applicant_middle_name
            : '',
          applicant_last_name: data.applicant_last_name
            ? data.applicant_last_name
            : '',
          name_of_corporation: data.name_of_corporation
            ? data.name_of_corporation
            : '',
          corporation_contact_number: data.corporation_contact_number
            ? data.corporation_contact_number
            : '',
          applicant_house_number: data.applicant_house_number
            ? data.applicant_house_number
            : '',
          applicant_street_name: data.applicant_street_name
            ? data.applicant_street_name
            : '',
          applicant_barangay: data.applicant_barangay
            ? data.applicant_barangay
            : '',
          applicant_province: data.applicant_province
            ? data.applicant_province
            : '',
          corporation_address_no: data.corporation_address_no
            ? data.corporation_address_no
            : '',
          corporation_address_barangay: data.corporation_address_barangay
            ? data.corporation_address_barangay
            : '',
          corporation_address_city: data.corporation_address_city
            ? data.corporation_address_city
            : '',
          rep_first_name: data.rep_first_name ? data.rep_first_name : '',
          rep_middle_name: data.rep_middle_name ? data.rep_middle_name : '',
          rep_last_name: data.rep_last_name ? data.rep_last_name : '',
          rep_contact_number: data.rep_contact_number
            ? data.rep_contact_number
            : '',
          rep_house_number: data.rep_house_number ? data.rep_house_number : '',
          rep_street_name: data.rep_street_name ? data.rep_street_name : '',
          rep_barangay: data.rep_barangay ? data.rep_barangay : '',
          rep_province: data.rep_province ? data.rep_province : '',
          project_type: data.project_type ? data.project_type : '',
          project_nature: data.project_nature ? data.project_nature : '',
          project_nature_others: data.project_nature_others
            ? data.project_nature_others
            : '',
          project_house_number: data.project_house_number
            ? data.project_house_number
            : '',
          project_street_name: data.project_street_name
            ? data.project_street_name
            : '',
          project_barangay: data.project_barangay ? data.project_barangay : '',
          project_province: data.project_province ? data.project_province : '',
          project_lot_area: data.project_lot_area ? data.project_lot_area : '',
          project_total_floor_area: data.project_total_floor_area
            ? data.project_total_floor_area
            : '',
          right_over_land: data.right_over_land ? data.right_over_land : '',
          right_over_land_others: data.right_over_land_others
            ? data.right_over_land_others
            : '',
          project_tenure: data.project_tenure ? data.project_tenure : '',
          project_tenure_temporary: data.project_tenure_temporary
            ? data.project_tenure_temporary
            : '',
          project_cost_cap: data.project_cost_cap ? data.project_cost_cap : '',
          amount_in_words: data.amount_in_words ? data.amount_in_words : '',
          existing_land: data.existing_land ? data.existing_land : '',
          existing_land_residence: data.existing_land_residence
            ? data.existing_land_residence
            : '',
          existing_land_commercial: data.existing_land_commercial
            ? data.existing_land_commercial
            : '',
          existing_land_others: data.existing_land_others
            ? data.existing_land_others
            : '',
          applicant_full_name: data.applicant_full_name
            ? data.applicant_full_name
            : '',
          position_title: data.position_title ? data.position_title : '',
        };
        this.applicationService
          .submitZoningFormData(body, this.applicationId)
          .subscribe((res) => {
            console.log(res);
            this.upload(id);
          });
        break;

      default:
        console.log(id);
        break;
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
