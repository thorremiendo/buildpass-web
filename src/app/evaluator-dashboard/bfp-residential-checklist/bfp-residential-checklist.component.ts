import { ApplicationInfoService } from './../../core/services/application-info.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ViewSDKClient } from 'src/app/core/services/view-sdk.service';
import { WaterMarkService } from './../../core/services/watermark.service';

@Component({
  selector: 'app-bfp-residential-checklist',
  templateUrl: './bfp-residential-checklist.component.html',
  styleUrls: ['./bfp-residential-checklist.component.scss'],
})
export class BfpResidentialChecklistComponent implements OnInit {
  public applicationDetails;
  public src = '../../../assets/forms/checklist_building.pdf';
  public formData = {};
  public userId;
  public applicationId;
  public userInfo;
  public checklistBuilding: File;
  public isSubmitting: boolean = false;

  // //adobe sdk
  // previewFilePromise: any;
  // annotationManager: any;
  // viewerConfig = {
  //   /* Enable commenting APIs */
  //   enableAnnotationAPIs: true /* Default value is false */,
  //   includePDFAnnotations: true,
  // };
  constructor(
    private newApplicationService: NewApplicationService,
    private applicationService: ApplicationInfoService,
    public dialogRef: MatDialogRef<BfpResidentialChecklistComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private viewSDKClient: ViewSDKClient,
    private watermark: WaterMarkService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.applicationId = this.data.route.snapshot.params.id;
    this.newApplicationService
      .fetchUserInfo(this.applicationId)
      .subscribe((res) => {
        this.userInfo = res.data[0];
        this.userId = this.userInfo.user_detail.id;
        (this.viewSDKClient.userId = this.userId),
          (this.viewSDKClient.applicationId = this.applicationId);
        console.log(this.userId);
      });
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        this.applicationDetails = res.data;
        console.log(this.applicationDetails);
        this.formData = {
          name_of_owner: `${this.applicationDetails.applicant_detail.first_name} ${this.applicationDetails.applicant_detail.middle_name} ${this.applicationDetails.applicant_detail.last_name}`,
          project_title: this.applicationDetails.project_detail.project_title,
          location_of_construction: `${this.applicationDetails.project_detail.house_number} ${this.applicationDetails.project_detail.lot_number} ${this.applicationDetails.project_detail.street_name} ${this.applicationDetails.project_detail.barangay}`,
          no_of_storeys: this.applicationDetails.project_detail
            .number_of_storey,
        };
        console.log(this.formData);
      });
  }
  //adobe sdk functions
  // ngAfterViewInit() {
  //   this.viewSDKClient.url =
  //     'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/Checklist_Residential.pdf';
  //   this.viewSDKClient.ready().then(() => {
  //     /* Invoke the file preview and get the Promise object */
  //     this.previewFilePromise = this.viewSDKClient.previewFile(
  //       'pdf-div',
  //       this.viewerConfig
  //     );
  //     /* Use the annotation manager interface to invoke the commenting APIs */
  //     this.previewFilePromise.then((adobeViewer: any) => {
  //       adobeViewer.getAnnotationManager().then((annotManager: any) => {
  //         this.annotationManager = annotManager;
  //         /* Set UI configurations */
  //         const customFlags = {
  //           /* showToolbar: false,   /* Default value is true */
  //           showCommentsPanel: false /* Default value is true */,
  //           downloadWithAnnotations: true /* Default value is false */,
  //           printWithAnnotations: true /* Default value is false */,
  //         };
  //         this.annotationManager.setConfig(customFlags);
  //         this.viewSDKClient.registerSaveApiHandler('bfpChecklist');
  //       });
  //     });
  //   });
  // }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'checklistBuilding':
        this.checklistBuilding = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'checklistBuilding':
        this.checklistBuilding = null;
        break;
    }
  }

  callSave() {
    this.isSubmitting = true;
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.userId,
      document_id: 49,
      document_status_id: 1,
    };

    if (this.checklistBuilding) {
      uploadDocumentData['document_path'] = this.checklistBuilding;
    }

    console.log(uploadDocumentData);
    this.newApplicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        const doc = res.data.document_path;
        const id = res.data.id;
        this.watermark.generateQrCode(this.applicationId).subscribe((res) => {
          this.watermark
            .insertQrCode(doc, res.data, 'checklist-bldg')
            .then((blob) => {
              const updateFileData = {
                document_status_id: 1,
                document_path: blob,
              };
              this.newApplicationService
                .updateDocumentFile(updateFileData, id)
                .subscribe((res) => {
                  console.log(res);
                  Swal.fire(
                    'Success!',
                    `BFP Checklist Uploaded`,
                    'success'
                  ).then((result) => {
                    this.isSubmitting = true;
                    this.onNoClick();
                  });
                });
            });
        });
      });
  }
}
