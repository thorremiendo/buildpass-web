import { Component, OnInit } from '@angular/core';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-excavation-permit',
  templateUrl: './excavation-permit.component.html',
  styleUrls: ['./excavation-permit.component.scss'],
})
export class ExcavationPermitComponent implements OnInit {
  public selectedOption;
  public excavationPermit: File;
  public applicationInfo;
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
      case 'excavationPermit':
        this.excavationPermit = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'excavationPermit':
        this.excavationPermit = null;
        break;
    }
  }

  callNext() {
    const body = {
      application_type: this.applicationInfo.application_type,
      is_representative: this.applicationInfo.is_representative,
      is_lot_owner: this.applicationInfo.is_lot_owner,
      construction_status: this.applicationInfo.construction_status,
      registered_owner: this.applicationInfo.registered_owner,
      zoning_clearance_form: this.applicationInfo.zoning_clearance_form,
      building_permit_form: this.applicationInfo.building_permit_form,
      sanitary_permit_form: this.applicationInfo.sanitary_permit_form,
      electrical_permit_form: this.applicationInfo.electrical_permit_form,
    };
    if (this.excavationPermit) {
      body['excavation_permit'] = this.excavationPermit;
    }
    this.newApplicationService.setApplicationInfo(body);
    if (this.selectedOption == 'Yes') {
      this.router.navigateByUrl(
        'dashboard/new/other-permits'
      );
    } else {
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
}
