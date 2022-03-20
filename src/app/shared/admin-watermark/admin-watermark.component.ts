import { PopOutNotificationsService } from './../../core/services/pop-out-notification.service';
import { NewApplicationService } from './../../core/services/new-application.service';
import { WaterMarkService } from './../../core/services/watermark.service';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-admin-watermark',
  templateUrl: './admin-watermark.component.html',
  styleUrls: ['./admin-watermark.component.scss'],
})
export class AdminWatermarkComponent implements OnInit {
  public watermarkType = new FormControl();
  public isLoading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AdminWatermarkComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private watermark: WaterMarkService,
    private applicationService: NewApplicationService,
    private alert: PopOutNotificationsService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  insertWatermark() {
    console.log(this.watermarkType.value);
    switch (this.watermarkType.value) {
      case '1':
        this.compliant();
        break;
      case '2':
        this.nonCompliant();
        break;
      default:
        break;
    }
  }

  compliant() {
    this.isLoading = true;
    this.watermark
      .insertWaterMark(this.data.document.document_path, 'compliant')
      .then((blob) => {
        const file = window.URL.createObjectURL(blob);
        window.open(file); // open in new window
        const payload = {
          document_path: blob,
        };
        this.applicationService
          .updateDocumentFile(payload, this.data.document.id)
          .subscribe((res) => {
            console.log(res);
            this.isLoading = false;
            this.alert.openSuccessToast('Saved!');
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          });
      });
  }

  nonCompliant() {
    this.isLoading = true;
    this.watermark
      .insertWaterMark(this.data.document.document_path, 'for-compliance')
      .then((blob) => {
        const payload = {
          document_path: blob,
        };
        this.applicationService
          .updateDocumentFile(payload, this.data.document.id)
          .subscribe((res) => {
            this.isLoading = false;
            console.log(res);
            this.alert.openSuccessToast('Saved!');
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          });
      });
  }
}
