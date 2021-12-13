import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { DataFormBindingService } from 'src/app/core/services/data-form-binding.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { environment } from './../../../../environments/environment';
import { documentTypes } from '../../../core/enums/document-type.enum';

@Component({
  selector: 'app-occupancy-permit',
  templateUrl: './occupancy-permit.component.html',
  styleUrls: ['./occupancy-permit.component.scss'],
})
export class OccupancyPermitComponent implements OnInit {
  public isSubmitting: boolean = false;
  public user;
  public pdfSource;
  public formData;
  public applicationId;
  public applicationDetails;
  public linkedBuildingPermitDetails;
  public isLoading: boolean = false;

  public forms: any = [
    {
      id: 81,
      src: '../../../../assets/forms/updated/Unified_Application_Form_for__Certificate_of_Occupancy_edited_02182020.pdf',
    },
    {
      id: 204,
      src: '../../../../assets/forms/updated/Certificate_of_Completion.pdf',
    },
    {
      id: 83,
      src: '../../../../assets/forms/updated/Certificate_of_Final_Electrical_Inspection_E-05.pdf',
    },
    {
      id: 82,
      src: '../../../../assets/forms/updated/Certificate_of_Sanitary_-_Plumbing_Inspection.pdf',
    },
  ];

  public fieldSets: any = [
    {
      label: '',
      title: 'Documentary Requirements',
      documents: [],
    },
  ];

  public withOldBuildingPermit: Array<any> = [125, 206, 84, 88, 173, 203, 212];
  public withBuildpassBuildingPermit: Array<any> = [203, 206];

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
    this.newApplicationService.fetchDocumentTypes().subscribe((res) => {
      // this.documentTypes = res.data;
      this.applicationId = localStorage.getItem('app_id');
      this.applicationService
        .fetchApplicationInfo(this.applicationId)
        .subscribe((res) => {
          this.applicationDetails = res.data;

          console.log(this.applicationDetails);
          if (this.applicationDetails.old_permit_number) {
            this.applicationService
              .fetchApplicationInfoByAPn(
                this.applicationDetails.old_permit_number
              )
              .subscribe((res) => {
                this.linkedBuildingPermitDetails = res.data[0];
                console.log('linked', this.linkedBuildingPermitDetails);
                this.formData = this.dataBindingService.getFormData(
                  this.linkedBuildingPermitDetails
                );
              });
          } else {
            this.formData = this.dataBindingService.getFormData(
              this.applicationDetails
            );
          }
          this.saveRoute();

          if (this.applicationDetails.associated_released_permits.length >= 1) {
            this.fieldSets[0].documents.push(...this.withOldBuildingPermit);
            this.fieldSets.push({
              label: '',
              title: 'Approved Permits',
              documents: [4, 117, 199, 195],
            });
            this.fieldSets.push({
              label: '',
              title: 'Approved Building Plans',
              documents: [60, 63, 59, 167, 64, 65],
            });

            this.fieldSets.push({
              label: '',
              title:
                'Professional Tax Receipt and Professional Regulations Commission ID',
              documents: [34, 35, 36, 196, 46, 47],
            });
            this.fieldSets.push({
              label: '',
              title: 'Other Requirements',
              documents: [202, 14, 201, 216],
            });
          } else {
            this.fieldSets[0].documents.push(
              ...this.withBuildpassBuildingPermit
            );
            this.fieldSets.push({
              label: '',
              title: 'Other Requirements',
              documents: [201, 202],
            });
          }
          this.initData();
          this.setFilePaths();
          this.pdfSource = this.forms[0].src;
        });
    });
  }

  // ngAfterViewInit() {
  //   this.saveRoute();
  // }
  fetchApplicationInfo() {
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        this.applicationDetails = res.data;
        this.formData = this.dataBindingService.getFormData(
          this.applicationDetails
        );
        this.openSnackBar('Saved!');
        this.setFilePaths();
        this.isLoading = false;
      });
  }
  saveRoute() {
    const body = {
      user_id: this.user.id,
      application_id: this.applicationId,
      url: '/dashboard/new/sign-permit',
    };

    this.newApplicationService.saveAsDraft(body).subscribe((res) => {});
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

  initPdfViewer(event) {
    const index = event.selectedIndex;
    const pdfViewer = document.getElementById('pdf-viewer');
    const pdfContainer = document.getElementById(`form-${index}`);
    this.forms[index] ? (this.pdfSource = this.forms[index].src) : null;
    pdfContainer ? pdfContainer.appendChild(pdfViewer) : null;
  }

  getDocType(id): string {
    const array = [4, 117, 199, 60, 63, 59, 167, 64, 65, 195];
    if (array.includes(id)) {
      return `Approved ${documentTypes[id]}`.replace('Form', '');
    } else {
      return documentTypes[id];
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
    for (let i = 0; i < this.fieldSets.length; i++) {
      this.fieldSets[i] = {
        label: `Step ${this.getFormsLength() + i + 1}`,
        title: this.fieldSets[i].title,
        documents: this.fieldSets[i].documents,
      };
      for (let j = 0; j < this.fieldSets[i].documents.length; j++) {
        this.fieldSets[i].documents[j] = {
          id: this.fieldSets[i].documents[j],
          description: this.getDocType(this.fieldSets[i].documents[j]),
          path: '',
        };
      }
    }
  }

  getFormsLength() {
    return this.forms.length;
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
  public async upload(form): Promise<void> {
    const blob =
      await this.NgxExtendedPdfViewerService.getCurrentDocumentAsBlob();
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
            this.updateApplicationInfoWithFormData();
            this.updateFilePath();
          });
      } else {
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
        });
    }
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

        this.updateFilePath();
      });
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
  getFieldSetsLength() {
    const length = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    Object.keys(this.fieldSets).forEach((element) => {
      length.push(this.fieldSets[element].documents.length);
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

  submitApplication() {
    // if (this.getFieldSetsLength() + 1 == this.getUniqueUserDocs()) {
    //   this.isSubmitting = true;
    //   const data = {
    //     application_status_id: 9,
    //   };
    //   this.applicationService
    //     .updateApplicationStatus(data, this.applicationId)
    //     .subscribe((res) => {
    //       this.isSubmitting = true;
    //       this.router.navigate(['dashboard/new/summary', this.applicationId]);
    //       localStorage.removeItem('app_id');
    //       localStorage.removeItem('application_details_for_excavation');
    //     });
    // } else {
    //   this.openSnackBar('Please upload all necessary documents!');
    // }
    if (environment.receiveApplications == true) {
      if (
        this.getFieldSetsLength() + this.getFormsLength() ==
        this.getUniqueUserDocs()
      ) {
        this.isLoading = true;
        const body = {
          application_status_id: 9,
        };
        this.applicationService
          .updateApplicationStatus(body, this.applicationId)
          .subscribe((res) => {
            this.isLoading = false;
            this.router.navigate(['dashboard/new/summary', this.applicationId]);
          });
      } else {
        this.openSnackBar('Please upload all necessary documents!');
      }
    } else {
      this.openSnackBar('Sorry, system is under maintenance.');
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  submitNotApplicableDocument(file: File, doctypeId: string) {
    this.isLoading = true;
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.user.id,
      document_id: doctypeId,
      document_path: file,
      document_status_id: 1,
      is_applicable: 2,
      receiving_status_id: 1,
      cbao_status_id: 1,
      bfp_status_id: 1,
      cepmo_status_id: 1,
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
        this.fetchApplicationInfo();
      });
  }
}
