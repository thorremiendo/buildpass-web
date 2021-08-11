import { WaterMarkService } from './../../core/services/watermark.service';
import { NewApplicationService } from './../../core/services/new-application.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { DataFormBindingService } from 'src/app/core/services/data-form-binding.service';

@Component({
  selector: 'app-pdf-form-save',
  templateUrl: './pdf-form-save.component.html',
  styleUrls: ['./pdf-form-save.component.scss'],
})
export class PdfFormSaveComponent implements OnInit {
  @Input() form;
  @Input() applicationDetails;
  @Input() fees;
  public src =
    '../../../assets/forms/updated/Unified_Application_for_Bldg_Permit.pdf';
  public formData;
  public isLoading: boolean = false;
  constructor(
    private NgxExtendedPdfViewerService: NgxExtendedPdfViewerService,
    private newApplicationService: NewApplicationService,
    private dataBindingService: DataFormBindingService,
    private waterMarkService: WaterMarkService
  ) {}

  ngOnInit(): void {
    this.getBpFormDetails();
  }
  getBpFormDetails() {
    console.log('FEES', this.fees);
    this.isLoading = true;
    const existingFormData = this.dataBindingService.getFormData(
      this.applicationDetails
    );
    const unifiedBpFees = this.dataBindingService.getUnifiedBpFees(
      this.fees[0]
    );
    this.formData = {
      ...existingFormData,
      ...unifiedBpFees,
    };
    console.log(this.formData);
    this.isLoading = false;
  }
  public async saveDoc(): Promise<void> {
    this.isLoading = true;
    const applicationId = this.applicationDetails.id;
    const userId = this.applicationDetails.user_id;
    const data = this.formData;
    const blob =
      await this.NgxExtendedPdfViewerService.getCurrentDocumentAsBlob();

    const uploadDocumentData = {
      document_status_id: 1,
    };

    if (blob) {
      uploadDocumentData['document_path'] = blob;
    }
    this.newApplicationService
      .updateDocumentFile(uploadDocumentData, this.form.id)
      .subscribe((res) => {
        this.addWaterMark(res.data.document_path);
      });
  }

  addWaterMark(path) {
    this.waterMarkService.insertWaterMark(path, 'compliant').then((blob) => {
      const uploadDocumentData = {
        document_status_id: 1,
        document_path: blob,
      };
      this.newApplicationService
        .updateDocumentFile(uploadDocumentData, this.form.id)
        .subscribe((res) => {
          console.log(res);
          this.isLoading = false;
        });
    });
  }
}
