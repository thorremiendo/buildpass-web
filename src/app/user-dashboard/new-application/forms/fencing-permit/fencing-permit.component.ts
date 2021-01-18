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
  public formData;
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
  public user;
  public applicationId;
  public isLoading: boolean = true;
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
      case 'fencingPermit':
        this.fencingPermit = null;
        break;
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

  callNext() {}
}
