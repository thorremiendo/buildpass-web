import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-demolition-permit',
  templateUrl: './demolition-permit.component.html',
  styleUrls: ['./demolition-permit.component.scss'],
})
export class DemolitionPermitComponent implements OnInit {
  public applicationInfo;
  public demolitionPermit: File;
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
      case 'demolitionPermit':
        this.demolitionPermit = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'demolitionPermit':
        this.demolitionPermit = null;
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
    };
    if (this.demolitionPermit) {
      body['demolition_permit'] = this.demolitionPermit;
    }
    this.newApplicationService.setApplicationInfo(body);
    this.router.navigateByUrl('dashboard/new/initial-forms/fencing-permit');
  }
}
