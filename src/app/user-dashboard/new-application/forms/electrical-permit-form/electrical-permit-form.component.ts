import { DataFormBindingService } from './../../../../core/services/data-form-binding.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { userDocuments } from 'src/app/core/variables/documents';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-electrical-permit-form',
  templateUrl: './electrical-permit-form.component.html',
  styleUrls: ['./electrical-permit-form.component.scss'],
})
export class ElectricalPermitFormComponent implements OnInit {
  public user;
  public userDetails;
  public formData = {};
  public mergedFormData;
  public userDocument = userDocuments[3];
  public isLoading: boolean = true;
  public applicationId;
  public applicationInfo;
  public electricalPermitForm: File;

  constructor(
    private router: Router,
    private newApplicationService: NewApplicationService,
    private applicationService: ApplicationInfoService,
    private dataBindingService: DataFormBindingService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.applicationId = JSON.parse(localStorage.getItem('app_id'));
    this.fetchApplicationInfo();
  }

  fetchApplicationInfo() {
    this.newApplicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationInfo = result.data;
        this.getFormDataBinding(this.applicationInfo);
      });
  }
  getFormDataBinding(a) {
    this.formData = this.dataBindingService.getFormData(a);
    console.log('DATA BINDING', this.formData);
    this.isLoading = false;
  }
  callSaveAsDraft() {
    const body = {
      application_status_id: 6,
    };
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        this.saveRoute();
      });
  }
  saveRoute() {
    const body = {
      user_id: this.user.id,
      application_id: this.applicationId,
      url: this.router.url,
    };
    this.newApplicationService.saveAsDraft(body).subscribe((res) => {
      console.log(res);
      Swal.fire('Success!', `Application Saved as Draft!`, 'success').then(
        (result) => {
          this.router.navigateByUrl('/dashboard');
        }
      );
    });
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'electricalPermitForm':
        this.electricalPermitForm = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'electricalPermitForm':
        this.electricalPermitForm = null;
        break;
    }
  }
  callNext() {
    this.isLoading = true;
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.user.id,
      document_id: this.userDocument.id,
      document_status: this.userDocument.status,
    };
    if (this.electricalPermitForm) {
      uploadDocumentData['document_path'] = this.electricalPermitForm;
    }
    this.newApplicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        this.isLoading = false;
        Swal.fire(
          'Success!',
          `${this.userDocument.name} uploaded!`,
          'success'
        ).then((result) => {
          if (
            this.applicationInfo.construction_status == '2' ||
            this.applicationInfo.construction_status == '3'
          ) {
            this.router.navigateByUrl(
              'dashboard/new/initial-forms/civil-engineer-affidavit'
            );
          } else {
            this.router.navigateByUrl('dashboard/new/documentary-requirements');
          }
        });
      });
  }
}
