import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { DataFormBindingService } from 'src/app/core/services/data-form-binding.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
@Component({
  selector: 'app-fencing-permit',
  templateUrl: './fencing-permit.component.html',
  styleUrls: ['./fencing-permit.component.scss'],
})
export class FencingPermitComponent implements OnInit {
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
      id: 98,
      src: '../../../../assets/forms/fencing_permit.pdf',
    },
  ];

  public fieldSets: any = [
    {
      label: 'Step 2',
      documents: [],
    },
    {
      label: 'Step 3',
      documents: [51, 33, 8, 52, 53],
    },
    {
      label: 'Step 4',
      documents: [101],
    },
  ];

  public representativeDocs: Array<any> = [21];
  public lesseeDocs: Array<any> = [27];
  public registeredDocs: Array<any> = [26, 44];
  public notRegisteredDocs: Array<any> = [27, 23, 24];
  public isWithinSubdivision: Array<any> = [72];
  public isUnderMortgage: Array<any> = [73];
  public isOwnedByCorporation: Array<any> = [74];
  public isHaveCoOwners: Array<any> = [75];
  public isConstructionStatus: Array<any> = [37, 38];
  public if10000sqm: Array<any> = [40];

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
      this.documentTypes = res.data;
    });
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
              this.applicationDetails.is_owned_by_corporation == 1
                ? true
                : false;
            const isHaveCoOwners =
              this.applicationDetails.is_property_have_coowners == 1
                ? true
                : false;
            const isConstructionStatus =
              this.applicationDetails.construction_status_id == 1
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
              ? this.fieldSets[2].documents.push(...this.isWithinSubdivision)
              : null;
            isUnderMortgage
              ? this.fieldSets[2].documents.push(...this.isUnderMortgage)
              : null;
            isOwnedByCorporation
              ? this.fieldSets[2].documents.push(...this.isOwnedByCorporation)
              : null;
            isHaveCoOwners
              ? this.fieldSets[2].documents.push(...this.isHaveCoOwners)
              : null;
            isConstructionStatus
              ? null
              : this.fieldSets[0].documents.push(...this.isConstructionStatus);

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
    console.log(form);
    const blob = await this.NgxExtendedPdfViewerService.getCurrentDocumentAsBlob();
    if (!form.path) {
      if (blob) {
        console.log({ blob });
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
            this.updateFilePath();
          });
      } else {
        console.log('Blob failed');
      }
    } else {
      console.log('exists!');
      const uploadDocumentData = {
        document_status_id: 0,
      };
      if (blob) {
        uploadDocumentData['document_path'] = blob;
      }
      this.newApplicationService
        .updateDocumentFile(uploadDocumentData, form.doc_id)
        .subscribe((res) => {
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

  submitApplication() {
    console.log(this.getFieldSetsLength() + 1);
    console.log(this.applicationDetails.user_docs.length);
    if (
      this.getFieldSetsLength() + 1 ==
      this.applicationDetails.user_docs.length
    ) {
      this.isSubmitting = true;
      const data = {
        application_status_id: 7,
      };
      this.applicationService
        .updateApplicationStatus(data, this.applicationId)
        .subscribe((res) => {
          this.isSubmitting = true;
          this.router.navigate(['dashboard/new/summary', this.applicationId]);
          localStorage.removeItem('app_id');
          localStorage.removeItem('application_details_for_excavation');
        });
    } else {
      this.openSnackBar('Please upload all necessary documents!');
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
