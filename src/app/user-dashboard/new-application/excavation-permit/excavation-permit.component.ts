import { GetDateService } from './../../../core/services/get-date.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { DataFormBindingService } from 'src/app/core/services/data-form-binding.service';
import Swal from 'sweetalert2';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-excavation-permit',
  templateUrl: './excavation-permit.component.html',
  styleUrls: ['./excavation-permit.component.scss'],
})
export class ExcavationPermitComponent implements OnInit {
  public isSubmitting: boolean = false;
  public user;
  public pdfSource;
  public formData;
  public applicationId;
  public applicationDetails;
  public documentTypes;
  public isLoading: boolean = false;
  public exisitingApplicationInfo;
  public excavationId;
  public renderFields: any = [];
  public forms: any = [
    {
      id: 5,
      src: '../../../../assets/forms/updated/excavation_permit_form_v3_(2)_october_21_2021.pdf',
    },
  ];

  public fieldSets: any = [
    {
      label: 'Step 2',
      title: 'Documentary Requirements',
      documents: [],
    },
    {
      label: 'Step 3',
      title: 'Plans, Specifications',
      documents: [7, 8, 9, 10, 11, 12, 13, 16, 17, 100],
    },
    {
      label: 'Step 4',
      title:
        'Photocopy of Professional Details (Professional Tax Receipt and Professional Regulations Commission ID, signed and sealed)',
      documents: [],
    },
    {
      label: 'Step 5',
      title: 'Other Requirements',
      documents: [19, 20, 39],
    },
  ];

  public fieldSetsWithBuildingPermit: any = [
    {
      label: 'Step 2',
      title: 'Plans, Specifications',
      documents: [7, 8, 9, 10, 11, 12, 13, 16, 17, 100],
    },
    {
      label: 'Step 3',
      title: 'Other Requirements',
      documents: [19, 20],
    },
  ];

  public representativeDocs: Array<any> = [21];
  public lesseeDocs: Array<any> = [27];
  public registeredDocs: Array<any> = [44];
  public notRegisteredDocs: Array<any> = [23, 24];
  public isWithinSubdivision: Array<any> = [72];
  public isUnderMortgage: Array<any> = [73];
  public isOwnedByCorporation: Array<any> = [74];
  public isHaveCoOwners: Array<any> = [75];
  public if10000sqm: Array<any> = [40];

  constructor(
    private newApplicationService: NewApplicationService,
    private applicationService: ApplicationInfoService,
    private dataBindingService: DataFormBindingService,
    private router: Router,
    private NgxExtendedPdfViewerService: NgxExtendedPdfViewerService,
    private snackBar: MatSnackBar,
    private dateService: GetDateService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.newApplicationService.fetchDocumentTypes().subscribe((res) => {
      this.isLoading = true;
      this.documentTypes = res.data;
      setTimeout(() => {
        this.applicationId = localStorage.getItem('app_id');
        this.checkBuildingPermitExcavation();
      }, 2000);
    });
  }

  fetchApplicationInfo() {
    this.applicationService
      .fetchApplicationInfo(
        this.excavationId ? this.excavationId : this.applicationId
      )
      .subscribe((res) => {
        this.applicationDetails = res.data;
        console.log(this.applicationDetails);
        this.saveRoute();
        if (this.applicationDetails.main_permit_id == null) {
          this.fieldSets[3].documents.push(18);
          this.fieldSets[0].documents.push(26, 104);
          this.fieldSets[2].documents.push(34);
          const isRepresentative =
            this.applicationDetails.is_representative == '1' ? true : false;
          const isLessee =
            this.applicationDetails.rol_status_id != '1' ? true : false;
          const isRegisteredOwner =
            this.applicationDetails.registered_owner == '1' ? true : false;
          const isWithinSubdivision =
            this.applicationDetails.is_within_subdivision == 1 ? true : false;
          const isUnderMortgage =
            this.applicationDetails.is_under_mortgage == 1 ? true : false;
          const isOwnedByCorporation =
            this.applicationDetails.is_owned_by_corporation == 1 ? true : false;
          const isHaveCoOwners =
            this.applicationDetails.is_property_have_coowners == 1
              ? true
              : false;

          const if10000sqm =
            this.applicationDetails.project_detail.total_floor_area >= 10000
              ? true
              : false;
          isRepresentative
            ? this.fieldSets[0].documents.push(...this.representativeDocs)
            : null;
          isLessee
            ? this.fieldSets[0].documents.push(...this.lesseeDocs)
            : null;
          isRegisteredOwner
            ? this.fieldSets[0].documents.push(...this.registeredDocs)
            : this.fieldSets[0].documents.push(...this.notRegisteredDocs);
          if10000sqm
            ? this.fieldSets[1].documents.push(...this.if10000sqm)
            : null;
          isWithinSubdivision
            ? this.fieldSets[3].documents.push(...this.isWithinSubdivision)
            : null;
          isUnderMortgage
            ? this.fieldSets[3].documents.push(...this.isUnderMortgage)
            : null;
          isOwnedByCorporation
            ? this.fieldSets[3].documents.push(...this.isOwnedByCorporation)
            : null;
          isHaveCoOwners
            ? this.fieldSets[3].documents.push(...this.isHaveCoOwners)
            : null;

          this.formData = this.dataBindingService.getFormData(
            this.applicationDetails
          );
          this.renderFields = this.fieldSets;
        } else {
          this.formData = this.dataBindingService.getFormData(
            this.applicationDetails
          );
          this.renderFields = this.fieldSetsWithBuildingPermit;
        }

        this.initData();
        this.setFilePaths();
        this.pdfSource = this.forms[0].src;
        this.isLoading = false;
      });
  }
  checkBuildingPermitExcavation() {
    if (localStorage.getItem('application_details_for_excavation')) {
      this.exisitingApplicationInfo = JSON.parse(
        localStorage.getItem('application_details_for_excavation')
      );
      this.submitExcavationDetails();
    } else {
      this.fetchApplicationInfo();
    }
  }

  updateApplicationInfoWithFormData() {
    const body = {
      applicant_first_name: this.formData.applicant_first_name,
      applicant_middle_name: this.formData.applicant_middle_name,
      applicant_last_name: this.formData.applicant_last_name,
      applicant_tin_number: this.formData.applicant_tin_number,
      applicant_house_number: this.formData.applicant_house_number,
      applicant_street_name: this.formData.applicant_street_name,
      applicant_barangay: this.formData.applicant_barangay,
      applicant_contact_number: this.formData.applicant_contact_number,
      project_lot_number: this.formData.project_lot_number,
      project_block_number: this.formData.project_block_number,
      project_street_name: this.formData.project_street_name,
      project_barangay: this.formData.project_barangay,
      project_tct_number: this.formData.project_tct_number,
      project_tax_dec_number: this.formData.project_tax_dec_number,
    };
    this.applicationService
      .updateApplicationInfo(body, this.applicationId)
      .subscribe((res) => {});
  }

  getFieldSetsLength() {
    const length = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    Object.keys(this.renderFields).forEach((element) => {
      length.push(this.renderFields[element].documents.length);
    });

    return length.reduce(reducer);
  }
  getUniqueUserDocs() {
    const unique = [
      ...new Set(
        this.applicationDetails.user_docs.map((item) => item.document_id)
      ),
    ];
    return unique.length;
  }

  updateFilePath() {
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        this.applicationDetails = res.data;
        this.setFilePaths();
        this.openSnackBar('Uploaded!');
      });
  }

  public async upload(form): Promise<void> {
    this.isSubmitting = true;
    const blob =
      await this.NgxExtendedPdfViewerService.getCurrentDocumentAsBlob();
    this.dataBindingService.handleSaveExcavationForm(
      this.applicationId,
      this.formData
    );
    if (!form.path) {
      if (blob) {
        this.isLoading = true;
        const uploadDocumentData = {
          application_id: this.applicationId,
          user_id: this.user.id,
          document_id: form.id,
          document_path: blob,
          document_status: '0',
        };

        this.newApplicationService
          .submitDocument(uploadDocumentData)
          .subscribe((res) => {
            this.isLoading = false;
            this.isSubmitting = false;
            this.updateApplicationInfoWithFormData();
            this.updateFilePath();
          });
      } else {
        this.isSubmitting = false;
        console.log('Blob failed');
      }
    } else {
      const uploadDocumentData = {
        document_status_id: 0,
      };
      if (blob) {
        uploadDocumentData['document_path'] = blob;
      }
      this.newApplicationService
        .updateDocumentFile(uploadDocumentData, form.doc_id)
        .subscribe((res) => {
          this.updateApplicationInfoWithFormData();
          this.openSnackBar('Saved!');
          this.isSubmitting = false;
        });
    }
  }
  submitExcavationDetails() {
    const body = {
      main_permit_id: this.applicationId,
      permit_type_id: 3,
      user_id: this.user.id,
      is_representative: this.exisitingApplicationInfo.is_representative,
      rol_status_id: this.exisitingApplicationInfo.rol_status_id,
      construction_status_id:
        this.exisitingApplicationInfo.construction_status_id,
      is_registered_owner: this.exisitingApplicationInfo.is_registered_owner,
      applicant_first_name:
        this.exisitingApplicationInfo.applicant_detail.first_name,
      applicant_middle_name:
        this.exisitingApplicationInfo.applicant_detail.middle_name,
      applicant_last_name:
        this.exisitingApplicationInfo.applicant_detail.last_name,
      applicant_suffix_name:
        this.exisitingApplicationInfo.applicant_detail.suffix_name,
      applicant_tin_number:
        this.exisitingApplicationInfo.applicant_detail.tin_number,
      applicant_contact_number:
        this.exisitingApplicationInfo.applicant_detail.contact_number,
      applicant_email_address:
        this.exisitingApplicationInfo.applicant_detail.email_address,
      applicant_house_number:
        this.exisitingApplicationInfo.applicant_detail.house_number,
      applicant_unit_number:
        this.exisitingApplicationInfo.applicant_detail.unit_number,
      applicant_floor_number:
        this.exisitingApplicationInfo.applicant_detail.floor_number,
      applicant_street_name:
        this.exisitingApplicationInfo.applicant_detail.street_name,
      applicant_barangay:
        this.exisitingApplicationInfo.applicant_detail.barangay,
      project_house_number:
        this.exisitingApplicationInfo.project_detail.house_number,
      project_lot_number:
        this.exisitingApplicationInfo.project_detail.lot_number,
      project_block_number:
        this.exisitingApplicationInfo.project_detail.block_number,
      project_street_name:
        this.exisitingApplicationInfo.project_detail.street_name,
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
      project_total_floor_area:
        this.exisitingApplicationInfo.project_detail.total_floor_area,
      project_units: this.exisitingApplicationInfo.project_detail.unit_number
        ? this.exisitingApplicationInfo.project_detail.unit_number
        : 0,
      project_number_of_storey: this.exisitingApplicationInfo.project_detail
        .number_of_storey
        ? this.exisitingApplicationInfo.project_detail.number_of_storey
        : 0,
      project_title: this.exisitingApplicationInfo.project_detail.project_title,
      project_cost_cap:
        this.exisitingApplicationInfo.project_detail.project_cost_cap,
      project_tct_number:
        this.exisitingApplicationInfo.project_detail.tct_number,
      project_tax_dec_number:
        this.exisitingApplicationInfo.project_detail.tax_dec_number,
      project_landmark: this.exisitingApplicationInfo.project_detail.landmark,
    };
    this.newApplicationService.submitApplication(body).subscribe((res) => {
      this.excavationId = res.data.id;
      localStorage.removeItem('application_details_for_excavation');
      this.fetchApplicationInfo();
    });
  }

  // ngAfterViewInit() {
  //   this.saveRoute();
  // }

  saveRoute() {
    const body = {
      user_id: this.user.id,
      application_id: this.excavationId
        ? this.excavationId
        : this.applicationId,
      url: '/dashboard/new/excavation-permit',
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
    if (this.applicationDetails) {
      return this.documentTypes[id - 1].name;
    }
  }

  initData() {
    for (let i = 0; i < this.forms.length; i++) {
      this.forms[i] = {
        label: `Step ${i + 1}`,
        id: this.forms[i].id,
        src: this.forms[i].src,
        description: this.getDocType(this.forms[i].id),
        path: '',
      };
    }
    for (let i = 0; i < this.renderFields.length; i++) {
      for (let j = 0; j < this.renderFields[i].documents.length; j++) {
        this.renderFields[i].documents[j] = {
          id: this.renderFields[i].documents[j],
          description: this.getDocType(this.renderFields[i].documents[j]),
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
          form.src = doc.document_path;
          form.path = doc.document_path;
          form.doc_id = doc.id;
        }
      });
    });
    this.renderFields.forEach((fieldSet) => {
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
          if (form.id == doctypeId) {
            form.path = path;
          }
        });
        this.renderFields.forEach((fieldSet) => {
          fieldSet.documents.forEach((field) => {
            if (field.id == doctypeId) field.path = path;
          });
        });
        this.updateFilePath();
      });
  }

  submitApplication() {
    if (this.dateService.isWeekend() === true) {
      this.openSnackBar('You can only submit applications on Weekdays.');
      this.isLoading = false;
    } else {
      if (environment.receiveApplications == true) {
        if (this.getFieldSetsLength() + 1 == this.getUniqueUserDocs()) {
          this.isLoading = true;
          const body = {
            application_status_id: 9,
          };
          this.applicationService
            .updateApplicationStatus(body, this.applicationId)
            .subscribe((res) => {
              this.isLoading = false;
              this.router.navigate([
                'dashboard/new/summary',
                this.applicationId,
              ]);
            });
        } else {
          this.openSnackBar('Please upload all necessary documents!');
        }
      } else {
        this.openSnackBar('Sorry, system is under maintenance.');
      }
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
