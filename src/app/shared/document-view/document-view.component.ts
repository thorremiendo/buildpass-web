import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewApplicationService } from 'src/app/core';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer'

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent implements OnInit {
  @Input() document;
  @Input() tab;
  @Output() emitUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  public documentTypes;
  public documentType;
  public loading = true;

  constructor(
    private NgxExtendedPdfViewerService: NgxExtendedPdfViewerService,
    private newApplicationService: NewApplicationService,
  ) { }

  ngOnInit(): void {
    this.newApplicationService.fetchDocumentTypes().subscribe((res) => {
      this.documentTypes = res.data;
    });
  }

  ngOnChanges(): void {
    if (this.documentTypes) {
      this.documentType = this.documentTypes[this.document.document_id - 1].name;
      this.loading = true;
    }
  }

  pdfLoaded(data): void {
    this.loading = false;
  }

  goBack(): void {
    this.emitUpdate.emit(true);
  }
}
