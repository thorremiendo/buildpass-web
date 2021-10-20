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
  selector: 'app-cfei-permit',
  templateUrl: './cfei-permit.component.html',
  styleUrls: ['./cfei-permit.component.scss'],
})
export class CfeiPermitComponent implements OnInit {
  public isSubmitting: boolean = false;
  public user;
  public pdfSource;
  public formData;
  public applicationId;
  public applicationDetails;
  public isLoading: boolean = false;

  public forms: any = [];

  public fieldSets: any = [
    {
      label: 'Step 2',
      title: 'Documentary Requirements',
      documents: [],
    },
  ];

  public isAffectedByFire: Array<any> = [189];
  public isAffectedByCalamity: Array<any> = [190];

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
          const isFire =
            this.applicationDetails.is_affected_by_fire == 1 ? true : false;
          const isCalamity =
            this.applicationDetails.is_affected_by_calamities == 1
              ? true
              : false;
          isFire
            ? this.fieldSets[0].documents.push(...this.isAffectedByFire)
            : null;
          isCalamity
            ? this.fieldSets[0].documents.push(...this.isAffectedByCalamity)
            : null;
          switch (this.applicationDetails.sub_permit_type_id) {
            case 1:
              this.forms.push(
                {
                  id: 166,
                  src: '../../../../assets/forms/updated/Certificate_of_Electrical_Inspection_for_Temporary_Power_Connection_E-04.pdf',
                  label: 'Step 1',
                },
                {
                  id: 167,
                  src: '../../../../assets/forms/updated/FORM_E-03Temporary_Service_Connection_Permit.pdf',
                  label: 'Step 2',
                }
              );
              this.fieldSets[0].documents.push(168, 169, 170, 171, 172, 173);
              break;
            case 2:
              this.forms.push({
                id: 174,
                src: '../../../../assets/forms/updated/Certificate_of_Final_Electrical_Inspection_E-05.pdf',
              });
              this.fieldSets[0].documents.push(175, 176, 170, 178, 172, 173);
              break;
            case 3:
              this.forms.push({
                id: 174,
                src: '../../../../assets/forms/updated/Certificate_of_Final_Electrical_Inspection_E-05.pdf',
              });
              this.fieldSets[0].documents.push(182, 170, 178, 172, 195, 187);
              break;
            case 4:
              this.forms.push({
                id: 174,
                src: '../../../../assets/forms/updated/Certificate_of_Final_Electrical_Inspection_E-05.pdf',
              });
              this.fieldSets[0].documents.push(191, 170, 178, 172, 195);
              break;
            case 5:
              this.forms.push({
                id: 174,
                src: '../../../../assets/forms/updated/Certificate_of_Final_Electrical_Inspection_E-05.pdf',
              });
              this.fieldSets[0].documents.push(197, 170, 178, 172, 195, 187);
              break;
            default:
              break;
          }

          this.saveRoute();
          this.formData = this.dataBindingService.getFormData(
            this.applicationDetails
          );

          this.initData();
          this.setFilePaths();
          this.pdfSource = this.forms[0].src;
        });
    });
  }

  // ngAfterViewInit() {
  //   this.saveRoute();
  // }

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
    return documentTypes[id];
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
      if (this.getFieldSetsLength() + 1 == this.getUniqueUserDocs()) {
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
}
