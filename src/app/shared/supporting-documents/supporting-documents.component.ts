import { ApplicationInfoService } from './../../core/services/application-info.service';
import { UploadSupportingDocumentsComponent } from './../../evaluator-dashboard/upload-supporting-documents/upload-supporting-documents.component';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-supporting-documents',
  templateUrl: './supporting-documents.component.html',
  styleUrls: ['./supporting-documents.component.scss'],
})
export class SupportingDocumentsComponent implements OnInit {
  @Input() evaluatorDetails;
  @Input() applicationDetails;
  @Input() route;
  public applicantSupportingDocs;
  public isLoading: boolean = true;
  displayedColumns: string[] = [
    'index',
    'fileName',
    'date',
    'evaluator',
    'action',
  ];

  constructor(
    private applicationService: ApplicationInfoService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.applicationService
      .fetchApplicationSupportingFiles(this.applicationDetails.id)
      .subscribe((res) => {
        this.applicantSupportingDocs = res.data;
        this.isLoading = false;
      });
  }

  handleAddSupportingDocument() {
    const dialogRef = this.dialog.open(UploadSupportingDocumentsComponent, {
      width: '1000px',
      height: '600px',
      data: {
        evaluator: this.evaluatorDetails,
        applicationDetails: this.applicationDetails,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
}
