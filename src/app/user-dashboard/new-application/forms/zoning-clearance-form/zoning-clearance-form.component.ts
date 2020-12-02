import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-zoning-clearance-form',
  templateUrl: './zoning-clearance-form.component.html',
  styleUrls: ['./zoning-clearance-form.component.scss'],
})
export class ZoningClearanceFormComponent implements OnInit {
  public formData = {
  };

  public zoningClearanceForm: File;
  public applicationInfo;
  constructor(
    private router: Router,
    private newApplicationService: NewApplicationFormService
  ) {}

  ngOnInit(): void {
    this.newApplicationService.newApplicationSubject
      .asObservable()
      .subscribe(
        (newApplicationSubject) =>
          (this.applicationInfo = newApplicationSubject)
      );
    this.newApplicationService.commonFieldsSubject
      .asObservable()
      .subscribe(
        (commonFieldsSubject) => (this.formData = commonFieldsSubject)
      );
      console.log(this.formData)
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'zoningClearanceForm':
        this.zoningClearanceForm = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'zoningClearanceForm':
        this.zoningClearanceForm = null;
        break;
    }
  }
  callNext() {
    const body = {
      application_type: this.applicationInfo.application_type,
      is_representative: this.applicationInfo.is_representative,
      is_lot_owner: this.applicationInfo.is_lot_owner,
      construction_status: this.applicationInfo.construction_status,
    };
    if (this.zoningClearanceForm) {
      body['zoning_clearance_form'] = this.zoningClearanceForm;
    }
    this.newApplicationService.setApplicationInfo(body);
    this.router.navigateByUrl('dashboard/new/initial-forms/building-permit');
  }
}
