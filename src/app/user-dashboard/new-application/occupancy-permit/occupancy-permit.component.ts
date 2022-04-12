import { GetDateService } from './../../../core/services/get-date.service';
import { documentTypes } from './../../../core/enums/document-type.enum';
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
  public documentTypes;
  public isOptional: boolean = false;
  public notReleasedBpFormData;
  public releasedBpFormData;
  public userDocs;
  public hasUploadedFile: boolean = false;
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
      id: 84,
      src: '../../../../assets/forms/updated/Certificate_of_Inspection_Mechanical_Installation_1.pdf',
    },
    // {
    //   id: 4,
    //   src: '../../../../assets/forms/updated/version-3/Eleectrical_Permit_Form_rev3.pdf',
    // },
  ];

  public fieldSets: any = [
    {
      label: '',
      title: 'Documentary Requirements',
      documents: [87],
    },
  ];

  public withOldBuildingPermit: Array<any> = [206, 88, 86];
  public withBuildpassBuildingPermit: Array<any> = [206];

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

          this.applicationDetails.user_docs.forEach((element) => {
            if (element.document_id == 81) {
              this.forms[0].src = element.document_path;
            } else if (element.document_id == 204) {
              this.forms[1].src = element.document_path;
            } else if (element.document_id == 83) {
              this.forms[2].src = element.document_path;
            } else if (element.document_id == 84) {
              this.forms[3].src = element.document_path;
            }
          });

          this.saveRoute();

          if (this.applicationDetails.associated_released_permits.length >= 1) {
            this.fieldSets[0].documents.push(...this.withOldBuildingPermit);
            // this.fieldSets.push({
            //   label: '',
            //   title: 'Approved Permits',
            //   documents: [4, 117, 199, 195, 140, 29, 115, 30],
            // });
            // this.fieldSets.push({
            //   label: '',
            //   title: 'Approved Building Plans',
            //   documents: [60, 63, 61, 167, 64, 65],
            // });

            this.fieldSets.push({
              label: '',
              title:
                'Professional Tax Receipt and Professional Regulations Commission ID',
              documents: [34, 35, 36, 196, 46, 47],
            });
            this.fieldSets.push({
              label: '',
              title: 'Other Requirements',
              documents: [202, 201, 14],
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
                this.initData();
                this.setFilePaths();
                this.pdfSource = this.forms[0].src;
              });
          } else {
            this.formData = this.dataBindingService.getFormData(
              this.applicationDetails
            );
            this.initData();
            this.setFilePaths();
            this.pdfSource = this.forms[0].src;
          }
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
    // this.forms[index] ? (this.pdfSource = this.forms[index].src) : null;
    this.pdfSource = this.forms[index].src;
    pdfContainer ? pdfContainer.appendChild(pdfViewer) : null;
  }

  getDocType(id): string {
    // const array = [4, 117, 199, 60, 63, 61, 167, 64, 65, 195];
    // if (array.includes(id)) {
    //   return `Approved ${documentTypes[id]}`.replace('Form', '');
    // } else {
    //   return documentTypes[id];
    // }
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
        is_applicable: 0,
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
          form.src = doc.document_path;
          form.path = doc.document_path;
          form.doc_id = doc.id;
          form.is_applicable = doc.is_applicable;
          // this.pdfSource = doc.document_path ? doc.document_path : form.src;
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
              if (
                this.applicationDetails.associated_released_permits.length >= 1
              ) {
                const oldBpDocs = [
                  125, 177, 212, 4, 117, 199, 195, 140, 29, 115, 30, 63, 61,
                  167, 64, 65, 216, 50, 43, 26, 59, 62,
                ];
                //OLD BPS
                var count = 0;
                var bar = new Promise<void>((resolve, reject) => {
                  oldBpDocs.forEach((element, index, array) => {
                    this.isLoading = true;
                    const uploadDoc = {
                      application_id: this.applicationId,
                      user_id: this.user.id,
                      document_id: element,
                      document_path:
                        'https://s3-ap-southeast-1.amazonaws.com/buildpass-storage/oCgTXNEEiktYux44i1cJCkNCiREKA5ABlOYeeUSC.pdf',
                      is_document_string: 1,
                    };
                    this.newApplicationService
                      .submitDocument(uploadDoc)
                      .subscribe((res) => {
                        count = count + 1;
                        if (count === array.length - 1) {
                          this.isLoading = false;
                          this.router.navigate([
                            'dashboard/new/summary',
                            this.applicationId,
                          ]);
                        }
                      });
                  });
                });
              } else {
                const releasedBpDocs = [
                  125, 177, 212, 4, 117, 199, 195, 140, 29, 115, 30, 63, 61,
                  167, 64, 65, 216, 194, 50, 43, 26, 59, 62,
                ];
                let docs = [];
                let count = 0;
                const existingDocs =
                  this.linkedBuildingPermitDetails.user_docs.forEach(
                    (element) => {
                      const requiredDoc = releasedBpDocs.find(
                        (e) => e == element.document_id
                      );
                      if (requiredDoc && element.is_applicable !== 2) {
                        docs.push(element);
                      }
                      count = count + 1;
                    }
                  );
                if (
                  count == this.linkedBuildingPermitDetails.user_docs.length
                ) {
                  let count2 = 0;
                  const upload = docs.forEach((doc) => {
                    this.isSubmitting = true;
                    const uploadDoc = {
                      application_id: this.applicationId,
                      user_id: this.user.id,
                      document_id: doc.document_id,
                      document_path: doc.document_path,
                      is_document_string: 1,
                    };
                    this.newApplicationService
                      .submitDocument(uploadDoc)
                      .subscribe((res) => {
                        count2 = count2 + 1;
                        if (count2 == docs.length) {
                          this.isSubmitting = false;
                          this.router.navigate([
                            'dashboard/new/summary',
                            this.applicationId,
                          ]);
                        }
                      });
                  });
                }
              }
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

  onToggleChange(e, form) {
    console.log(form);
    if (e.checked == true) {
      this.submitNotApplicable(form);
    } else {
      this.submitApplicable(form);
    }
  }

  async submitNotApplicable(form) {
    console.log(form);
    const blob =
      await this.NgxExtendedPdfViewerService.getCurrentDocumentAsBlob();
    if (blob) {
      this.isLoading = true;
      const uploadDocumentData = {
        application_id: this.applicationId,
        user_id: this.user.id,
        document_id: form.id,
        document_path: blob,
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
          this.fetchApplicationInfo();
        });
    }
    this.isOptional = false;
  }

  async submitApplicable(form) {
    console.log(form);
    const blob =
      await this.NgxExtendedPdfViewerService.getCurrentDocumentAsBlob();
    if (blob) {
      this.isLoading = true;
      const uploadDocumentData = {
        application_id: this.applicationId,
        user_id: this.user.id,
        document_id: form.id,
        document_path: blob,
        document_status_id: 0,
        is_applicable: 1,
        receiving_status_id: 0,
        cbao_status_id: 0,
        bfp_status_id: 0,
        cepmo_status_id: 0,
      };

      this.newApplicationService
        .submitDocument(uploadDocumentData)
        .subscribe((res) => {
          this.fetchApplicationInfo();
        });
    }
    this.isOptional = false;
  }
}
