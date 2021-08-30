import { Injectable } from '@angular/core';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class WaterMarkService {
  constructor(private api: ApiService) {}

  async insertWaterMark(doc_path: string, doc_type: string) {
    const url = doc_path;

    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    const pdfDocLoad = await PDFDocument.load(existingPdfBytes);

    const helveticaFont = await pdfDocLoad.embedFont(StandardFonts.Helvetica);

    const pages = pdfDocLoad.getPages();
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
            opacity: 0.2,
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
            opacity: 0.2,
            rotate: degrees(-45),
          });
          break;
      }
    }

    const pdfBytes = await pdfDocLoad.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    // const file = window.URL.createObjectURL(blob);
    // window.open(file); // open in new window

    return blob;
  }

  async insertQrCode(doc_path, qr_code_path, doc_type) {
    const url = doc_path;
    const qr_code_bytes = await fetch(qr_code_path).then((res) =>
      res.arrayBuffer()
    );

    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    const pdfDocLoad = await PDFDocument.load(existingPdfBytes);
    const qr_code = await pdfDocLoad.embedPng(qr_code_bytes);

    const pages = pdfDocLoad.getPages();
    const pageCount = pages.length;
    const { width, height } = pages[0].getSize();
    const pngDims = qr_code.scale(0.5);
    const pngDimsfire = qr_code.scale(0.4);

    for (let i = 0; i < pageCount; i++) {
      switch (doc_type) {
        case 'building-permit':
          pages[0].drawImage(qr_code, {
            x: width / 2 + 280,
            y: height / 2 + 150,
            width: pngDims.width,
            height: pngDims.height,
          });
          break;

        case 'zoning-permit':
          pages[i].drawImage(qr_code, {
            x: width / 2 + 200,
            y: height / 2 - 450,
            width: pngDims.width,
            height: pngDims.height,
          });
          break;

        case 'fire-permit':
          pages[i].drawImage(qr_code, {
            x: width / 2 + 180,
            y: height / 2 - 370,
            width: pngDimsfire.width,
            height: pngDimsfire.height,
          });
          break;

        case 'wwms-permit':
          pages[i].drawImage(qr_code, {
            x: width / 2 + 140,
            y: height / 2 + 365,
            width: pngDimsfire.width,
            height: pngDimsfire.height,
          });
          break;

        case 'checklist-bldg':
          pages[i].drawImage(qr_code, {
            x: width / 2 + 200,
            y: height / 2 - 440,
            width: pngDimsfire.width,
            height: pngDimsfire.height,
          });
          break;
      }
    }

    const pdfBytes = await pdfDocLoad.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const file = window.URL.createObjectURL(blob);
    //window.open(file); // open in new window

    return blob;
  }

  async flattenForm(pdfUrl) {
    // Fetch the PDF with form fields
    const formUrl = pdfUrl;
    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

    // Load a PDF with form fields
    const pdfDoc = await PDFDocument.load(formPdfBytes);

    // Get the form containing all the fields
    const form = pdfDoc.getForm();

    // Flatten the form's fields
    form.flatten();

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const file = window.URL.createObjectURL(blob);
    window.open(file); // open in new window
  }

  generateQrCode(id) {
    const url = `/application/${id}/qrcode`;
    return this.api.post(url, null);
  }
}
