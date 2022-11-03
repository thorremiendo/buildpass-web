import { FormControl } from '@angular/forms';
import { NewApplicationService } from './../../core/services/new-application.service';
import { OccupancyService } from './../../core/services/occupancy.service';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-occupancy-upload-file',
  templateUrl: './occupancy-upload-file.component.html',
  styleUrls: ['./occupancy-upload-file.component.scss'],
})
export class OccupancyUploadFileComponent implements OnInit {
  public selectedDocId;
  public selectedDocument = new FormControl();
  public documentList;
  public oldBpDetails;
  public selectedFile: File;
  public selectedOldBpNumber;
  public oldBpList;
  public selectedOldBpDetails;
  public evaluator;
  public isLoading: boolean = false;
  filteredDocuments: Observable<any[]>;
  constructor(
    public dialogRef: MatDialogRef<OccupancyUploadFileComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private occupancyService: OccupancyService,
    private applicationService: NewApplicationService,
    private snackBar: MatSnackBar
  ) {
    this.applicationService.fetchDocumentTypes().subscribe((res) => {
      this.documentList = res.data;
      console.log(this.documentList);

      this.filteredDocuments = this.selectedDocument.valueChanges.pipe(
        startWith(''),
        map((document) =>
          document ? this._filter(document) : this.documentList.slice()
        )
      );
    });
  }

  ngOnInit(): void {
    this.evaluator = JSON.parse(localStorage.getItem('user'));

    this.occupancyService
      .fetchUserOldBp(this.data.application.id)
      .subscribe((res) => {
        this.oldBpList = res.data;
      });
  }

  private _filter(value) {
    const filterValue = value.toLowerCase();

    return this.documentList.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'selectedFile':
        this.selectedFile = file;
        break;
    }
  }

  onRemove(type) {
    switch (type) {
      case 'selectedFile':
        this.selectedFile = null;
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  // onOldBpSelected(item) {
  //   console.log('selected', item);
  // }
  handleUploadOccupancyFile() {
    this.isLoading = true;
    const application = this.data.application;
    const uploadDocumentData = {
      application_id: this.data.application.id,
      user_id: application.user_id,
      evaluator_user_id: this.evaluator.employee_detail.user_id,
      document_id: this.selectedDocId.id,
      document_path: this.selectedFile,
      document_status: 1,
    };

    this.applicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        this.openSnackBar('Saved!');
        this.isLoading = false;
        window.location.reload();
      });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      // horizontalPosition: 'right',
      // verticalPosition: 'top',
    });
  }

  onDocumentSelected() {
    this.selectedDocId = this.documentList.find(
      (doc) => doc.name === this.selectedDocument.value
    );
    console.log(this.selectedDocId);
  }
}
