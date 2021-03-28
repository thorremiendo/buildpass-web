import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { DataFormBindingService } from 'src/app/core/services/data-form-binding.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-excavation-permit',
  templateUrl: './excavation-permit.component.html',
  styleUrls: ['./excavation-permit.component.scss'],
})
export class ExcavationPermitComponent implements OnInit {
  public user;
  public pdfSource;
  public formData;
  public applicationId;
  public applicationDetails;
  public documentTypes;
  public isLoading: boolean = false;

  public forms: any = [
    {
      id: 97,
      src: '../../../../assets/forms/Excavation_and_Ground_Preparation_Permit.pdf',
    },
  ];

  public fieldSets: any = [
    {
      label: 'Documentary Requirements',
      documents: []
    },
    {
      label: 'Plans',
      documents: [7, 8, 9, 10, 11, 12, 13, 16, 17, 100]
    },
    {
      label: 'Others',
      documents: [45, 18, 20, 19]
    }
  ];

  public representativeDocs: Array<any> = [21];
  public lesseeDocs: Array<any> = [27];
  public registeredDocs: Array<any> = [26, 44];
  public notRegisteredDocs: Array<any> = [27, 23, 24];

  constructor(
    private newApplicationService: NewApplicationService,
    private applicationService: ApplicationInfoService,
    private dataBindingService: DataFormBindingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.newApplicationService.fetchDocumentTypes().subscribe(res => {
      this.documentTypes = res.data;
    });
    this.newApplicationService.applicationId
      .asObservable()
      .subscribe(applicationId => {
        if (applicationId) this.applicationId = applicationId;
        else this.applicationId = localStorage.getItem('app_id');

        this.applicationService.fetchApplicationInfo(this.applicationId).subscribe(res => {
          this.applicationDetails = res.data;
          this.formData = this.dataBindingService.getFormData(this.applicationDetails);

          const isRepresentative = this.applicationDetails.is_representative == '1' ? true : false;
          const isLessee = this.applicationDetails.rol_status_id != '1' ? true : false;
          const isRegisteredOwner = this.applicationDetails.registered_owner == '1' ? true : false;

          isRepresentative ? this.fieldSets[0].documents.push(...this.representativeDocs) : null;
          isLessee ? this.fieldSets[0].documents.push(...this.lesseeDocs) : null;
          isRegisteredOwner ? this.fieldSets[0].documents.push(...this.registeredDocs) : this.fieldSets[0].documents.push(...this.notRegisteredDocs);

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
    return this.documentTypes[id-1].name;
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
