import { Component, OnInit } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { Router } from '@angular/router';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-excavation-permit',
  templateUrl: './excavation-permit.component.html',
  styleUrls: ['./excavation-permit.component.scss'],
})
export class ExcavationPermitComponent implements OnInit {
  public user;
  public formData;
  public applicationInfo;
  public applicationId;
  public excavationPermit: File;
  public representativeAuthorization: File;
  public landTitle: File;
  public surveyPlan: File;
  public topographicMap: File;
  public leaseContract: File;
  public deedOfSale: File;
  public taxDeclaration: File;
  public propertyTaxReceipt: File;
  public professionalTaxReceipt: File;
  public vicinityMap: File;
  public sitePhoto: File;
  public constructionTarp: File;
  public excavationPlan: File;
  public excavationSequence: File;
  public excavationSections: File;
  public soilProtection: File;
  public retainingWall: File;
  public drainagePlan: File;
  public structuralAnalysis: File;
  public excavationMethodology: File;
  public safetyCertificate: File;
  public notificationLetter: File;
  public dumpSite: File;
  public isLoading: boolean = true;

  public fieldSets = [
    [
      {
        type: 'representativeAuthorization',
        description: 'Duly notarized authorization to process and receive approved permit or special power of the attorney (for representative/s)'
      },
      {
        type: 'landTitle',
        description: 'Certified True Copy of the Title (updated not more than 6 months)'
      },
      {
        type: 'surveyPlan',
        description: 'Surveyed Plan signed and sealed by Geodetic Engineer'
      },
      {
        type: 'leaseContract',
        description: 'Contract of Lease, or Certified Copy of Authority to Construct on the subject property'
      },
    ],
    [
      {
        type: 'deedOfSale',
        description: 'Conditional Deed of Sale, or Absolute Deed of Sale'
      },
      {
        type: 'taxDeclaration',
        description: 'Tax Declaration with documentary stamp from City Assessor\'s Office'
      },
      {
        type: 'propertyTaxReceipt',
        description: 'Photocopy of latest quarter of the real property tax receipy or Certifcate of Non-tax Delinquency with Documentary Stamp at City Treasurer\'s Office'
      },
      {
        type: 'professionalTaxReceipt',
        description: 'Photocopy of updated Professional Tax Receipt and Professional Identification Card (PRC ID) of all professional signatories in the application forms and plans (duly signed and sealed)'
      },
    ],
    [
      {
        type: 'vicinityMap',
        description: 'Vicinity map / location plan within a half-ilometer radius showing prominent landmarks or major thoroughfares for easy reference'
      },
      {
        type: 'landTitle',
        description: 'Certified True Copy of the Title (updated not more than 6 months)'
      },
      {
        type: 'sitePhoto',
        description: 'Clear latest picture of site (Taken at least a week before application)'
      },
      {
        type: 'constructionTarp',
        description: 'Construction Tarpaulin'
      },
    ],
    [
      {
        type: 'excavationPlan',
        description: 'Excavation Plan showing the lot boundaries, the area to be excavated and locations of retaining walls'
      },
      {
        type: 'excavationSequence',
        description: 'Plan showing the sequence of excavation and construction of retaining walls'
      },
      {
        type: 'excavationSections',
        description: 'Excavation sections (at least two sections) with volume computation of soil to be excavated'
      },
      {
        type: 'soilProtection',
        description: 'Plan, details and installation procedure of temporary soil protection'
      },
      {
        type: 'retainingWall',
        description: 'Structural Plan and Section Details of retaining wall'
      }
    ],
    [
      {
        type: 'drainagePlan',
        description: 'Drainage Plan during excavation'
      },
      {
        type: 'structuralAnalysis',
        description: 'Structural Analysis of Retaining Walls'
      },
      {
        type: 'excavationMethodology',
        description: 'Excavation Methodology/Statement'
      },
      {
        type: 'safetyCertificate',
        description: 'Certificate of Construction Safety Health Program (CSHP) from DOLE'
      },
      {
        type: 'notificationLetter',
        description: 'Letter of applicant notifying the adjacent property owner/s that an excavation is to be made and also showing how the adjoining property is to be protected. The said letter should be sent to the concerned party/parties not less than ten (10) days before such excavation is to be made (With signature of adjacent property owners)'
      },
      {
        type: 'dumpSite',
        description: 'Picture and location of dump site with consent from the lot owner (With lot ownership documents - Title)'
      }
    ],
  ];

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
      case 'representativeAuthorization':
        this.representativeAuthorization = file;
        break;
      case 'landTitle':
        this.landTitle = file;
        break;
      case 'surveyPlan':
        this.surveyPlan = file;
        break;
      case 'topographicMap':
        this.topographicMap = file;
        break;
      case 'leaseContract':
        this.leaseContract = file;
        break;
      case 'deedOfSale':
        this.deedOfSale = file;
        break;
      case 'taxDeclaration':
        this.taxDeclaration = file;
        break;
      case 'propertyTaxReceipt':
        this.propertyTaxReceipt = file;
        break;
      case 'professionalTaxReceipt':
        this.professionalTaxReceipt = file;
        break;
      case 'vicinityMap':
        this.vicinityMap = file;
        break;
      case 'sitePhoto':
        this.sitePhoto = file;
        break;
      case 'constructionTarp':
        this.constructionTarp = file;
        break;
      case 'excavationPlan':
        this.excavationPlan = file;
        break;
      case 'excavationSequence':
        this.excavationSequence = file;
        break;
      case 'excavationSections':
        this.excavationSections = file;
        break;
      case 'soilProtection':
        this.soilProtection = file;
        break;
      case 'retainingWall':
        this.retainingWall = file;
        break;
      case 'drainagePlan':
        this.drainagePlan = file;  
        break;
      case 'structuralAnalysis':
        this.structuralAnalysis = file;
        break;
      case 'excavationMethodology':
        this.excavationMethodology = file;
        break;
      case 'safetyCertificate':
        this.safetyCertificate = file;
        break;
      case 'notificationLetter':
        this.notificationLetter = file;  
        break;
      case 'dumpSite':
        this.dumpSite = file;
        break;
    }
  }

  onRemove(type) {
    switch (type) {
      case 'excavationPermit':
        this.excavationPermit = null;
        break;
      case 'representativeAuthorization':
        this.representativeAuthorization = null;
        break;
      case 'landTitle':
        this.landTitle = null;
        break;
      case 'surveyPlan':
        this.surveyPlan = null;
        break;
      case 'topographicMap':
        this.topographicMap = null;
        break;
      case 'leaseContract':
        this.leaseContract = null;
        break;
      case 'deedOfSale':
        this.deedOfSale = null;
        break;
      case 'taxDeclaration':
        this.taxDeclaration = null;
        break;
      case 'propertyTaxReceipt':
        this.propertyTaxReceipt = null;
        break;
      case 'professionalTaxReceipt':
        this.professionalTaxReceipt = null;
        break;
      case 'vicinityMap':
        this.vicinityMap = null;
        break;
      case 'sitePhoto':
        this.sitePhoto = null;
        break;
      case 'constructionTarp':
        this.constructionTarp = null;
        break;
      case 'excavationPlan':
        this.excavationPlan = null;
        break;
      case 'excavationSequence':
        this.excavationSequence = null;
        break;
      case 'excavationSections':
        this.excavationSections = null;
        break;
      case 'soilProtection':
        this.soilProtection = null;
        break;
      case 'retainingWall':
        this.retainingWall = null;
        break;
      case 'drainagePlan':
        this.drainagePlan = null;  
        break;
      case 'structuralAnalysis':
        this.structuralAnalysis = null;
        break;
      case 'excavationMethodology':
        this.excavationMethodology = null;
        break;
      case 'safetyCertificate':
        this.safetyCertificate = null;
        break;
      case 'notificationLetter':
        this.notificationLetter = null;  
        break;
      case 'dumpSite':
        this.dumpSite = null;
        break;
    }
  }

  submitApplication() {
    
  }
}
