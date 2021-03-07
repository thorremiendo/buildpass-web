import { Injectable } from '@angular/core';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Injectable({
  providedIn: 'root',
})
export class WaterMarkService {
  constructor() {}
  //feel free to change variable kung anu mas prefer mo
  async modifyPdf(doc_path: string, doc_type: string) {
    const url = doc_path;
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const pageCount = pages.length;
    const { width, height } = pages[0].getSize();

    for (let i = 0; i < pageCount; i++) {
      switch (doc_type) {
        case 'compliant':
          pages[i].drawText('Compliant', {
            x: width / 2 - 150,
            y: height / 2 + 150,
            size: 80,
            font: helveticaFont,
            color: rgb(0, 1, 0),
            opacity: 0.4,
            rotate: degrees(-45),
          });
          break;
        case 'non-compliant':
          pages[i].drawText('Non Compliant', {
            x: width / 2 - 200,
            y: height / 2 + 150,
            size: 80,
            font: helveticaFont,
            color: rgb(1, 0, 0),
            opacity: 0.4,
            rotate: degrees(-45),
          });
          break;
      }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    return blob;
  }
}
