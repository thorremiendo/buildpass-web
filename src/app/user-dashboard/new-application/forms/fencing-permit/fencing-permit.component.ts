import { Component, OnInit } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { Router } from '@angular/router';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-fencing-permit',
  templateUrl: './fencing-permit.component.html',
  styleUrls: ['./fencing-permit.component.scss'],
})
export class FencingPermitComponent implements OnInit {
  public applicationInfo;
  public fencingPermit: File;
  public selectedOption;
  constructor(
    private newApplicationService: NewApplicationFormService,
    private router: Router
  ) {}

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
      case 'fencingPermit':
        this.fencingPermit = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'fencingPermit':
        this.fencingPermit = null;
        break;
    }
  }

  callNext() {
    const value = this.applicationInfo;
    const body = {
      application_type: value.application_type,
      is_representative: value.is_representative,
      is_lot_owner: value.is_lot_owner,
      construction_status: value.construction_status,
      registered_owner: value.registered_owner,
      zoning_clearance_form: value.zoning_clearance_form,
      building_permit_form: value.building_permit_form,
      sanitary_permit_form: value.sanitary_permit_form,
      electrical_permit_form: value.electrical_permit_form,
      excavation_permit: value.excavation_permit,
      demolition_permit: value.demolition_permit,
    };
    if (this.fencingPermit) {
      body['fencing_permit'] = this.fencingPermit;
    }
    this.newApplicationService.setApplicationInfo(body);
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
  }
}
