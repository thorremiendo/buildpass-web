import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-e-signature',
  templateUrl: './e-signature.component.html',
  styleUrls: ['./e-signature.component.scss'],
})
export class ESignatureComponent implements OnInit {
  public src = '../../../assets/forms/checklist_building.pdf';

  constructor() {}

  ngOnInit(): void {}

  generatePdf() {
    var element = document.getElementById('html2Pdf');

    html2canvas(element, {
      allowTaint: true,
    }).then((canvas) => {
      let fileWidth = 400;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      PDF.save('angular-demo.pdf');
    });
  }
}
