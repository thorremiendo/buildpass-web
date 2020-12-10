import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-other-permits',
  templateUrl: './other-permits.component.html',
  styleUrls: ['./other-permits.component.scss'],
})
export class OtherPermitsComponent implements OnInit {
  public topographicMap: File;
  public excavationPlan: File;
  public vicinityMap: File;
  public retainingWalls: File;
  public excavationSections: File;
  public soilProtection: File;
  public drainagePlan: File;
  public structuralPlan: File;
  public sitePicture: File;
  public constructionTarp: File;
  public structuralAnalysis: File;
  public excavationMethod: File;
  public chspDole: File;
  public letterOfApplicant: File;
  public dumpSite: File;

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
      case 'topographicMap':
        this.topographicMap = file;
        break;
      case 'excavationPlan':
        this.excavationPlan = file;
        break;
      case 'vicinityMap':
        this.vicinityMap = file;
        break;
      case 'retainingWalls':
        this.retainingWalls = file;
        break;
      case 'excavationSections':
        this.excavationSections = file;
        break;
      case 'soilProtection':
        this.soilProtection = file;
        break;
      case 'drainagePlan':
        this.drainagePlan = file;
        break;
      case 'structuralPlan':
        this.structuralPlan = file;
        break;
      case 'sitePicture':
        this.sitePicture = file;
        break;
      case 'constructionTarp':
        this.constructionTarp = file;
        break;
      case 'structuralAnalysis':
        this.structuralAnalysis = file;
        break;
      case 'excavationMethod':
        this.excavationMethod = file;
        break;
      case 'chspDole':
        this.chspDole = file;
        break;
      case 'letterOfApplicant':
        this.letterOfApplicant = file;
        break;
      case 'dumpSite':
        this.dumpSite = file;
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'topographicMap':
        this.topographicMap = null;
        break;
      case 'excavationPlan':
        this.excavationPlan = null;
        break;
      case 'vicinityMap':
        this.vicinityMap = null;
        break;
      case 'retainingWalls':
        this.retainingWalls = null;
        break;
      case 'excavationSections':
        this.excavationSections = null;
        break;
      case 'soilProtection':
        this.soilProtection = null;
        break;
      case 'drainagePlan':
        this.drainagePlan = null;
        break;
      case 'structuralPlan':
        this.structuralPlan = null;
        break;
      case 'sitePicture':
        this.sitePicture = null;
        break;
      case 'constructionTarp':
        this.constructionTarp = null;
        break;
      case 'structuralAnalysis':
        this.structuralAnalysis = null;
        break;
      case 'excavationMethod':
        this.excavationMethod = null;
        break;
      case 'chspDole':
        this.chspDole = null;
        break;
      case 'letterOfApplicant':
        this.letterOfApplicant = null;
        break;
      case 'dumpSite':
        this.dumpSite = null;
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
      geodetic_engineer_affidavit: value.geodetic_engineer_affidavit,
      civil_engineer_affidavit: value.civil_engineer_affidavit,
      excavation_permit: value.excavation_permit,
    };
    if (this.topographicMap) {
      body['topographic_map'] = this.topographicMap;
    }
    if (this.excavationPlan) {
      body['excavation_plan'] = this.excavationPlan;
    }
    if (this.vicinityMap) {
      body['vicinity_map'] = this.vicinityMap;
    }
    if (this.retainingWalls) {
      body['retaining_walls'] = this.retainingWalls;
    }
    if (this.excavationSections) {
      body['excavation_sections'] = this.excavationSections;
    }
    if (this.soilProtection) {
      body['soil_protection'] = this.soilProtection;
    }
    if (this.drainagePlan) {
      body['drainage_plan'] = this.drainagePlan;
    }
    if (this.structuralPlan) {
      body['structural_plan'] = this.structuralPlan;
    }
    if (this.sitePicture) {
      body['site_picture'] = this.sitePicture;
    }
    if (this.constructionTarp) {
      body['construction_tarp'] = this.constructionTarp;
    }
    if (this.structuralAnalysis) {
      body['structural_analysis'] = this.structuralAnalysis;
    }
    if (this.excavationMethod) {
      body['excavation_method'] = this.excavationMethod;
    }
    if (this.letterOfApplicant) {
      body['letter_of_applicant'] = this.letterOfApplicant;
    }
    if (this.dumpSite) {
      body['dump_site_'] = this.dumpSite;
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
