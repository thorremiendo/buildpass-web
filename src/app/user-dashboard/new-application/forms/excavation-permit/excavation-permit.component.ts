import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-excavation-permit',
  templateUrl: './excavation-permit.component.html',
  styleUrls: ['./excavation-permit.component.scss'],
})
export class ExcavationPermitComponent implements OnInit {
  public user;
  public formData;
  public applicationId;
  public applicationDetails;
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
        id: '21',
        type: 'representativeAuthorization',
        description:
          'Duly notarized authorization to process and receive approved permit or special power of the attorney (for representative/s)',
        for: 'representative',
      },
      {
        id: '26',
        type: 'landTitle',
        description:
          'Certified True Copy of the Title (updated not more than 6 months)',
        for: 'lot-owner',
      },
      {
        id: '44',
        type: 'surveyPlan',
        description:
          'Surveyed Plan signed and sealed by Geodetic Engineer or Copy of award w/ approved surveyed plan (signed and sealed by Geodetic Engineer)',
        for: 'lot-owner',
      },
      {
        id: '27',
        type: 'deedOfSale',
        description: 'Conditional Deed of Sale, or Absolute Deed of Sale',
        for: 'not-owner',
      },
      {
        id: '23',
        type: 'taxDeclaration',
        description:
          "Tax Declaration with documentary stamp from City Assessor's Office",
        for: 'not-owner',
      },
      {
        id: '24',
        type: 'propertyTaxReceipt',
        description:
          "Photocopy of latest quarter of the real property tax receipy or Certifcate of Non-tax Delinquency with Documentary Stamp at City Treasurer's Office",
        for: 'not-owner',
      },
      {
        id: '27',
        type: 'leaseContract',
        description:
          'Contract of Lease, or Certified Copy of Authority to Construct on the subject property',
        for: 'lessee',
      },
    ],
    [
      {
        id: '45',
        type: 'professionalTaxReceipt',
        description:
          'Photocopy of updated Professional Tax Receipt and Professional Identification Card (PRC ID) of all professional signatories in the application forms and plans (duly signed and sealed)',
        for: 'all',
      },
      {
        id: '8',
        type: 'vicinityMap',
        description:
          'Vicinity map / location plan within a half-ilometer radius showing prominent landmarks or major thoroughfares for easy reference',
        for: 'all',
      },
      {
        id: '26',
        type: 'landTitle',
        description:
          'Certified True Copy of the Title (updated not more than 6 months)',
        for: 'all',
      },
      {
        id: '25',
        type: 'sitePhoto',
        description:
          'Clear latest picture of site (Taken at least a week before application)',
        for: 'all',
      },
      {
        id: '15',
        type: 'constructionTarp',
        description: 'Construction Tarpaulin',
        for: 'all',
      },
    ],
    [
      {
        id: '7',
        type: 'excavationPlan',
        description:
          'Excavation Plan showing the lot boundaries, the area to be excavated and locations of retaining walls',
        for: 'all',
      },
      {
        id: '9',
        type: 'excavationSequence',
        description:
          'Plan showing the sequence of excavation and construction of retaining walls',
        for: 'all',
      },
      {
        id: '10',
        type: 'excavationSections',
        description:
          'Excavation sections (at least two sections) with volume computation of soil to be excavated',
        for: 'all',
      },
      {
        id: '11',
        type: 'soilProtection',
        description:
          'Plan, details and installation procedure of temporary soil protection',
        for: 'all',
      },
      {
        id: '12',
        type: 'retainingWall',
        description: 'Structural Plan and Section Details of retaining wall',
        for: 'all',
      },
    ],
    [
      {
        id: '13',
        type: 'drainagePlan',
        description: 'Drainage Plan during excavation',
        for: 'all',
      },
      {
        id: '16',
        type: 'structuralAnalysis',
        description: 'Structural Analysis of Retaining Walls',
        for: 'all',
      },
      {
        id: '17',
        type: 'excavationMethodology',
        description: 'Excavation Methodology/Statement',
        for: 'all',
      },
      {
        id: '18',
        type: 'safetyCertificate',
        description:
          'Certificate of Construction Safety Health Program (CSHP) from DOLE',
        for: 'all',
      },
      {
        id: '20',
        type: 'notificationLetter',
        description:
          'Letter of applicant notifying the adjacent property owner/s that an excavation is to be made and also showing how the adjoining property is to be protected. The said letter should be sent to the concerned party/parties not less than ten (10) days before such excavation is to be made (With signature of adjacent property owners)',
        for: 'all',
      },
      {
        id: '19',
        type: 'dumpSite',
        description:
          'Picture and location of dump site with consent from the lot owner (With lot ownership documents - Title)',
        for: 'all',
      },
    ],
  ];

  constructor(
    private userService: UserService,
    private newApplicationService: NewApplicationService,
    private applicationService: ApplicationInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.cast.subscribe((userSubject) => (this.user = userSubject));

    this.newApplicationService.applicationId
      .asObservable()
      .subscribe((applicationId) => {
        this.applicationId = applicationId;
        this.applicationService
          .fetchApplicationInfo(this.applicationId)
          .subscribe((res) => {
            this.applicationDetails = res.data;

            const isRepresentative =
              this.applicationDetails.is_representative == '1' ? true : false;
            const isOwner =
              this.applicationDetails.rol_status_id == '1' ? true : false;
            const isRegistered =
              this.applicationDetails.registered_owner == '1' ? true : false;

            this.fieldSets[0] = this.fieldSets[0].filter((field) => {
              if (field.for == 'representative' && !isRepresentative)
                return false;
              else if (field.for == 'lessee' && isOwner) return false;
              else if (field.for == 'lot-owner' && !isRegistered) return false;
              else if (field.for == 'not-owner' && isRegistered) return false;
              else return true;
            });
          });
      });
  }

  onSelect(file: File, type: string) {
    this.submitDocument(file, type);
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

  callSaveAsDraft() {
    console.log('SAVE AS DRAFT');
  }

  submitDocument(file: File, type: string) {
    this.fieldSets.every((fieldSet) => {
      let breakFlag = false;
      fieldSet.every((field) => {
        if (field.type == type) {
          const docType = field;

          const uploadDocumentData = {
            application_id: this.applicationId,
            user_id: this.user.id,
            document_id: docType.id,
            document_path: file,
            document_status: '0',
          };

          this.newApplicationService
            .submitDocument(uploadDocumentData)
            .subscribe((res) => {
              this.isLoading = false;
              Swal.fire(
                'Success!',
                `${docType.description} uploaded!`,
                'success'
              ).then((result) => {});
            });

          breakFlag = true;
          return false;
        }
        return true;
      });
      if (breakFlag) return false;
      else return true;
    });
  }

  submitApplication() {
    this.router.navigate(['dashboard/new/summary', this.applicationId]);
    localStorage.removeItem('app_id');
  }
}
