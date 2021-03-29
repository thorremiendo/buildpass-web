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
  //adobe sdk
  previewFilePromise: any;
  annotationManager: any;
  viewerConfig = {
    /* Enable commenting APIs */
    enableAnnotationAPIs: true /* Default value is false */,
    includePDFAnnotations: true,
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newApplicationService: NewApplicationService,
    private authService: AuthService,
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
    console.log('USER DOCUMENT', this.data);
    this.applicationId = this.data.route.snapshot.params.id;
    console.log(this.applicationId);
    console.log(this.data);
    this.permitDetails = this.fb.group({
      form_remarks: new FormControl(''),
      is_compliant: new FormControl(''),
    });
    this.viewSDKClient.form = this.data.form;
    this.viewSDKClient.formId = this.data.form.id;
  }
  //adobe sdk functions
  ngAfterViewInit() {
    this.viewSDKClient.url = this.data.form.document_path;
    this.viewSDKClient.ready().then(() => {
      /* Invoke the file preview and get the Promise object */
      this.previewFilePromise = this.viewSDKClient.previewFile(
        'pdf-div',
        this.viewerConfig
      );
      /* Use the annotation manager interface to invoke the commenting APIs */
      this.previewFilePromise.then((adobeViewer: any) => {
        adobeViewer.getAnnotationManager().then((annotManager: any) => {
          this.annotationManager = annotManager;
          /* Set UI configurations */
          const customFlags = {
            /* showToolbar: false,   /* Default value is true */
            showCommentsPanel: false /* Default value is true */,
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
      .then((result: any) => {
        console.log(
          'Annotations removed from PDF successfully and updated PDF bufferand annotation list returned.',
          result
        );
      })
      .catch((error: any) => {
        console.log(error);
      });
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

  callSave() {
    this.isSubmitting = true;
    const id = this.data.form.id;
    const revisionData = {
      evaluator_user_id: this.data.evaluator.user_id,
      remarks: this.permitDetails.value.form_remarks,
    };

    this.newApplicationService
      .updateUserDocs(revisionData, id)
      .subscribe((res) => {
        if (this.permitDetails.value.is_compliant == 1) {
          this.compliant(this.data.form.document_path, id);
        } else if (this.permitDetails.value.is_compliant == 2) {
          this.noncompliant(this.data.form.document_path, id);
        }
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
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
        console.log(res);
        Swal.fire('Success!', `File Updated!`, 'success').then((result) => {
          this.onNoClick();
        });
      });
  }

  compliant(form, id) {
    this.waterMark.insertWaterMark(form, 'compliant').then((blob) => {
      const updateFileData = {
        document_status_id: this.permitDetails.value.is_compliant,
      };
      this.newApplicationService
        .updateDocumentFile(updateFileData, id)
        .subscribe((res) => {
          this.isSubmitting = false;
          console.log(res);
          Swal.fire('Success!', `Review saved!`, 'success').then((result) => {
            this.onNoClick();
          });
        });
    });
  }

  noncompliant(form, id) {
    this.waterMark.insertWaterMark(form, 'non-compliant').then((blob) => {
      const updateFileData = {
        document_status_id: this.permitDetails.value.is_compliant,
        document_path: blob,
      };
      this.newApplicationService
        .updateDocumentFile(updateFileData, id)
        .subscribe((res) => {
          this.isSubmitting = false;
          console.log(res);
          Swal.fire('Success!', `Review saved!`, 'success').then((result) => {
            this.onNoClick();
          });
        });
    });
  }
}
