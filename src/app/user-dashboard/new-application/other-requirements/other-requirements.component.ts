import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import Swal from 'sweetalert2';
import { userDocuments } from 'src/app/core/variables/documents';
import { UserService } from 'src/app/core';
@Component({
  selector: 'app-other-requirements',
  templateUrl: './other-requirements.component.html',
  styleUrls: ['./other-requirements.component.scss'],
})
export class OtherRequirementsComponent implements OnInit {
  public environmentalCompliance: File;
  public governmentClearance: File;
  public chspCertificate: File;
  public barangayClearance: File;
  public user;
  public userDetails;
  public applicationId;
  public isLoading: boolean = true;
  public applicationInfo;
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
      case 'barangayClearance':
        this.barangayClearance = file;
        const barangayClearance = userDocuments[20];
        this.handleUpload(this.barangayClearance, barangayClearance);
        break;
      case 'environmentalCompliance':
        this.environmentalCompliance = file;
        const environmentalCompliance = userDocuments[21];
        this.handleUpload(this.environmentalCompliance, environmentalCompliance);
        break;
      case 'governmentClearance':
        this.governmentClearance = file;
        const governmentClearance = userDocuments[22];
        this.handleUpload(this.governmentClearance, governmentClearance);
        break;
      case 'chspCertificate':
        this.chspCertificate = file;
        const chspCertificate = userDocuments[23];
        this.handleUpload(this.chspCertificate, chspCertificate);
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'barangayClearance':
        this.barangayClearance = null;
        break;
      case 'environmentalCompliance':
        this.environmentalCompliance = null;
        break;
      case 'governmentClearance':
        this.governmentClearance = null;
        break;
      case 'chspCertificate':
        this.chspCertificate = null;
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
      excavation_permit: value.excavation_permit,
      demolition_permit: value.demolition_permit,
      fencing_permit: value.fencing_permit,
      geodetic_engineer_affidavit: value.geodetic_engineer_affidavit,
      civil_engineer_affidavit: value.civil_engineer_affidavit,
      authorization_letter: value.authorization_letter,
      filing_fee_receipt: value.filing_fee_receipt,
      tax_declaration: value.tax_declaration,
      real_property_tax_receipt: value.real_property_tax_receipt,
      site_latest_picture: value.site_latest_picture,
      true_copy_title: value.true_copy_title,
      lessor_document: value.lessor_document,
      building_plan: value.building_plan,
      structural_design: value.structural_design,
      electrical_design: value.electrical_design,
      soil_analaysis: value.soil_analaysis,
      civil_engineer_details: value.civil_engineer_details,
      architect_details: value.architect_details,
      sanitary_engineer_details: value.sanitary_engineer_details,
      deed_of_sale: value.deed_of_sale,
    };
    if (this.environmentalCompliance) {
      body['environmental_compliance'] = this.environmentalCompliance;
    }
    if (this.governmentClearance) {
      body['government_clearance'] = this.governmentClearance;
    }
    if (this.chspCertificate) {
      body['chsp_certificate'] = this.chspCertificate;
    }
    if (this.barangayClearance) {
      body['barangay_clearance'] = this.barangayClearance;
    }
    this.router.navigateByUrl('/dashboard/new/summary');
  }
}
