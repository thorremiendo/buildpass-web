import { Injectable } from '@angular/core';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { ApiService } from '../services'

@Injectable({
  providedIn: 'root',
})
export class WaterMarkService {
  constructor(
    private api:ApiService,
  ) {}

  async insertWaterMark(doc_path: string, doc_type: string) {
    const url = doc_path;
    const qr_code_path = 'https://s3-ap-southeast-1.amazonaws.com/baguio-ocpas/qr-16157057011.png';
    const qr_code_bytes = await fetch(qr_code_path).then((res) => res.arrayBuffer());
  
  
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    const pdfDocLoad = await PDFDocument.load(existingPdfBytes);
    const qr_code = await pdfDocLoad.embedPng(qr_code_bytes)
    const helveticaFont = await pdfDocLoad.embedFont(StandardFonts.Helvetica);

    const pages = pdfDocLoad.getPages();
    const pageCount = pages.length;
    const { width, height } = pages[0].getSize();
    const pngDims = qr_code.scale(0.5)
    

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
          case 'insertQrCode':
            pages[i].drawImage(qr_code, {
              x: width / 2 + 150 ,
              y: height / 2 + 350,
              width: pngDims.width,
              height: pngDims.height,
          });
          break;
      }
    }

    const pdfBytes = await pdfDocLoad.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const file = window.URL.createObjectURL(blob);
    window.open(file); // open in new window

    return blob;
  }

  async insertQrCode(doc_path, qr_code_path){
    const url = doc_path;
    const qr_code_bytes = await fetch(qr_code_path).then((res) => res.arrayBuffer());

    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    const pdfDocLoad = await PDFDocument.load(existingPdfBytes);
    const qr_code = await pdfDocLoad.embedPng(qr_code_bytes)

    const pages = pdfDocLoad.getPages();
    const pageCount = pages.length;
    const { width, height } = pages[0].getSize();
    const pngDims = qr_code.scale(0.3)

    for (let i = 0; i < pageCount; i++) {
      pages[i].drawImage(qr_code, {
        x: width / 2 + 200 ,
        y: height / 2 + 400,
        width: pngDims.width,
        height: pngDims.height,
      })
    }

    const pdfBytes = await pdfDocLoad.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const file = window.URL.createObjectURL(blob);
    window.open(file); // open in new window

    return blob;

    
  }

  

  generateQrCode(id){
    const url = `/application/${id}/qrcode`;
    return this.api.post(url, null)
  }
}
