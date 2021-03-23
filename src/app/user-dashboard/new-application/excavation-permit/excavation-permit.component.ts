import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { DataFormBindingService } from 'src/app/core/services/data-form-binding.service';
import { documentTypes } from '../../../core/enums/document-type.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-excavation-permit',
  templateUrl: './excavation-permit.component.html',
  styleUrls: ['./excavation-permit.component.scss'],
})
export class ExcavationPermitComponent implements OnInit {
  public user;
  public pdfSource;
  public formData;
  public applicationId;
  public applicationDetails;
  public isLoading: boolean = false;
  public exisitingApplicationInfo;
  public excavationId;

  public forms: any = [
    {
      id: 5,
      src:
        '../../../../assets/forms/Excavation_and_Ground_Preparation_Permit.pdf',
    },
  ];

  public fieldSets: any = [
    {
      label: '1',
      documents: [21, 26, 44, 27, 23, 24],
    },
    {
      label: '2',
      documents: [45, 8, 25, 15],
    },
    {
      label: '3',
      documents: [7, 9, 10, 11, 12],
    },
    {
      label: '4',
      documents: [13, 16, 17, 18, 20, 19],
    },
    // {
    //   label: '5',
    //   documents: [39, 40, 41, 42],
    // },
  ];

  constructor(
    private newApplicationService: NewApplicationService,
    private applicationService: ApplicationInfoService,
    private dataBindingService: DataFormBindingService,
    private router: Router
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
            this.pdfSource = this.forms[0].src;
          });
      });
    this.checkBuildingPermitExcavation();
  }

  checkBuildingPermitExcavation() {
    if (localStorage.getItem('application_details_for_excavation')) {
      this.exisitingApplicationInfo = JSON.parse(
        localStorage.getItem('application_details_for_excavation')
      );
      console.log('EXISTING', this.exisitingApplicationInfo);
      this.submitExcavationDetails();
    }
  }
  submitExcavationDetails() {
    this.isLoading = true;
    const body = {
      main_permit_id: this.applicationId,
      permit_type_id: 3,
      user_id: this.user.id,
      is_representative: this.exisitingApplicationInfo.is_representative,
      rol_status_id: this.exisitingApplicationInfo.rol_status_id,
      construction_status_id: this.exisitingApplicationInfo
        .construction_status_id,
      is_registered_owner: this.exisitingApplicationInfo.is_registered_owner,
      applicant_first_name: this.exisitingApplicationInfo.applicant_detail
        .first_name,
      applicant_middle_name: this.exisitingApplicationInfo.applicant_detail
        .middle_name,
      applicant_last_name: this.exisitingApplicationInfo.applicant_detail
        .last_name,
      applicant_suffix_name: this.exisitingApplicationInfo.applicant_detail
        .suffix_name,
      applicant_tin_number: this.exisitingApplicationInfo.applicant_detail
        .tin_number,
      applicant_contact_number: this.exisitingApplicationInfo.applicant_detail
        .contact_number,
      applicant_email_address: this.exisitingApplicationInfo.applicant_detail
        .email_address,
      applicant_house_number: this.exisitingApplicationInfo.applicant_detail
        .house_number,
      applicant_unit_number: this.exisitingApplicationInfo.applicant_detail
        .unit_number,
      applicant_floor_number: this.exisitingApplicationInfo.applicant_detail
        .floor_number,
      applicant_street_name: this.exisitingApplicationInfo.applicant_detail
        .street_name,
      applicant_barangay: this.exisitingApplicationInfo.applicant_detail
        .barangay,
      project_house_number: this.exisitingApplicationInfo.project_detail
        .house_number,
      project_lot_number: this.exisitingApplicationInfo.project_detail
        .lot_number,
      project_block_number: this.exisitingApplicationInfo.project_detail
        .block_number,
      project_street_name: this.exisitingApplicationInfo.project_detail
        .street_name,
      project_number_of_units: this.exisitingApplicationInfo.project_detail
        .number_of_units
        ? this.exisitingApplicationInfo.project_detail.number_of_units
        : 0,
      project_barangay: this.exisitingApplicationInfo.project_detail.barangay,
      project_number_of_basement: this.exisitingApplicationInfo.project_detail
        .number_of_basement
        ? this.exisitingApplicationInfo.project_detail.number_of_basement
        : 0,
      project_lot_area: this.exisitingApplicationInfo.project_detail.lot_area,
      project_total_floor_area: this.exisitingApplicationInfo.project_detail
        .total_floor_area,
      project_units: this.exisitingApplicationInfo.project_detail.unit_number
        ? this.exisitingApplicationInfo.project_detail.unit_number
        : 0,
      project_number_of_storey: this.exisitingApplicationInfo.project_detail
        .number_of_storey
        ? this.exisitingApplicationInfo.project_detail.number_of_storey
        : 0,
      project_title: this.exisitingApplicationInfo.project_detail.project_title,
      project_cost_cap: this.exisitingApplicationInfo.project_detail
        .project_cost_cap,
      project_tct_number: this.exisitingApplicationInfo.project_detail
        .tct_number,
      project_tax_dec_number: this.exisitingApplicationInfo.project_detail
        .tax_dec_number,
      project_landmark: this.exisitingApplicationInfo.project_detail.landmark,
    };
    this.newApplicationService.submitApplication(body).subscribe((res) => {
      this.excavationId = res.data.id;
      this.isLoading = false;
    });
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
    const id = this.excavationId ? this.excavationId : this.applicationId;

    const uploadDocumentData = {
      application_id: id,
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
    const id = this.excavationId ? this.excavationId : this.applicationId;

    const data = {
      application_status_id: 7,
    };
    this.applicationService
      .updateApplicationStatus(data, id)
      .subscribe((res) => {
        this.router.navigate(['dashboard/new/summary', id]);
        localStorage.removeItem('app_id');
        localStorage.removeItem('application_details_for_excavation');
      });
  }
}
