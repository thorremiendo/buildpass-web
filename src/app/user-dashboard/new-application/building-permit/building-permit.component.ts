import { Component, OnInit } from '@angular/core';
import { Router, Data } from '@angular/router';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { DataFormBindingService } from 'src/app/core/services/data-form-binding.service';
import { documentTypes } from '../../../core/enums/document-type.enum';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-building-permit',
  templateUrl: './building-permit.component.html',
  styleUrls: ['./building-permit.component.scss'],
})
export class BuildingPermitComponent implements OnInit {
  public user;
  public pdfSource;
  public formData;
  public applicationId;
  public applicationDetails;
  public isLoading: boolean = true;
  public zoningFormData;
  public buildingFormData;
  public sanitaryFormData;
  public noticeOfConstructionFormData;
  public electricalFormData;

  public forms: any = [
    {
      id: 1,
      src:
        '../../../../assets/forms/Application_Form_for_Certificate_of_Zoning_Compliance.pdf',
      label: 'Step 1',
    },
    {
      id: 2,
      src:
        '../../../../assets/forms/Unified_Application_for_Building_Permit.pdf',
      label: 'Step 2',
    },
    {
      id: 3,
      src: '../../../../assets/forms/Sanitary_Plumbing_Permit.pdf',
      label: 'Step 3',
    },
    {
      id: 48,
      src: '../../../../assets/forms/Notice_of_Construction.pdf',
      label: 'Step 4',
    },
    {
      id: 4,
      src: '../../../../assets/forms/Electrical_Permit.pdf',
      label: 'Step 5',
    },
  ];

  public fieldSets: any = [
    {
      label: 'Step 6',
      title: 'Documentary Requirements',
      documents: [23, 24, 25],
    },
    {
      label: 'Step 7',
      title: 'Design Analysis',
      documents: [29, 30, 31, 32, 33],
    },
    {
      label: 'Step 8',
      title: 'Building Plans',
      documents: [59, 61, 63, 62, 64],
    },
    {
      label: 'Step 9',
      title:
        'Professional Tax Receipt and Professional Regulations Commission ID',
      documents: [34, 35, 36, 47, 46],
    },
    {
      label: 'Step 10',
      title: 'Other Requirements',
      documents: [39, 41, 42],
    },
  ];

  public representativeDocs: Array<any> = [21];
  public lesseeDocs: Array<any> = [27, 26];
  public registeredDocs: Array<any> = [26];
  public notRegisteredDocs: Array<any> = [103, 26];
  public isOwnerNotRegisteredDocs: Array<any> = [103];
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
    this.newApplicationService.applicationId
      .asObservable()
      .subscribe((applicationId) => {
        if (applicationId) this.applicationId = applicationId;
        else this.applicationId = localStorage.getItem('app_id');

        this.applicationService
          .fetchApplicationInfo(this.applicationId)
          .subscribe((res) => {
            this.applicationDetails = res.data;
            console.log(this.applicationDetails);
            this.zoningFormData = this.dataBindingService.getFormData(
              this.applicationDetails
            );
            this.formData = this.zoningFormData;
            console.log('ZONING', this.zoningFormData);
            this.buildingFormData = this.dataBindingService.getFormData(
              this.applicationDetails
            );
            console.log('BLDG', this.buildingFormData);
            this.sanitaryFormData = this.dataBindingService.getFormData(
              this.applicationDetails
            );
            this.electricalFormData = this.dataBindingService.getFormData(
              this.applicationDetails
            );

            const isRepresentative =
              this.applicationDetails.is_representative == 1 ? true : false;
            const isLessee =
              this.applicationDetails.rol_status_id == 2 ? true : false;
            const isRegisteredOwner =
              this.applicationDetails.is_registered_owner == 1 ? true : false;
            const isNotRegisteredOwner =
              this.applicationDetails.is_registered_owner == 2 ? true : false;
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

            if10000sqm
              ? this.fieldSets[4].documents.push(...this.if10000sqm)
              : null;
            isRepresentative
              ? this.fieldSets[0].documents.push(...this.representativeDocs)
              : null;
            isLessee
              ? this.fieldSets[0].documents.push(...this.lesseeDocs)
              : null;
            isRegisteredOwner
              ? this.fieldSets[0].documents.push(...this.registeredDocs)
              : null;
            isNotRegisteredOwner
              ? this.fieldSets[0].documents.push(...this.notRegisteredDocs)
              : null;
            isWithinSubdivision
              ? this.fieldSets[4].documents.push(...this.isWithinSubdivision)
              : null;
            isUnderMortgage
              ? this.fieldSets[4].documents.push(...this.isUnderMortgage)
              : null;
            isOwnedByCorporation
              ? this.fieldSets[4].documents.push(...this.isOwnedByCorporation)
              : null;
            isHaveCoOwners
              ? this.fieldSets[4].documents.push(...this.isHaveCoOwners)
              : null;
            isConstructionStatus
              ? null
              : this.fieldSets[0].documents.push(...this.isConstructionStatus);

            this.initData();
            this.setFilePaths();
            this.pdfSource = this.forms[0].src;
          });
      });
    this.isLoading = false;
  }

  ngAfterViewInit() {
    this.saveRoute();
  }

  fetchApplicationInfo() {
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        this.applicationDetails = res.data;
        this.openSnackBar('Uploaded!');
        this.setFilePaths();
      });
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
    this.checkExistingZoningFormData();
    const index = event.selectedIndex;
    const pdfViewer = document.getElementById('pdf-viewer');
    const pdfContainer = document.getElementById(`form-${index}`);
    this.forms[index] ? (this.pdfSource = this.forms[index].src) : null;
    this.forms[0] ? (this.formData = this.zoningFormData) : null;
    this.forms[1] ? (this.formData = this.buildingFormData) : null;
    this.forms[2] ? (this.formData = this.sanitaryFormData) : null;
    this.forms[3] ? (this.formData = this.noticeOfConstructionFormData) : null;
    this.forms[4] ? (this.formData = this.electricalFormData) : null;
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
          form.src = doc.document_path;
          form.path = doc.document_path;
          form.doc_id = doc.id;
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
    this.isLoading = true;
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
        this.fetchApplicationInfo();
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
    console.log(this.getFieldSetsLength() + 5);
    console.log(this.applicationDetails.user_docs.length);
    if (
      this.getFieldSetsLength() + 5 ==
      this.applicationDetails.user_docs.length
    ) {
      this.isLoading = true;
      const body = {
        application_status_id: 7,
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
  }
  checkExistingZoningFormData() {
    this.applicationService
      .fetchZoningFormData(this.applicationId)
      .subscribe((res) => {
        if (res.data.length !== 0) {
          this.zoningFormData = res.data;
        }
        console.log(this.zoningFormData);
      });
  }
  public async upload(form): Promise<void> {
    const data =
      form.id == 1
        ? this.zoningFormData
        : form.id == 2
        ? this.buildingFormData
        : form.id == 3
        ? this.sanitaryFormData
        : form.id == 4
        ? this.noticeOfConstructionFormData
        : this.electricalFormData;

    const blob = await this.NgxExtendedPdfViewerService.getCurrentDocumentAsBlob();
    this.dataBindingService.handleSaveFormData(
      this.applicationId,
      form.id,
      data
    );
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
            this.fetchApplicationInfo();
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

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
