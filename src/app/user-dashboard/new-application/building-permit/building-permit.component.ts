import { environment } from './../../../../environments/environment';
import { GetDateService } from './../../../core/services/get-date.service';
import { Component, OnInit } from '@angular/core';
import { Router, Data } from '@angular/router';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { DataFormBindingService } from 'src/app/core/services/data-form-binding.service';
import { documentTypes } from '../../../core/enums/document-type.enum';
import { documentInfo } from '../../../core/enums/document-info.enum';
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
  public situationalReportFormData;
  public sampleForm;
  public forms: any = [
    {
      id: 1,
      src: '../../../../assets/forms/updated/Application_Form_for_Certificate_of_Zoning_Compliance.pdf',
      label: 'Step 1',
      sample:
        '../../../../assets/forms/sample/Zoning_Clearance_Form_4.07.21_PM.png',
    },
    {
      id: 2,
      src: '../../../../assets/forms/updated/Unified_Application_for_Bldg_Permit.pdf',
      label: 'Step 2',
      sample: '../../../../assets/forms/sample/Unified_Building_Front.png',
    },
    {
      id: 3,
      src: '../../../../assets/forms/updated/Sanitary-Plumbing_Permit_(BUILDING_PERMIT)_(1).pdf',
      label: 'Step 3',
      sample: '../../../../assets/forms/sample/Sanitary_Permit.png',
    },
    {
      id: 4,
      src: '../../../../assets/forms/updated/Electrical_Permit_(for_building_permit).pdf',
      label: 'Step 4',
      sample: '../../../../assets/forms/sample/Electrical.png',
    },
    {
      id: 106,
      src: '../../../../assets/forms/updated/situational_report.pdf',
      label: 'Step 5',
      sample: '../../../../assets/forms/sample/Situational.png',
    },
  ];

  public fieldSets: any = [
    {
      label: `Step ${this.forms.length + 12323}`,
      title: 'Documentary Requirements',
      documents: [26, 23, 24, 25],
    },
    {
      label: `Step ${this.forms.length + 2}`,
      title: 'Plans',
      documents: [59, 61, 63, 62, 104],
    },
    {
      label: `Step ${this.forms.length + 3}`,
      title: 'Designs, Specifications, Cost Estimate',
      documents: [30, 32, 33],
    },
    {
      label: `Step ${this.forms.length + 4}`,
      title:
        'Professional Tax Receipt and Professional Regulations Commission ID',
      documents: [34, 35, 36, 46],
    },
    {
      label: `Step ${this.forms.length + 5}`,
      title: 'Other Requirements',
      documents: [39],
    },
  ];

  public lesseeDocs: Array<any> = [27];
  public registeredDocs: Array<any> = [];
  public notRegisteredDocs: Array<any> = [103];
  public isWithinSubdivision: Array<any> = [72];
  public isUnderMortgage: Array<any> = [73];
  public isOwnedByCorporation: Array<any> = [74];
  public isHaveCoOwners: Array<any> = [75];
  public isConstructionStatus: Array<any> = [37, 38];
  public if10000sqm: Array<any> = [40];
  public is3storeysOrMore: Array<any> = [31];
  public ifFloorArea20sqmOrMore: Array<any> = [29];
  public isNotAsBuilt: Array<any> = [42];
  public isEnginnerArchictect: Array<any> = [21];
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
    this.applicationId = localStorage.getItem('app_id');

    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        this.applicationDetails = res.data;
        console.log(this.applicationDetails);
        this.saveRoute();
        this.zoningFormData = this.dataBindingService.getFormData(
          this.applicationDetails
        );
        this.formData = this.zoningFormData;
        this.buildingFormData = this.dataBindingService.getFormData(
          this.applicationDetails
        );
        this.sanitaryFormData = this.dataBindingService.getFormData(
          this.applicationDetails
        );
        this.electricalFormData = this.dataBindingService.getFormData(
          this.applicationDetails
        );
        this.noticeOfConstructionFormData = this.dataBindingService.getFormData(
          this.applicationDetails
        );
        this.situationalReportFormData = this.dataBindingService.getFormData(
          this.applicationDetails
        );

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
          this.applicationDetails.is_owned_by_corporation == 1 ? true : false;
        const isHaveCoOwners =
          this.applicationDetails.is_property_have_coowners == 1 ? true : false;
        const isConstructionStatus =
          this.applicationDetails.construction_status_id == 1 ? true : false;
        const if10000sqm =
          this.applicationDetails.project_detail.total_floor_area >= 10000
            ? true
            : false;
        const isOccupancyCommercial =
          this.applicationDetails.occupancy_classification_id !== 1
            ? true
            : false;
        const is3storeysOrMore =
          this.applicationDetails.project_detail.number_of_storey >= 3
            ? true
            : false;
        const ifFloorArea20sqmOrMore =
          this.applicationDetails.project_detail.total_floor_area > 20
            ? true
            : false;
        const isNoAsBuilt =
          this.applicationDetails.construction_status_id !== 3 ? true : false;
        const isEngineerArchitect =
          this.applicationDetails.is_representative == 1 ? true : false;
        isNoAsBuilt
          ? this.fieldSets[4].documents.push(...this.isNotAsBuilt)
          : null;
        if10000sqm
          ? this.fieldSets[4].documents.push(...this.if10000sqm)
          : null;
        isLessee ? this.fieldSets[0].documents.push(...this.lesseeDocs) : null;
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
          ? this.updateForms()
          : this.fieldSets[0].documents.push(...this.isConstructionStatus);
        isOccupancyCommercial ? this.fieldSets[3].documents.push(47) : null;
        isOccupancyCommercial ? this.fieldSets[1].documents.push(64) : null;
        isOccupancyCommercial ? this.fieldSets[1].documents.push(65) : null;
        is3storeysOrMore
          ? this.fieldSets[2].documents.push(...this.is3storeysOrMore)
          : null;
        ifFloorArea20sqmOrMore
          ? this.fieldSets[2].documents.push(...this.ifFloorArea20sqmOrMore)
          : null;
        // isEngineerArchitect
        //   ? this.fieldSets[4].documents.push(...this.isEnginnerArchictect)
        //   : null;
        this.initData();
        this.setFilePaths();
        this.pdfSource = this.forms[0].src;
        this.sampleForm = this.forms[0].sample;
      });

    this.isLoading = false;
  }

  updateForms() {
    this.forms.push({
      id: 48,
      src: '../../../../assets/forms/updated/notice_of_construction.pdf',
      label: 'Step 6',
      sample: '',
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
        this.openSnackBar('Uploaded!');
        this.setFilePaths();
      });
  }

  saveRoute() {
    const body = {
      user_id: this.user.id,
      application_id: this.applicationId,
      url: '/dashboard/new/building-permit',
    };
    this.newApplicationService.saveAsDraft(body).subscribe((res) => {});
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
        sample: this.forms[i].sample,
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
          info: this.getDocumentInfoPath(this.fieldSets[i].documents[j]),
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
  getUniqueUserDocs() {
    const unique = [
      ...new Set(
        this.applicationDetails.user_docs.map((item) => item.document_id)
      ),
    ];
    return unique.length;
  }

  submitApplication() {
    // if (this.getFieldSetsLength() + 6 == this.getUniqueUserDocs()) {
    //   this.isLoading = true;
    //   if (this.dateService.isWeekend() === false) {
    //     console.log(this.dateService.isWorkHours());
    //     if (this.dateService.isWorkHours() === true) {
    //       const body = {
    //         application_status_id: 9,
    //       };
    //       this.applicationService
    //         .updateApplicationStatus(body, this.applicationId)
    //         .subscribe((res) => {
    //           this.isLoading = false;
    //           this.router.navigate([
    //             'dashboard/new/summary',
    //             this.applicationId,
    //           ]);
    //         });
    //     } else {
    //       this.isLoading = false;
    //       this.openSnackBar(
    //         'You can only submit applications during Working Hours (8am - 5pm).'
    //       );
    //     }
    //   } else {
    //     this.openSnackBar('You can only submit applications on Weekdays.');
    //     this.isLoading = false;
    //   }
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
  checkExistingZoningFormData() {
    this.applicationService
      .fetchZoningFormData(this.applicationId)
      .subscribe((res) => {
        if (res.data.length !== 0) {
          this.zoningFormData = res.data;
        }
      });
  }

  getFormsLength() {
    return this.forms.length;
  }

  initPdfViewer(event) {
    console.log(event);
    if (
      this.applicationDetails.construction_status_id !== 1 &&
      event.previouslySelectedIndex <= 4
    ) {
      this.upload(this.forms[event.previouslySelectedIndex]);
    } else if (
      this.applicationDetails.construction_status_id == 1 &&
      event.previouslySelectedIndex <= 5
    ) {
      this.upload(this.forms[event.previouslySelectedIndex]);
    }
    this.checkExistingZoningFormData();
    const index = event.selectedIndex;
    const pdfViewer = document.getElementById('pdf-viewer');
    const pdfContainer = document.getElementById(`form-${index}`);
    this.forms[index] ? (this.pdfSource = this.forms[index].src) : null;
    this.forms[index] ? (this.sampleForm = this.forms[index].sample) : null;
    this.forms[0] ? (this.formData = this.zoningFormData) : null;
    this.forms[1] ? (this.formData = this.buildingFormData) : null;
    this.forms[2] ? (this.formData = this.sanitaryFormData) : null;
    this.forms[3] ? (this.formData = this.electricalFormData) : null;
    this.forms[4] ? (this.formData = this.situationalReportFormData) : null;
    this.forms[5] ? (this.formData = this.noticeOfConstructionFormData) : null;

    pdfContainer ? pdfContainer.appendChild(pdfViewer) : null;
  }

  public async upload(form): Promise<void> {
    const data = this.formData;
    const blob =
      await this.NgxExtendedPdfViewerService.getCurrentDocumentAsBlob();
    this.dataBindingService.handleSaveFormData(
      this.applicationId,
      form.id,
      data
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
            this.fetchApplicationInfo();
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
          this.openSnackBar('Saved!');
        });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      // horizontalPosition: 'right',
      // verticalPosition: 'top',
    });
  }

  getDocumentInfoPath(id) {
    return documentInfo[id];
  }
}
