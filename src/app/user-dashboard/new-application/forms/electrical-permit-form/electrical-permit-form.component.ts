import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-electrical-permit-form',
  templateUrl: './electrical-permit-form.component.html',
  styleUrls: ['./electrical-permit-form.component.scss'],
})
export class ElectricalPermitFormComponent implements OnInit {
  public formData = {};
  public electricalPermitForm: File;
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
    const body = {
      application_type: this.applicationInfo.application_type,
      is_representative: this.applicationInfo.is_representative,
      is_lot_owner: this.applicationInfo.is_lot_owner,
      construction_status: this.applicationInfo.construction_status,
      zoning_clearance_form: this.applicationInfo.zoning_clearance_form,
      building_permit_form: this.applicationInfo.building_permit_form,
      sanitary_permit_form: this.applicationInfo.sanitary_permit_form,
    };
    if (this.electricalPermitForm) {
      body['electrical_permit_form'] = this.electricalPermitForm;
    }
    this.newApplicationService.setApplicationInfo(body);
    if (
      this.applicationInfo.construction_status == '1' ||
      this.applicationInfo.construction_status == '2'
    ) {
      this.router.navigateByUrl(
        'dashboard/new/initial-forms/civil-engineer-affidavit'
      );
    } else {
      this.router.navigateByUrl('dashboard/new/documentary-requirements');
    }
  }
}
