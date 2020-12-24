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
        const buildingPlans = userDocuments[27];
        this.handleUpload(this.buildingPlans, buildingPlans);
        break;
      case 'structuralDesign':
        this.structuralDesign = file;
        const structuralDesign = userDocuments[28];
        this.handleUpload(this.structuralDesign, structuralDesign);
        break;
      case 'electricalDesign':
        this.electricalDesign = file;
        const electricalDesign = userDocuments[29];
        this.handleUpload(this.electricalDesign, electricalDesign);
        break;
      case 'soilAnalysis':
        this.soilAnalysis = file;
        const soilAnalysis = userDocuments[30];
        this.handleUpload(this.soilAnalysis, soilAnalysis);
        break;
      case 'buildingSpecification':
        this.buildingSpecification = file;
        const buildingSpecification = userDocuments[31];
        this.handleUpload(this.buildingSpecification, buildingSpecification);
        break;
      case 'billOfMaterials':
        this.billOfMaterials = file;
        const billOfMaterials = userDocuments[32];
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
    this.router.navigateByUrl('/dashboard/new/professional-details');
  }
}
