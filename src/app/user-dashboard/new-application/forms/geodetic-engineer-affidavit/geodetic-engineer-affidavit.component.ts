import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-geodetic-engineer-affidavit',
  templateUrl: './geodetic-engineer-affidavit.component.html',
  styleUrls: ['./geodetic-engineer-affidavit.component.scss']
})
export class GeodeticEngineerAffidavitComponent implements OnInit {
  public geodeticEngineerAffidavit: File;
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
      case 'geodeticEngineerAffidavit':
        this.geodeticEngineerAffidavit = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'geodeticEngineerAffidavit':
        this.geodeticEngineerAffidavit = null;
        break;
    }
  }
  callNext() {
    const value = this.applicationInfo
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
      civil_engineer_affidavit: value.civil_engineer_affidavit,
      excavation_permit: value.excavation_permit,
      demolition_permit: value.demolition_permit,
      fencing_permit: value.fencing_permit,
    };
    if (this.geodeticEngineerAffidavit) {
      body['geodetic_engineer_affidavit'] = this.geodeticEngineerAffidavit;
    }
    this.newApplicationService.setApplicationInfo(body);
    this.router.navigateByUrl('dashboard/new/documentary-requirements');
  }

}
