import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { UserService } from 'src/app/core/services/user.service';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ViewSDKClient } from 'src/app/core/services/view-sdk.service';
import { WaterMarkService } from '../../core';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { documentTypes } from '../../core/enums/document-type.enum';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormDetailsComponent implements OnInit {
  panelOpenState = false;
  public permitDetails: FormGroup;
  public user;
  public userDetails;
  public applicationId;
  public selectedForm: File;
  public isSubmitting: boolean = false;
  public isLoading: boolean = false;
  public revisionData;
  displayedColumns: string[] = ['index', 'remark', 'date'];
  public remarksForm: FormGroup;

  //adobe sdk
  previewFilePromise: any;
  annotationManager: any;
  viewerConfig = {
    /* Enable commenting APIs */
    enableAnnotationAPIs: true /* Default value is false */,
    includePDFAnnotations: true,
  };
  constructor(
    private NgxExtendedPdfViewerService: NgxExtendedPdfViewerService,
    private newApplicationService: NewApplicationService,
    private userService: UserService,
    private fb: FormBuilder,
    private viewSDKClient: ViewSDKClient,
    private waterMark: WaterMarkService,
    public dialogRef: MatDialogRef<FormDetailsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    this.userService.cast.subscribe((userSubject) => {
      this.user = userSubject;
      if (localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
    });
    this.applicationId = this.data.route.snapshot.params.id;
    this.permitDetails = this.fb.group({
      form_remarks: new FormControl(''),
      is_compliant: new FormControl(''),
    });
    this.viewSDKClient.form = this.data.form;
    this.viewSDKClient.formId = this.data.form.id;
    this.revisionData = this.data.form.document_revision;
    console.log(this.revisionData);
    this.remarksForm = this.fb.group({
      remarks: new FormControl(''),
    });
  }
  //adobe sdk functions
  ngAfterViewInit() {
    this.viewSDKClient.url = this.data.form.document_path;
    this.viewSDKClient.ready().then(() => {
      /* Invoke the file preview and get the Promise object */
      if (this.user.employee_detail) {
        this.previewFilePromise = this.viewSDKClient.previewFile('pdf-div', {
          ...this.viewerConfig,
          showPageControls: true,
          enableFormFilling: false,
        });
      } else {
        this.previewFilePromise = this.viewSDKClient.previewFile('pdf-div', {
          ...this.viewerConfig,
          showPageControls: true,
        });
      }

      /* Use the annotation manager interface to invoke the commenting APIs */

      this.previewFilePromise.then((adobeViewer: any) => {
        adobeViewer.getAnnotationManager().then((annotManager: any) => {
          this.annotationManager = annotManager;
          /* Set UI configurations */
          const customFlags = {
            showToolbar: true /* Default value is true */,
            showCommentsPanel: true /* Default value is true */,
            downloadWithAnnotations: true /* Default value is false */,
            printWithAnnotations: true /* Default value is false */,
          };
          this.annotationManager.setConfig(customFlags);
          this.viewSDKClient.registerSaveApiHandler('update');
        });
      });
    });
  }

  removeAnnotations() {
    this.annotationManager
      .removeAnnotationsFromPDF()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  }

  isDocumentAForm() {
    if (
      this.data.form.document_id == 1 ||
      this.data.form.document_id == 2 ||
      this.data.form.document_id == 3 ||
      this.data.form.document_id == 4 ||
      this.data.form.document_id == 5 ||
      this.data.form.document_id == 48 ||
      this.data.form.document_id == 106 ||
      this.data.form.document_id == 98 ||
      this.data.form.document_id == 99
    ) {
      return true;
    } else return false;
  }

  getDocType(id): string {
    return documentTypes[id];
  }

  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'selectedForm':
        this.selectedForm = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'selectedForm':
        this.selectedForm = null;
        break;
    }
  }

  addRemarks() {
    this.isSubmitting = true;
    const id = this.data.form.id;
    const revisionData = {
      evaluator_user_id: this.data.evaluator.user_id,
      remarks: this.remarksForm.value.remarks,
    };
    this.newApplicationService
      .updateUserDocs(revisionData, id)
      .subscribe((res) => {
        this.isSubmitting = false;
        this.fetchRevisionData();
      });
  }
  fetchRevisionData() {}

  callSave() {
    this.isSubmitting = true;
    const id = this.data.form.id;
    if (this.permitDetails.value.is_compliant == 1) {
      this.compliant(this.data.form, id);
    } else if (this.permitDetails.value.is_compliant == 2) {
      this.noncompliant(this.data.form, id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public async updateForm(): Promise<void> {
    this.isSubmitting = true;
    // const blob =
    //   await this.NgxExtendedPdfViewerService.getCurrentDocumentAsBlob();
    const uploadDocumentData = {
      document_status_id: 0,
      // document_path: blob,
    };
    this.newApplicationService
      .updateDocumentFile(uploadDocumentData, this.data.form.id)
      .subscribe((res) => {
        this.isSubmitting = false;
        Swal.fire('Success!', `File Updated!`, 'success').then((result) => {
          this.onNoClick();
        });
      });
  }

  callUpdate() {
    this.isSubmitting = true;
    const uploadDocumentData = {
      document_status_id: 0,
    };
    if (this.selectedForm) {
      uploadDocumentData['document_path'] = this.selectedForm;
    }
    this.newApplicationService
      .updateDocumentFile(uploadDocumentData, this.data.form.id)
      .subscribe((res) => {
        this.isSubmitting = false;
        Swal.fire('Success!', `File Updated!`, 'success').then((result) => {
          this.onNoClick();
        });
      });
  }

  compliant(form, id) {
    this.waterMark
      .insertWaterMark(form.document_path, 'compliant')
      .then((blob) => {
        const updateFileData = {
          document_status_id: this.permitDetails.value.is_compliant,
        };
        this.newApplicationService
          .updateDocumentFile(updateFileData, id)
          .subscribe((res) => {
            this.isSubmitting = false;
            Swal.fire('Success!', `Review saved!`, 'success').then((result) => {
              this.onNoClick();
            });
          });
      });
  }

  resetWatermark() {
    this.isSubmitting = true;
    var body = {};
    this.newApplicationService
      .resetDocumentWatermark(body, this.data.form.id)
      .subscribe((res) => {
        Swal.fire('Success!', `Watermark Removed!`, 'success').then(
          (result) => {
            this.onNoClick();
          }
        );
      });
  }

  noncompliant(form, id) {
    this.isSubmitting = true;
    this.newApplicationService.fetchDocumentPath(id).subscribe((res) => {
      console.log(res);
      var docPath = res.data.document_path;
      if (
        form.document_id == 1 ||
        form.document_id == 2 ||
        form.document_id == 3 ||
        form.document_id == 4 ||
        form.document_id == 5 ||
        form.document_id == 48 ||
        form.document_id == 106 ||
        form.document_id == 98 ||
        form.document_id == 99
      ) {
        const updateFileData = {
          document_status_id: this.permitDetails.value.is_compliant,
        };
        this.newApplicationService
          .updateDocumentFile(updateFileData, id)
          .subscribe((res) => {
            this.isSubmitting = false;
            Swal.fire('Success!', `Review saved!`, 'success').then((result) => {
              this.onNoClick();
            });
          });
      } else {
        this.waterMark
          .insertWaterMark(docPath, 'non-compliant')
          .then((blob) => {
            const updateFileData = {
              document_status_id: this.permitDetails.value.is_compliant,
              document_path: blob,
            };
            this.newApplicationService
              .updateDocumentFile(updateFileData, id)
              .subscribe((res) => {
                this.isSubmitting = false;
                Swal.fire('Success!', `Review saved!`, 'success').then(
                  (result) => {
                    this.onNoClick();
                  }
                );
              });
          });
      }
    });
  }

  getCurrentRotation() {
    var st = window.getComputedStyle(
      document.getElementById('iframe-pdf-div'),
      null
    );
    var tm =
      st.getPropertyValue('-webkit-transform') ||
      st.getPropertyValue('-moz-transform') ||
      st.getPropertyValue('-ms-transform') ||
      st.getPropertyValue('-o-transform') ||
      st.getPropertyValue('transform') ||
      'none';
    if (tm != 'none') {
      var values = tm.split('(')[1].split(')')[0].split(',');
      var angle = Math.round(
        Math.atan2(Number(values[1]), Number(values[0])) * (180 / Math.PI)
      );
      return angle;
    }
    return 0;
  }

  resetRotate() {
    const pdfViewer = document.getElementById('iframe-pdf-div');
    pdfViewer.style.transform = 'rotate(0deg)';
  }

  rotateRight() {
    const angle = this.getCurrentRotation() + 90;
    const pdfViewer = document.getElementById('iframe-pdf-div');
    pdfViewer.style.transform = `rotate(${angle}deg)`;
  }

  rotateLeft() {
    const angle = this.getCurrentRotation() - 90;
    const pdfViewer = document.getElementById('iframe-pdf-div');
    pdfViewer.style.transform = `rotate(${angle}deg)`;
  }
}
