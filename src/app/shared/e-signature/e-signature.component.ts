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
  public w = window.innerWidth;
  public h = window.innerHeight;
  constructor() {}

  ngOnInit(): void {}

  generatePdf() {
    const div = document.getElementById('html2Pdf');
    const options = {
      background: 'white',
      height: div.clientHeight,
      width: div.clientWidth,
    };

    html2canvas(div, options).then((canvas) => {
      //Initialize JSPDF
      let doc = new jsPDF();
      //Converting canvas to Image
      let imgData = canvas.toDataURL('image/PNG');
      //Add image Canvas to PDF
      doc.addImage(imgData, 'PNG', 20, 20);

      let pdfOutput = doc.output();
      // using ArrayBuffer will allow you to put image inside PDF
      let buffer = new ArrayBuffer(pdfOutput.length);
      let array = new Uint8Array(buffer);
      for (let i = 0; i < pdfOutput.length; i++) {
        array[i] = pdfOutput.charCodeAt(i);
      }

      //Name of pdf
      const fileName = 'example.pdf';

      // Make file
      doc.save(fileName);
    });
  }
}
