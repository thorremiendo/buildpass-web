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
  selector: 'app-fencing-permit',
  templateUrl: './fencing-permit.component.html',
  styleUrls: ['./fencing-permit.component.scss'],
})
export class FencingPermitComponent implements OnInit {
  public isSubmitting: boolean = false;
  public user;
  public pdfSource;
  public noticeSource;
  public formData;
  public applicationId;
  public applicationDetails;
  public documentTypes;
  public isLoading: boolean = false;
  public hasFencingPermit;
  public hasNotice;
  public currentIndex;
  public forms: any = [
    {
      id: 98,
      src: '../../../../assets/forms/updated/version-3/Fencing_Permit_rev3.pdf',
    },
    {
      id: 48,
      src: '../../../../assets/forms/updated/notice_of_construction.pdf',
    },
  ];

  public fieldSets: any = [
    {
      label: 'Step 3',
      title: 'Documentary Requirements',
      documents: [26, 104, 54, 233],
    },
    {
      label: 'Step 4',
      title: 'Plans, Specifications',
      documents: [51, 33, 8, 52, 53, 101],
    },
    {
      label: 'Step 5',
      title:
        'Photocopy of Professional Details (Professional Tax Receipt and Professional Regulations Commission ID, signed and sealed)',
      documents: [34],
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
          // this.formData = this.dataBindingService.getFormData(
          //   this.applicationDetails
          // );
          this.hasFencingPermit = this.applicationDetails.user_docs.find(
            (e) => e.document_id == 98
          );
          this.hasNotice = this.applicationDetails.user_docs.find(
            (e) => e.document_id == 48
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
            ? this.fieldSets[0].documents.push(...this.isWithinSubdivision)
            : null;
          isUnderMortgage
            ? this.fieldSets[0].documents.push(...this.isUnderMortgage)
            : null;
          isOwnedByCorporation
            ? this.fieldSets[0].documents.push(...this.isOwnedByCorporation)
            : null;
          isHaveCoOwners
            ? this.fieldSets[0].documents.push(...this.isHaveCoOwners)
            : null;

          this.initData();
          if (!this.hasFencingPermit) {
            this.formData = this.dataBindingService.getFormData(
              this.applicationDetails
            );
            this.pdfSource = this.forms[0].src;
          }
          // if (!this.hasNotice) {
          //   this.formData = this.dataBindingService.getFormData(
          //     this.applicationDetails
          //   );
          //   this.noticeSource = this.forms[1].src;
          // }
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
      url: '/dashboard/new/fencing-permit',
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
    this.currentIndex = index;
    const pdfViewer = document.getElementById('pdf-viewer');
    const pdfContainer = document.getElementById(`form-${index}`);
    if (index == 0) {
      if (!this.hasFencingPermit) {
        this.forms[0] ? (this.pdfSource = this.forms[0].src) : null;
      } else {
        this.pdfSource = this.hasFencingPermit.document_path;
      }
    } else if (index == 1) {
      if (!this.hasNotice) {
        this.forms[1] ? (this.pdfSource = this.forms[1].src) : null;
      } else {
        this.pdfSource = this.hasNotice.document_path;
      }
    }

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
          form.doc_id = doc.id;
          form.is_applicable = doc.is_applicable;
          if (form.id == 98) {
            this.hasFencingPermit = doc;
          } else if (form.id == 48) {
            this.hasNotice = doc;
          }
          if (form.id == 98 && this.currentIndex !== 1) {
            this.pdfSource = this.hasFencingPermit ? form.path : null;
          } else if (form.id == 48 && this.currentIndex == 1) {
            this.pdfSource = this.hasNotice ? form.path : null;
          }
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
            // this.updateApplicationInfoWithFormData();
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
          // this.updateApplicationInfoWithFormData();
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
        if (this.getFieldSetsLength() + 2 == this.getUniqueUserDocs()) {
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
