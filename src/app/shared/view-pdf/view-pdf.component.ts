import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss'],
})
export class ViewPdfComponent implements OnInit {
  @Input() pdfSource;
  constructor() {}

  ngOnInit(): void {}
}
