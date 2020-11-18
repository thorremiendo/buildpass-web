import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-initial-forms',
  templateUrl: './initial-forms.component.html',
  styleUrls: ['./initial-forms.component.scss'],
})
export class InitialFormsComponent implements OnInit {
  public zoningClearanceForm: File;
  public buildingPermitForm: File;
  public sanitaryPermitForm: File;
  public electricalPermitForm: File;
  public geodeticEngineerAffidavit: File;
  public civilEngineerAffidavit: File;

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
    console.log(this.applicationInfo);
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'zoningClearanceForm':
        this.zoningClearanceForm = file;
        break;
      case 'buildingPermitForm':
        this.buildingPermitForm = file;
        break;
      case 'sanitaryPermitForm':
        this.sanitaryPermitForm = file;
        break;
      case 'electricalPermitForm':
        this.electricalPermitForm = file;
        break;
      case 'geodeticEngineerAffidavit':
        this.geodeticEngineerAffidavit = file;
        break;
      case 'civilEngineerAffidavit':
        this.civilEngineerAffidavit = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'zoningClearanceForm':
        this.zoningClearanceForm = null;
        break;
      case 'buildingPermitForm':
        this.buildingPermitForm = null;
        break;
      case 'sanitaryPermitForm':
        this.sanitaryPermitForm = null;
        break;
      case 'electricalPermitForm':
        this.electricalPermitForm = null;
        break;
      case 'geodeticEngineerAffidavit':
        this.geodeticEngineerAffidavit = null;
        break;
      case 'civilEngineerAffidavit':
        this.civilEngineerAffidavit = null;
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
    if (this.buildingPermitForm) {
      body['building_permit_form'] = this.buildingPermitForm;
    }
    if (this.sanitaryPermitForm) {
      body['sanitary_permit_form'] = this.sanitaryPermitForm;
    }
    if (this.electricalPermitForm) {
      body['electrical_permit_form'] = this.electricalPermitForm;
    }
    if (this.geodeticEngineerAffidavit) {
      body['geodetic_engineer_affidavit'] = this.geodeticEngineerAffidavit;
    }
    if (this.civilEngineerAffidavit) {
      body['civil_engineer_affidavit'] = this.civilEngineerAffidavit;
    }
    this.newApplicationService.setApplicationInfo(body);
    this.router.navigateByUrl('/dashboard/new/documentary-requirements');
  }
}
