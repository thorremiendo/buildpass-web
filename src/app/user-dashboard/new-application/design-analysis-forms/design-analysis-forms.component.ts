import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { UserService } from 'src/app/core';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import Swal from 'sweetalert2';
import { userDocuments } from 'src/app/core/variables/documents';

@Component({
  selector: 'app-design-analysis-forms',
  templateUrl: './design-analysis-forms.component.html',
  styleUrls: ['./design-analysis-forms.component.scss'],
})
export class DesignAnalysisFormsComponent implements OnInit {
  public buildingPlans: File;
  public structuralDesign: File;
  public electricalDesign: File;
  public soilAnalysis: File;
  public buildingSpecification: File;
  public billOfMaterials: File;
  public applicationInfo;
  public user;
  public userDetails;
  public applicationId;
  public isLoading: boolean = true;

  constructor(
    private newApplicationService: NewApplicationService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.cast.subscribe((userSubject) => (this.user = userSubject));
    console.log(this.user);
    this.newApplicationService.applicationId
      .asObservable()
      .subscribe((applicationId) => (this.applicationId = applicationId));
    console.log('application id:', this.applicationId);
    this.newApplicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationInfo = result.data;
        this.isLoading = false;
      });
  }

  handleUpload(file, documentInfo) {
    this.isLoading = true;
    const uploadDocumentData = {
      application_id: this.applicationId,
      user_id: this.user.id,
      document_id: documentInfo.id,
      document_status: documentInfo.status,
    };
    if (file) {
      uploadDocumentData['document_path'] = file;
    }
    console.log(uploadDocumentData);
    this.newApplicationService
      .submitDocument(uploadDocumentData)
      .subscribe((res) => {
        Swal.fire('Success!', `Uploaded!`, 'success').then((result) => {
          this.isLoading = false;
          this.ngOnInit();
        });
      });
  }
  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'buildingPlans':
        this.buildingPlans = file;
        const buildingPlans = userDocuments[11];
        this.handleUpload(this.buildingPlans, buildingPlans);
        break;
      case 'structuralDesign':
        this.structuralDesign = file;
        const structuralDesign = userDocuments[12];
        this.handleUpload(this.structuralDesign, structuralDesign);
        break;
      case 'electricalDesign':
        this.electricalDesign = file;
        const electricalDesign = userDocuments[13];
        this.handleUpload(this.electricalDesign, electricalDesign);
        break;
      case 'soilAnalysis':
        this.soilAnalysis = file;
        const soilAnalysis = userDocuments[14];
        this.handleUpload(this.soilAnalysis, soilAnalysis);
        break;
      case 'buildingSpecification':
        this.buildingSpecification = file;
        const buildingSpecification = userDocuments[4];
        this.handleUpload(this.buildingSpecification, buildingSpecification);
        break;
      case 'billOfMaterials':
        this.billOfMaterials = file;
        const billOfMaterials = userDocuments[4];
        this.handleUpload(this.billOfMaterials, billOfMaterials);
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'buildingPlans':
        this.buildingPlans = null;
        break;
      case 'structuralDesign':
        this.structuralDesign = null;
        break;
      case 'electricalDesign':
        this.electricalDesign = null;
        break;
      case 'soilAnalysis':
        this.soilAnalysis = null;
        break;
      case 'buildingSpecification':
        this.buildingSpecification = null;
        break;
      case 'billOfMaterials':
        this.billOfMaterials = null;
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
      registered_owner: this.applicationInfo.registered_owner,
      zoning_clearance_form: value.zoning_clearance_form,
      building_permit_form: value.building_permit_form,
      sanitary_permit_form: value.sanitary_permit_form,
      electrical_permit_form: value.electrical_permit_form,
      geodetic_engineer_affidavit: this.applicationInfo
        .geodetic_engineer_affidavit,
      civil_engineer_affidavit: this.applicationInfo.civil_engineer_affidavit,
      excavation_permit: value.excavation_permit,
      demolition_permit: value.demolition_permit,
      fencing_permit: value.fencing_permit,
      authorization_letter: value.authorization_letter,
      filing_fee_receipt: value.filing_fee_receipt,
      tax_declaration: value.tax_declaration,
      real_property_tax_receipt: value.real_property_tax_receipt,
      site_latest_picture: value.site_latest_picture,
      true_copy_title: value.true_copy_title,
      lessor_document: value.lessor_document,
      deed_of_sale: value.deed_of_sale,
    };
    if (this.buildingPlans) {
      body['building_plan'] = this.buildingPlans;
    }
    if (this.structuralDesign) {
      body['structural_design'] = this.structuralDesign;
    }
    if (this.electricalDesign) {
      body['electrical_design'] = this.electricalDesign;
    }
    if (this.soilAnalysis) {
      body['soil_analaysis'] = this.soilAnalysis;
    }

    this.router.navigateByUrl('/dashboard/new/professional-details');
  }
}
