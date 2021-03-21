import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { DataFormBindingService } from 'src/app/core/services/data-form-binding.service';
import { documentTypes } from '../../../core/enums/document-type.enum';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-building-permit',
  templateUrl: './building-permit.component.html',
  styleUrls: ['./building-permit.component.scss'],
})
export class BuildingPermitComponent implements OnInit {
  public user;
  public pdfSource;
  public formData;
  public applicationId;
  public applicationDetails;
  public isLoading: boolean = false;

  public forms: any = [
    {
      id: 1,
      src: '../../../../assets/forms/Application_Form_for_Certificate_of_Zoning_Compliance.pdf',
    },
    {
      id: 2,
      src: '../../../../assets/forms/Unified_Application_for_Building_Permit.pdf',
    },
    {
      id: 3,
      src: '../../../../assets/forms/Sanitary_Plumbing_Permit.pdf',
    },
    {
      id: 48,
      src: '../../../../assets/forms/Notice_of_Construction.pdf',
    },
    {
      id: 4,
      src: '../../../../assets/forms/Electrical_Permit.pdf',
    },
  ];

  public fieldSets: any = [
    {
      label: 'Documentary Requirements',
      documents: [21, 23, 24, 25, 26, 27]
    },
    {
      label: 'Design Analysis',
      documents: [28, 29, 30, 31, 32, 33]
    },
    {
      label: 'Building Plans',
      documents: [59, 61, 63, 62, 64]
    },
    {
      label: 'Professional Details',
      documents: [34, 35, 36, 47, 46]
    },
    {
      label: 'Other Requirements',
      documents: [39, 40, 41, 42]
    },
  ];

  constructor(
    private newApplicationService: NewApplicationService,
    private applicationService: ApplicationInfoService,
    private dataBindingService: DataFormBindingService,
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
          this.formData = this.dataBindingService.getFormData(this.applicationDetails);

          /*const isRepresentative = this.applicationDetails.is_representative == '1' ? true : false;
          const isOwner = this.applicationDetails.rol_status_id == '1' ? true : false;
          const isRegistered = this.applicationDetails.registered_owner == '1' ? true : false;

          this.fieldSets[0] = this.fieldSets[0].filter(field => {
            if (field.for == 'representative' && !isRepresentative) return false;
            else if (field.for == 'lessee' && isOwner) return false;
            else if (field.for == 'lot-owner' && !isRegistered) return false;
            else if (field.for == 'not-owner' && isRegistered) return false;
            else return true;
          });*/

          this.initData();
          this.setFilePaths();
          this.pdfSource = this.forms[0].src;
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

  initPdfViewer(event) {
    const index = event.selectedIndex;
    const pdfViewer = document.getElementById('pdf-viewer');
    const pdfContainer = document.getElementById(`form-${index}`);
    this.forms[index] ? this.pdfSource = this.forms[index].src : null;
    pdfContainer ? pdfContainer.appendChild(pdfViewer) : null;
  }

  getDocType(id): string {
    return documentTypes[id];
  }

  initData() {
    for (let i=0; i<this.forms.length; i++) {
      this.forms[i] = {
        id: this.forms[i].id,
        src: this.forms[i].src,
        description: this.getDocType(this.forms[i].id),
        path: ''
      }
    }
    for (let i=0; i<this.fieldSets.length; i++) {
      for(let j=0; j<this.fieldSets[i].documents.length; j++) {
        this.fieldSets[i].documents[j] = {
          id: this.fieldSets[i].documents[j],
          description: this.getDocType(this.fieldSets[i].documents[j]),
          path: ''
        };
      }
    }
  }

  setFilePaths() {
    const docs = this.applicationDetails.user_docs;
    this.forms.forEach(form => {
      docs.forEach(doc => {
        if (form.id == doc.document_id) {
          form.path =  doc.document_path;
        }
      })
    });
    this.fieldSets.forEach(fieldSet => {
      fieldSet.documents.forEach(field => {
        docs.forEach(doc => {
          if (field.id == doc.document_id) {
            field.path =  doc.document_path;
          }
        })
      });
    });
  }

  submitDocument(file: File, doctypeId: string) {
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
        this.forms.forEach(form => {
          if (form.id == doctypeId) form.path =  path;
        });
        this.fieldSets.forEach(fieldSet => {
          fieldSet.documents.forEach(field => {
            if (field.id == doctypeId) field.path = path;
          });
        });
        
        Swal.fire(
          'Success!',
          'File uploaded!',
          'success'
        ).then((result) => {
        });
      });
  }

  submitApplication() {
    this.router.navigate(['dashboard/new/summary', this.applicationId]);
  }
}
