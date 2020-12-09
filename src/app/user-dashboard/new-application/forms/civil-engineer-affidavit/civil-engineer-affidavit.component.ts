import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-civil-engineer-affidavit',
  templateUrl: './civil-engineer-affidavit.component.html',
  styleUrls: ['./civil-engineer-affidavit.component.scss']
})
export class CivilEngineerAffidavitComponent implements OnInit {
  public civilEngineerAffidavit: File;
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
      case 'civilEngineerAffidavit':
        this.civilEngineerAffidavit = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'civilEngineerAffidavit':
        this.civilEngineerAffidavit = null;
        break;
    }
  }
  callNext() {
    const value = this.applicationInfo
    const body = {
      application_type: value.application_type,
      is_representative: value.is_representative,
      is_lot_owner: value.is_lot_owner,
      registered_owner: value.registered_owner,
      construction_status: value.construction_status,
      zoning_clearance_form: value.zoning_clearance_form,
      building_permit_form: value.building_permit_form,
      sanitary_permit_form: value.sanitary_permit_form,
      electrical_permit_form: value.electrical_permit_form,
      excavation_permit: value.excavation_permit,
      demolition_permit: value.demolition_permit,
      fencing_permit: value.fencing_permit,
    };
    if (this.civilEngineerAffidavit) {
      body['civil_engineer_affidavit'] = this.civilEngineerAffidavit;
    }
    this.newApplicationService.setApplicationInfo(body);
    this.router.navigateByUrl('dashboard/new/initial-forms/geodetic-engineer-affidavit');
  }

}
