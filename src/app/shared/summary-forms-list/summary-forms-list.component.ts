import { Component, OnInit, Input } from '@angular/core';
import { documentTypes } from '../../core/enums/document-type.enum';

@Component({
  selector: 'app-summary-forms-list',
  templateUrl: './summary-forms-list.component.html',
  styleUrls: ['./summary-forms-list.component.scss'],
})
export class SummaryFormsListComponent implements OnInit {
  @Input() forms;
  constructor() {}

  ngOnInit(): void {}

  getDocType(id): string {
    return documentTypes[id];
  }
}
