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
    const body = {
      application_type: this.applicationInfo.application_type,
      is_representative: this.applicationInfo.is_representative,
      is_lot_owner: this.applicationInfo.is_lot_owner,
      construction_status: this.applicationInfo.construction_status,
      zoning_clearance_form: this.applicationInfo.zoning_clearance_form,
      building_permit_form: this.applicationInfo.building_permit_form,
      sanitary_permit_form: this.applicationInfo.sanitary_permit_form,
      electrical_permit_form: this.applicationInfo.electrical_permit_form,
      civil_engineer_affidavit: this.applicationInfo.civil_engineer_affidavit
    };
    if (this.geodeticEngineerAffidavit) {
      body['geodetic_engineer_affidavit'] = this.geodeticEngineerAffidavit;
    }
    this.newApplicationService.setApplicationInfo(body);
    this.router.navigateByUrl('dashboard/new/documentary-requirements');
  }

}
