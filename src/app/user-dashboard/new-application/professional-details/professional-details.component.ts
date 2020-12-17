import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { UserService } from 'src/app/core';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import Swal from 'sweetalert2';
import { userDocuments } from 'src/app/core/variables/documents';

@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.component.html',
  styleUrls: ['./professional-details.component.scss'],
})
export class ProfessionalDetailsComponent implements OnInit {
  public civilEngineerDetails: File;
  public architectDetails: File;
  public sanitaryEngineerDetails: File;
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
      case 'civilEngineerDetails':
        this.civilEngineerDetails = file;
        const civilEngineerDetails = userDocuments[15];
        this.handleUpload(this.civilEngineerDetails, civilEngineerDetails);
        break;
      case 'architectDetails':
        this.architectDetails = file;
        const architectDetails = userDocuments[16];
        this.handleUpload(this.architectDetails, architectDetails);
        break;
      case 'sanitaryEngineerDetails':
        this.sanitaryEngineerDetails = file;
        const sanitaryEngineerDetails = userDocuments[17];
        this.handleUpload(
          this.sanitaryEngineerDetails,
          sanitaryEngineerDetails
        );
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'civilEngineerDetails':
        this.civilEngineerDetails = null;
        break;
      case 'architectDetails':
        this.architectDetails = null;
        break;
      case 'sanitaryEngineerDetails':
        this.sanitaryEngineerDetails = null;
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
      deed_of_sale: value.deed_of_sale,
    };
    if (this.civilEngineerDetails) {
      body['civil_engineer_details'] = this.civilEngineerDetails;
    }
    if (this.architectDetails) {
      body['architect_details'] = this.architectDetails;
    }
    if (this.sanitaryEngineerDetails) {
      body['sanitary_engineer_details'] = this.sanitaryEngineerDetails;
    }
    this.router.navigateByUrl('/dashboard/new/other-requirements');
  }
}
