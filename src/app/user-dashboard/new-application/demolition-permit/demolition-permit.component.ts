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

@Component({
  selector: 'app-demolition-permit',
  templateUrl: './demolition-permit.component.html',
  styleUrls: ['./demolition-permit.component.scss'],
})
export class DemolitionPermitComponent implements OnInit {
  public isSubmitting: boolean = false;
  public user;
  public pdfSource;
  public formData;
  public applicationId;
  public applicationDetails;
  public documentTypes;
  public isLoading: boolean = false;

  public forms: any = [
    {
      id: 99,
      src: '../../../../assets/forms/updated/version-3/Demoltion_Permit_rev3.pdf',
    },
  ];

  public fieldSets: any = [
    {
      label: 'Step 2',
      title: 'Documentary Requirements',
      documents: [26, 104],
    },
    {
      label: 'Step 3',
      title: 'Plans, Specifications',
      documents: [8, 55, 56, 102, 105],
    },
    {
      label: 'Step 4',
      title:
        'Photocopy of Professional Details (Professional Tax Receipt and Professional Regulations Commission ID, signed and sealed)',
      documents: [34],
    },
    {
      label: 'Step 5',
      title: 'Other Requirements',
      documents: [42, 39],
    },
  ];

  public representativeDocs: Array<any> = [21];
  public lesseeDocs: Array<any> = [27];
  public registeredDocs: Array<any> = [26, 44];
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
    private snackBar: MatSnackBar,
    private NgxExtendedPdfViewerService: NgxExtendedPdfViewerService,
    private dateService: GetDateService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.newApplicationService.fetchDocumentTypes().subscribe((res) => {
      this.documentTypes = res.data;
      this.applicationId = localStorage.getItem('app_id');
      this.applicationService
        .fetchApplicationInfo(this.applicationId)
        .subscribe((res) => {
          this.applicationDetails = res.data;
          this.saveRoute();
          this.formData = this.dataBindingService.getFormData(
            this.applicationDetails
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
            ? this.fieldSets[2].documents.push(...this.if10000sqm)
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
      url: '/dashboard/new/demolition-permit',
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
    return this.documentTypes[id - 1].name;
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
