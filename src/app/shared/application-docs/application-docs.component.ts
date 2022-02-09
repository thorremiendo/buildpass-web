import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewApplicationService } from 'src/app/core';

@Component({
  selector: 'app-application-docs',
  templateUrl: './application-docs.component.html',
  styleUrls: ['./application-docs.component.scss']
})
export class ApplicationDocsComponent implements OnInit {
  @Input() docs;
  @Output() emitDocument: EventEmitter<object> = new EventEmitter<object>();
  public dataSource;
  public documentTypes;
  public displayedColumns: string[] = [
    'index',
    'name',
    'status',
    'remarks',
  ];

  constructor(
    private newApplicationService: NewApplicationService,
  ) { }

  ngOnInit(): void {
    this.fetchDocTypes();
  }

  ngOnChanges(): void {
    if (this.documentTypes) {
      this.dataSource = this.sortUserDocs(this.docs);
    }
  }

  fetchDocTypes(): void {
    this.newApplicationService.fetchDocumentTypes().subscribe((res) => {
      this.documentTypes = res.data;
      this.dataSource = this.sortUserDocs(this.docs);
    });
  }

  getDocType(id): string {
    return this.documentTypes[id - 1].name;
  }

  sortUserDocs(docs): object {
    const sortedForms = {
      forms: {
        label: 'Forms',
        data: [],
      },
      documents: {
        label: 'Documentary Requirements',
        data: [],
      },
      plans: {
        label: 'Plans, Designs, Specifications, Cost Estimate',
        data: [],
      },
      professional: {
        label: 'Photocopy of Professional Details (Professional Tax Receipt and Professional Regulation Commission ID, signed and sealed)',
        data: [],
      },
      affidavits: {
        label: 'Affidavits',
        data: [],
      },
      others: {
        label: 'Others',
        data: [],
      },
    };

    docs.forEach((element) => {
      const docType = Number(
        this.documentTypes[element.document_id - 1].document_category_id
      );
      switch (docType) {
        case 1:
          sortedForms.forms.data.push(element);
          break;
        case 2:
          sortedForms.documents.data.push(element);
          break;
        case 3:
          sortedForms.plans.data.push(element);
          break;
        case 4:
          sortedForms.professional.data.push(element);
          break;
        case 5:
          sortedForms.affidavits.data.push(element);
          break;
        default:
          sortedForms.others.data.push(element);
          break;
      }
    });

    let sortedData = Object.values(sortedForms);
    sortedData = [
      {
        label: sortedData[0].data.length ? sortedData[0].label : 'hidden',
      },
      ...sortedData[0].data,
      {
        label: sortedData[1].data.length ? sortedData[1].label : 'hidden',
      },
      ...sortedData[1].data,
      {
        label: sortedData[2].data.length ? sortedData[2].label : 'hidden',
      },
      ...sortedData[2].data,
      {
        label: sortedData[3].data.length ? sortedData[3].label : 'hidden',
      },
      ...sortedData[3].data,
      {
        label: sortedData[4].data.length ? sortedData[4].label : 'hidden',
      },
      ...sortedData[4].data,
      {
        label: sortedData[5].data.length ? sortedData[5].label : 'hidden',
      },
      ...sortedData[5].data,
    ];

    return sortedData;
  }

  chooseDocument(id, tab): void {
    this.emitDocument.emit({
      id: id,
      tab: tab
    });
  }
}
