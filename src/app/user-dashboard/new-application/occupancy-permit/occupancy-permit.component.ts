import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { DataFormBindingService } from 'src/app/core/services/data-form-binding.service';
import { documentTypes } from '../../../core/enums/document-type.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-occupancy-permit',
  templateUrl: './occupancy-permit.component.html',
  styleUrls: ['./occupancy-permit.component.scss'],
})
export class OccupancyPermitComponent implements OnInit {
  public user;
  public pdfSource;
  public formData;
  public applicationId;
  public applicationDetails;
  public isLoading: boolean = false;
  public isSubmitting: boolean = false;

  public forms: any = [
    {
      id: 81,
      src: '../../../../assets/forms/occupancy_application_form.pdf',
    },
  ];

  public fieldSets: any = [
    {
      label: '1',
      documents: [77, 82, 83, 84],
    },
    {
      label: '2',
      documents: [89, 86, 87],
    },
    {
      label: '3',
      documents: [47, 21, 88],
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
            this.pdfSource = this.forms[0].src;
          });
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
        label: `Step ${i + 1}`,
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

  public async upload(form): Promise<void> {
    const blob = await this.NgxExtendedPdfViewerService.getCurrentDocumentAsBlob();
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

  submitApplication() {
    this.router.navigate(['dashboard/new/summary', this.applicationId]);
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
