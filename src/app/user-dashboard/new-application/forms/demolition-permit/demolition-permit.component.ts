import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-demolition-permit',
  templateUrl: './demolition-permit.component.html',
  styleUrls: ['./demolition-permit.component.scss'],
})
export class DemolitionPermitComponent implements OnInit {
  public user;
  public formData;
  public applicationInfo;
  public applicationId;
  public demolitionPermit: File;
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
  public safetyCertificate: File;
  public lotBoundaries: File;
  public demolitionMethodology: File;
  public demolitionProcedure: File;
  public buildingPhoto: File;
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
        type: 'safetyCertificate',
        description: 'Certificate of Construction Safety Health Program (CSHP) from DOLE'
      },
      {
        type: 'lotBoundaries',
        description: 'Plans showing the lot boundaries and the existing building/s to be demolished with complete dimensions and indicating the number of storeys/floor – minimum A3 size'
      },
      {
        type: 'demolitionMethodology',
        description: 'Demolition methodology/statement'
      },
      {
        type: 'demolitionProcedure',
        description: 'Plans of demolition procedure/sequence – minimum A3 size'
      },
      {
        type: 'buildingPhoto',
        description: 'Clear latest picture of building to be demolished (Taken at least a week before application)'
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
      case 'demolitionPermit':
        this.demolitionPermit = file;
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
      case 'safetyCertificate':
        this.safetyCertificate = file;
        break;
      case 'lotBoundaries':
        this.lotBoundaries = file;
        break;
      case 'demolitionMethodology':
        this.demolitionMethodology = file;
        break;
      case 'demolitionProcedure':
        this.demolitionProcedure = file;
        break;
      case 'buildingPhoto':
        this.buildingPhoto = file;
        break;
    }
  }

  onRemove(type) {
    switch (type) {
      case 'demolitionPermit':
        this.demolitionPermit = null;
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
      case 'safetyCertificate':
        this.safetyCertificate = null;
        break;
      case 'lotBoundaries':
        this.lotBoundaries = null;
        break;
      case 'demolitionMethodology':
        this.demolitionMethodology = null;
        break;
      case 'demolitionProcedure':
        this.demolitionProcedure = null;
        break;
      case 'buildingPhoto':
        this.buildingPhoto = null;
        break;
    }
  }

  submitApplication() {
    
  }
}
