import { DataFormBindingService } from 'src/app/core/services/data-form-binding.service';
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
  selector: 'app-wwwms-certificate',
  templateUrl: './wwwms-certificate.component.html',
  styleUrls: ['./wwwms-certificate.component.scss'],
})
export class WwwmsCertificateComponent implements OnInit {
  public applicationDetails;
  public src =
    '../../../assets/forms/updated/WWMS_Building_Permit_Application_Form.pdf';
  public formData = {};
  public userId;
  public applicationId;
  public userInfo;
  public wwmsFile: File;
  public isSubmitting: boolean = false;
  constructor(
    private newApplicationService: NewApplicationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WwwmsCertificateComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private viewSDKClient: ViewSDKClient,
    private watermark: WaterMarkService,
    private applicationService: ApplicationInfoService,
    private dataBindingService: DataFormBindingService
  ) {}

  ngOnInit(): void {
    this.applicationId = this.data.route.snapshot.params.id;
    this.newApplicationService
      .fetchUserInfo(this.applicationId)
      .subscribe((res) => {
        this.userInfo = res.data[0];
        this.userId = this.userInfo.user_detail.id;
        (this.viewSDKClient.userId = this.userId),
          (this.viewSDKClient.applicationId = this.applicationId);
      });
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        this.applicationDetails = res.data;
        this.formData = this.dataBindingService.getFormData(
          this.applicationDetails
        );
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
      case 'wwmsFile':
        this.wwmsFile = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'wwmsFile':
        this.wwmsFile = null;
        break;
    }
  }

  callSave() {
    this.isSubmitting = true;
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.userId,
      document_id: 44,
      document_status_id: 1,
    };

    if (this.wwmsFile) {
      uploadDocumentData['document_path'] = this.wwmsFile;
    }

    this.newApplicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        const doc = res.data.document_path;
        const id = res.data.id;
        this.newApplicationService
          .updateDocumentFile({ receiving_status_id: 1 }, id)
          .subscribe((res) => {
            this.newApplicationService
              .updateDocumentFile({ bfp_status_id: 1 }, id)
              .subscribe((res) => {
                this.newApplicationService
                  .updateDocumentFile({ cbao_status_id: 1 }, id)
                  .subscribe((res) => {
                    this.newApplicationService
                      .updateDocumentFile({ cepmo_status_id: 1 }, id)
                      .subscribe((res) => {
                        this.addWaterMark(doc, id);
                      });
                  });
              });
          });
      });
  }

  addWaterMark(doc, id) {
    this.watermark.generateQrCode(this.applicationId).subscribe((res) => {
      this.watermark.insertQrCode(doc, res.data, 'wwms-permit').then((blob) => {
        const updateFileData = {
          document_status_id: 1,
          document_path: blob,
        };
        this.newApplicationService
          .updateDocumentFile(updateFileData, id)
          .subscribe((res) => {
            Swal.fire('Success!', `WWMS BP Uploaded`, 'success').then(
              (result) => {
                this.isSubmitting = true;
                this.onNoClick();
              }
            );
          });
      });
    });
  }
}
