import { Component, OnInit, Inject } from '@angular/core';
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

@Component({
  selector: 'app-fire-clearance',
  templateUrl: './fire-clearance.component.html',
  styleUrls: ['./fire-clearance.component.scss'],
})
export class FireClearanceComponent implements OnInit {
  public fireClearanceFile: File;
  public formData = {};
  public userId;
  public applicationId;
  public userInfo;
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
    public dialogRef: MatDialogRef<FireClearanceComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private viewSDKClient: ViewSDKClient
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
  }
  //adobe sdk functions
  ngAfterViewInit() {
    this.viewSDKClient.url =
      'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/fsec.pdf';
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
          this.viewSDKClient.registerSaveApiHandler('firePermit');
        });
      });
    });
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'fireClearanceFile':
        this.fireClearanceFile = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'fireClearanceFile':
        this.fireClearanceFile = null;
        break;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
