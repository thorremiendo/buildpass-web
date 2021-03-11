import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import Swal from 'sweetalert2';
import { userDocuments } from 'src/app/core/variables/documents';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-other-permits',
  templateUrl: './other-permits.component.html',
  styleUrls: ['./other-permits.component.scss'],
})
export class OtherPermitsComponent implements OnInit {
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
  public applicationInfo;
  constructor(
    private newApplicationService: NewApplicationService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    console.log(this.user);
    this.newApplicationService.applicationId
      .asObservable()
      .subscribe((applicationId) => {
        this.applicationId = applicationId;
        if (!this.applicationId) {
          this.applicationId = localStorage.getItem('app_id');
          this.fetchApplicationInfo();
        } else {
          localStorage.setItem('app_id', this.applicationId);
          console.log('local app id', localStorage.getItem('app_id'));
          this.fetchApplicationInfo();
        }
      });
  }
  fetchApplicationInfo() {
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
        this.isLoading = false;
        Swal.fire('Success!', `Uploaded!`, 'success').then((result) => {
          this.ngOnInit();
        });
      });
  }

  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'topographicMap':
        this.topographicMap = file;
        const topographicMap = userDocuments[5];
        this.handleUpload(this.topographicMap, topographicMap);
        break;
      case 'excavationPlan':
        this.excavationPlan = file;
        const excavationPlan = userDocuments[6];
        this.handleUpload(this.excavationPlan, excavationPlan);
        break;
      case 'vicinityMap':
        this.vicinityMap = file;
        const vicinityMap = userDocuments[7];
        this.handleUpload(this.vicinityMap, vicinityMap);
        break;
      case 'retainingWalls':
        this.retainingWalls = file;
        const retainingWalls = userDocuments[8];
        this.handleUpload(this.retainingWalls, retainingWalls);
        break;
      case 'excavationSections':
        this.excavationSections = file;
        const excavationSections = userDocuments[9];
        this.handleUpload(this.excavationSections, excavationSections);
        break;
      case 'soilProtection':
        this.soilProtection = file;
        const soilProtection = userDocuments[10];
        this.handleUpload(this.soilProtection, soilProtection);
        break;
      case 'drainagePlan':
        this.drainagePlan = file;
        const drainagePlan = userDocuments[11];
        this.handleUpload(this.drainagePlan, drainagePlan);
        break;
      case 'structuralPlan':
        this.structuralPlan = file;
        const structuralPlan = userDocuments[12];
        this.handleUpload(this.structuralPlan, structuralPlan);
        break;
      case 'sitePicture':
        this.sitePicture = file;
        const sitePicture = userDocuments[13];
        this.handleUpload(this.sitePicture, sitePicture);
        break;
      case 'constructionTarp':
        this.constructionTarp = file;
        const constructionTarp = userDocuments[14];
        this.handleUpload(this.constructionTarp, constructionTarp);
        break;
      case 'structuralAnalysis':
        this.structuralAnalysis = file;
        const structuralAnalysis = userDocuments[15];
        this.handleUpload(this.structuralAnalysis, structuralAnalysis);
        break;
      case 'excavationMethod':
        this.excavationMethod = file;
        const excavationMethod = userDocuments[16];
        this.handleUpload(this.excavationMethod, excavationMethod);
        break;
      case 'chspDole':
        this.chspDole = file;
        const chspDole = userDocuments[17];
        this.handleUpload(this.chspDole, chspDole);
        break;
      case 'letterOfApplicant':
        this.letterOfApplicant = file;
        const letterOfApplicant = userDocuments[19];
        this.handleUpload(this.letterOfApplicant, letterOfApplicant);
        break;
      case 'dumpSite':
        this.dumpSite = file;
        const dumpSite = userDocuments[18];
        this.handleUpload(this.dumpSite, dumpSite);
        break;
    }
  }
  onRemove(type) {
    switch (type) {
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

  callNext() {
    if (
      this.applicationInfo.construction_status == '2' ||
      this.applicationInfo.construction_status == '3'
    ) {
      this.router.navigateByUrl(
        'dashboard/new/initial-forms/civil-engineer-affidavit'
      );
    } else {
      this.router.navigate(['dashboard/new/summary', this.applicationId]);
    }
  }
}
