import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-fencing-permit',
  templateUrl: './fencing-permit.component.html',
  styleUrls: ['./fencing-permit.component.scss'],
})
export class FencingPermitComponent implements OnInit {
  public user;
  public formData;
  public applicationInfo;
  public applicationId;
  public fencingPermit: File;
  public representativeAuthorization: File;
  public landTitle: File;
  public surveyPlan: File;
  public leaseContract: File;
  public deedOfSale: File;
  public taxDeclaration: File;
  public propertyTaxReceipt: File;
  public professionalTaxReceipt: File;
  public vicinityMap: File;
  public sitePhoto: File;
  public constructionTarp: File;
  public fencingSpecifications: File;
  public billOfMaterials: File;
  public siteDevelopmentPlan: File;
  public sectionAndDetails: File;
  public elevationPlans: File;
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
        type: 'fencingSpecifications',
        description: 'Fencing Specifications'
      },
      {
        type: 'billOfMaterials',
        description: 'Bill of Materials'
      },
      {
        type: 'siteDevelopmentPlan',
        description: 'Site Development Plan showing the lot boundaries and the location of proposed fence'
      },
      {
        type: 'sectionAndDetails',
        description: 'Section and details of fence, footings, columns and beams'
      },
      {
        type: 'elevationPlans',
        description: 'Elevation Plans of fence from corner to corner with complete dimensions'
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

  onSelect(file: File, type: string) {
    switch (type) {
      case 'fencingPermit':
        this.fencingPermit = file;
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
      case 'fencingSpecifications':
        this.fencingSpecifications = file;
        break;
      case 'billOfMaterials':
        this.billOfMaterials = file;
        break;
      case 'siteDevelopmentPlan':
        this.siteDevelopmentPlan = file;
        break;
      case 'sectionAndDetails':
        this.sectionAndDetails = file;
        break;
      case 'elevationPlans':
        this.elevationPlans = file;
        break;
    }
  }

  onRemove(type) {
    switch (type) {
      case 'fencingPermit':
        this.fencingPermit = null;
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
      case 'fencingSpecifications':
        this.fencingSpecifications = null;
        break;
      case 'billOfMaterials':
        this.billOfMaterials = null;
        break;
      case 'siteDevelopmentPlan':
        this.siteDevelopmentPlan = null;
        break;
      case 'sectionAndDetails':
        this.sectionAndDetails = null;
        break;
      case 'elevationPlans':
        this.elevationPlans = null;
        break;
    }
  }

  submitApplication() {
    
  }
}
