import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-sanitary-permit-form',
  templateUrl: './sanitary-permit-form.component.html',
  styleUrls: ['./sanitary-permit-form.component.scss']
})
export class SanitaryPermitFormComponent implements OnInit {
  public sanitaryPermitForm: File;
  public applicationInfo;

  constructor(
    private router: Router,
    private newApplicationService: NewApplicationFormService
  ) { }

  ngOnInit(): void {
    this.newApplicationService.newApplicationSubject
      .asObservable()
      .subscribe(
        (newApplicationSubject) =>
          (this.applicationInfo = newApplicationSubject)
      );
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'sanitaryPermitForm':
        this.sanitaryPermitForm = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'sanitaryPermitForm':
        this.sanitaryPermitForm = null;
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
      building_permit_form: this.applicationInfo.building_permit_form
    };
    if (this.sanitaryPermitForm) {
      body['sanitary_permit_form'] = this.sanitaryPermitForm;
    }
    this.newApplicationService.setApplicationInfo(body);
    this.router.navigateByUrl('dashboard/new/initial-forms/electrical-permit');
  }

}
