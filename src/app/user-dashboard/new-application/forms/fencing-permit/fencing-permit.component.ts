import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fencing-permit',
  templateUrl: './fencing-permit.component.html',
  styleUrls: ['./fencing-permit.component.scss'],
})
export class FencingPermitComponent implements OnInit {
  public user;
  public formData;
  public applicationId;
  public applicationDetails;
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

  public fencingPermitField = {
    id: '73',
    type: 'fencingPermit',
    description: 'Fencing Permit',
    for: 'all',
    path: ''
  };

  public fieldSets = [
    [
      {
        id: '21',
        type: 'representativeAuthorization',
        description: 'Duly notarized authorization to process and receive approved permit or special power of the attorney (for representative/s)',
        for: 'representative',
        path: ''
      },
      {
        id: '26',
        type: 'landTitle',
        description: 'Certified True Copy of the Title (updated not more than 6 months)',
        for: 'lot-owner',
        path: ''
      },
      {
        id: '44',
        type: 'surveyPlan',
        description: 'Surveyed Plan signed and sealed by Geodetic Engineer',
        for: 'lot-owner',
        path: ''
      },
      {
        id: '27',
        type: 'deedOfSale',
        description: 'Conditional Deed of Sale, or Absolute Deed of Sale',
        for: 'not-owner',
        path: ''
      },
      {
        id: '23',
        type: 'taxDeclaration',
        description: 'Tax Declaration with documentary stamp from City Assessor\'s Office',
        for: 'not-owner',
        path: ''
      },
      {
        id: '24',
        type: 'propertyTaxReceipt',
        description: 'Photocopy of latest quarter of the real property tax receipy or Certifcate of Non-tax Delinquency with Documentary Stamp at City Treasurer\'s Office',
        for: 'not-owner',
        path: ''
      },
      {
        id: '27',
        type: 'leaseContract',
        description: 'Contract of Lease, or Certified Copy of Authority to Construct on the subject property',
        for: 'lessee',
        path: ''
      },
    ],
    [
      {
        id: '45',
        type: 'professionalTaxReceipt',
        description: 'Photocopy of updated Professional Tax Receipt and Professional Identification Card (PRC ID) of all professional signatories in the application forms and plans (duly signed and sealed)',
        for: 'all',
        path: ''
      },
      {
        id: '8',
        type: 'vicinityMap',
        description: 'Vicinity map / location plan within a half-ilometer radius showing prominent landmarks or major thoroughfares for easy reference',
        for: 'all',
        path: ''
      },
      {
        id: '26',
        type: 'landTitle',
        description: 'Certified True Copy of the Title (updated not more than 6 months)',
        for: 'all',
        path: ''
      },
      {
        id: '25',
        type: 'sitePhoto',
        description: 'Clear latest picture of site (Taken at least a week before application)',
        for: 'all',
        path: ''
      },
      {
        id: '15',
        type: 'constructionTarp',
        description: 'Construction Tarpaulin',
        for: 'all',
        path: ''
      },
    ],
    [
      {
        id: '50',
        type: 'fencingSpecifications',
        description: 'Fencing Specifications',
        for: 'all',
        path: ''
      },
      {
        id: '33',
        type: 'billOfMaterials',
        description: 'Bill of Materials',
        for: 'all',
        path: ''
      },
      {
        id: '51',
        type: 'siteDevelopmentPlan',
        description: 'Site Development Plan showing the lot boundaries and the location of proposed fence',
        for: 'all',
        path: ''
      },
      {
        id: '52',
        type: 'sectionAndDetails',
        description: 'Section and details of fence, footings, columns and beams',
        for: 'all',
        path: ''
      },
      {
        id: '53',
        type: 'elevationPlans',
        description: 'Elevation Plans of fence from corner to corner with complete dimensions',
        for: 'all',
        path: ''
      }
    ],
  ];

  constructor(
    private newApplicationService: NewApplicationService,
    private applicationService: ApplicationInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.newApplicationService.applicationId
      .asObservable()
      .subscribe(applicationId => {
        if (applicationId) this.applicationId = applicationId;
        else this.applicationId = localStorage.getItem('app_id');

        this.applicationService.fetchApplicationInfo(this.applicationId).subscribe(res => {
          this.applicationDetails = res.data;

          const isRepresentative = this.applicationDetails.is_representative == '1' ? true : false;
          const isOwner = this.applicationDetails.rol_status_id == '1' ? true : false;
          const isRegistered = this.applicationDetails.registered_owner == '1' ? true : false;

          this.fieldSets[0] = this.fieldSets[0].filter(field => {
            if (field.for == 'representative' && !isRepresentative) return false;
            else if (field.for == 'lessee' && isOwner) return false;
            else if (field.for == 'lot-owner' && !isRegistered) return false;
            else if (field.for == 'not-owner' && isRegistered) return false;
            else return true;
          });

          this.setFilePaths();
        });
      });
  }

  ngAfterViewInit() {
    this.saveRoute();
  }

  saveRoute() {
    const body = {
      user_id: this.user.id,
      application_id: this.applicationId,
      url: this.router.url,
    };
    
    this.newApplicationService.saveAsDraft(body).subscribe(res => {
    });
  }

  setFilePaths() {
    const docs = this.applicationDetails.user_docs;
    docs.forEach(doc => {
      if (doc.document_id == '73') {
        this.fencingPermitField.path =  doc.document_path;
      }
    });
    this.fieldSets.forEach(fieldSet => {
      fieldSet.forEach(field => {
        docs.forEach(doc => {
          if (field.id == doc.document_id) {
            field.path =  doc.document_path;
          }
        })
      });
    });
  }

  onSelect(file: File, type: string, doctypeId: string) {
    this.submitDocument(file, type, doctypeId);
    this[type] = file;
  }

  onUpdate(file: File, type: string, doctypeId: string) {
    this.updateDocument(file, type, doctypeId);
    this[type] = file;
  }

  onRemove(type: string) {
    this[type] = null;
  }

  submitDocument(file: File, type: string, doctypeId: string) {
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.user.id,
      document_id: doctypeId,
      document_path: file,
      document_status: '0'
    };

    this.newApplicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        this.isLoading = false;
        const path = res.data.document_path;

        if (doctypeId == '73') {
          this.fencingPermitField.path = path;
        } else {
          this.fieldSets.forEach(fieldSet => {
            fieldSet.forEach(field => {
              if (field.id == doctypeId) field.path = path;
            });
          });
        }
        
        Swal.fire(
          'Success!',
          'File uploaded!',
          'success'
        ).then((result) => {
        });
      });
  }

  updateDocument(file: File, type: string, doctypeId: string) {
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.user.id,
      document_id: doctypeId,
      document_path: file,
      document_status: '0'
    };

    this.newApplicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        this.isLoading = false;

        const updatePath = res.data.document_path;
        if (doctypeId == '73') {
          this.fencingPermitField.path = updatePath;
        } else {
          this.fieldSets.forEach(fieldSet => {
            fieldSet.forEach(field => {
              if (field.id == doctypeId) field.path = updatePath;
            });
          });
        }

        Swal.fire(
          'Success!',
          'File updated!',
          'success'
        ).then((result) => {
        });
      });
  }

  submitApplication() {
    this.router.navigate(['dashboard/new/summary', this.applicationId]);
  }
}
