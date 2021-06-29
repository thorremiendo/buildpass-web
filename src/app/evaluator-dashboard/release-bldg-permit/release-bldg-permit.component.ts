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
import { occupancyClassification } from './../../core/enums/occupancy-classification.enum';
@Component({
  selector: 'app-release-bldg-permit',
  templateUrl: './release-bldg-permit.component.html',
  styleUrls: ['./release-bldg-permit.component.scss'],
})
export class ReleaseBldgPermitComponent implements OnInit {
  public applicationDetails;
  public src = '../../../assets/forms/bldg-permit-certificate.pdf';
  public formData = {};
  public userId;
  public applicationId;
  public userInfo;
  public bpCertificate: File;
  public isSubmitting: boolean = false;
  constructor(
    private newApplicationService: NewApplicationService,
    public dialogRef: MatDialogRef<ReleaseBldgPermitComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private viewSDKClient: ViewSDKClient,
    private watermark: WaterMarkService,
    private applicationService: ApplicationInfoService
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

        this.formData = {
          owner_address: `${this.applicationDetails.applicant_detail.house_number}  ${this.applicationDetails.applicant_detail.street_name} ${this.applicationDetails.applicant_detail.barangay}`,
          complete_applicant_name: `${this.applicationDetails.applicant_detail.first_name} ${this.applicationDetails.applicant_detail.middle_name} ${this.applicationDetails.applicant_detail.last_name}`,
          project_title: this.applicationDetails.project_detail.project_title,
          project_lot_number: this.applicationDetails.project_detail.lot_number,
          project_block_number:
            this.applicationDetails.project_detail.block_number,
          project_tct_number: this.applicationDetails.project_detail.tct_number,
          project_street: this.applicationDetails.project_detail.street_name,
          project_barangay: this.applicationDetails.project_detail.barangay,
          city: 'BAGUIO CITY',
          zip_code: '2600',
          professional_in_charge_of_construction:
            this.applicationDetails.project_detail.inspector_name,
          bp_classified_as: this.getOccupancyClassification(),
          total_project_cost: parseFloat(
            this.applicationDetails.project_detail.project_cost_cap
          ).toLocaleString(),
          building_address: `${this.applicationDetails.project_detail.house_number} ${this.applicationDetails.project_detail.lot_number} ${this.applicationDetails.project_detail.street_name} ${this.applicationDetails.project_detail.barangay}`,
          no_of_storeys:
            this.applicationDetails.project_detail.number_of_storey,
          contact_no: this.applicationDetails.applicant_detail.contact_number,
        };
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

  getOccupancyClassification() {
    return occupancyClassification[
      this.applicationDetails.occupancy_classification_id
    ];
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'bpCertificate':
        this.bpCertificate = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'bpCertificate':
        this.bpCertificate = null;
        break;
    }
  }

  callSave() {
    this.isSubmitting = true;
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.userId,
      document_id: 50,
      document_status_id: 1,
    };

    if (this.bpCertificate) {
      uploadDocumentData['document_path'] = this.bpCertificate;
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
      this.watermark
        .insertQrCode(doc, res.data, 'building-permit')
        .then((blob) => {
          const updateFileData = {
            document_status_id: 1,
            document_path: blob,
          };
          this.newApplicationService
            .updateDocumentFile(updateFileData, id)
            .subscribe((res) => {
              Swal.fire('Success!', `Building Permit Uploaded`, 'success').then(
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
