import { GetDateService } from './../../../core/services/get-date.service';
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
  selector: 'app-sign-permit',
  templateUrl: './sign-permit.component.html',
  styleUrls: ['./sign-permit.component.scss'],
})
export class SignPermitComponent implements OnInit {
  public isSubmitting: boolean = false;
  public user;
  public pdfSource;
  public formData;
  public applicationId;
  public applicationDetails;
  public isLoading: boolean = false;
  public isSignPermit;
  public forms: any = [
    {
      id: 108,
      src: '../../../../assets/forms/updated/version-3/Sign_Permit_Form_rev3.pdf',
    },
  ];

  public fieldSets: any = [
    {
      label: 'Step 2',
      title: 'Documentary Requirements',
      documents: [109, 111, 112, 46],
    },
    {
      label: 'Step 3',
      title: 'Plans, Specifications',
      documents: [114, 115, 116, 62],
    },
  ];

  public representativeDocs: Array<any> = [113];
  public lesseeDocs: Array<any> = [110];
  // public registeredDocs: Array<any> = [44];
  // public notRegisteredDocs: Array<any> = [120, 121];
  // public isWithinSubdivision: Array<any> = [72];
  // public isUnderMortgage: Array<any> = [73];
  public isOwnedByCorporation: Array<any> = [74];
  // public isHaveCoOwners: Array<any> = [75];
  // public if10000sqm: Array<any> = [40];

  constructor(
    private newApplicationService: NewApplicationService,
    private applicationService: ApplicationInfoService,
    private dataBindingService: DataFormBindingService,
    private router: Router,
    private snackBar: MatSnackBar,
    private NgxExtendedPdfViewerService: NgxExtendedPdfViewerService,
    private dateService: GetDateService
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
          this.saveRoute();
          this.isSignPermit = this.applicationDetails.user_docs.find(
            (e) => e.document_id == 108
          );

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
          isOwnedByCorporation
            ? this.fieldSets[0].documents.push(...this.isOwnedByCorporation)
            : null;
          isRepresentative
            ? this.fieldSets[0].documents.push(...this.representativeDocs)
            : null;
          isLessee
            ? this.fieldSets[0].documents.push(...this.lesseeDocs)
            : null;

          this.initData();
          if (!this.isSignPermit) {
            this.formData = this.dataBindingService.getFormData(
              this.applicationDetails
            );
            this.pdfSource = this.forms[0].src;
          }
          this.setFilePaths();
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
    if (!this.isSignPermit) {
      this.forms[index] ? (this.pdfSource = this.forms[index].src) : null;
    } else {
      this.pdfSource = this.isSignPermit.document_path;
    }
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
          form.doc_id = doc.id;
          form.is_applicable = doc.is_applicable;
          this.pdfSource = this.isSignPermit ? form.path : null;
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
  public async upload(form, type): Promise<void> {
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
            if (type == 'draft') {
              this.router.navigateByUrl('/dashboard/applications');
            } else {
              this.fetchApplicationInfo();
            }

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
          if (type == 'draft') {
            this.router.navigateByUrl('/dashboard/applications');
          } else {
            this.fetchApplicationInfo();
          }
          this.openSnackBar('Saved!');
        });
    }
  }

  fetchApplicationInfo() {
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        this.applicationDetails = res.data;
        this.openSnackBar('Saved!');
        this.setFilePaths();
        this.isLoading = false;
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
    if (this.dateService.isWeekend() === true) {
      this.openSnackBar('Please submit application during weekdays.');
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
