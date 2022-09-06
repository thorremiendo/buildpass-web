import { Injectable } from '@angular/core';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class NoticeOfViolationService {
  blankPdf =
    'https://s3-ap-southeast-1.amazonaws.com/buildpass-storage/4ujB30us1NJT3nThPiy5ZalTejxrxx5VEfLBPTMG.pdf';
  photoA =
    'https://s3-ap-southeast-1.amazonaws.com/buildpass-storage/hC9fFkAwKRu1qssaUXZsSI6rGrW1jzHtY22JuE6r.jpg';
  photoB =
    'https://s3-ap-southeast-1.amazonaws.com/buildpass-storage/oTUjkXvi6Mc7REabfZXmj8yIqCcllH6AOZBjuaHl.jpg';
  constructor() {}

  async insertWaterMark() {
    const url = this.blankPdf;
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDocLoad = await PDFDocument.load(existingPdfBytes, {
      parseSpeed: Infinity,
    });

    const photoABytes = await fetch(this.photoA).then((res) =>
      res.arrayBuffer()
    );
    const photoBBytes = await fetch(this.photoB).then((res) =>
      res.arrayBuffer()
    );

    const photoA = await pdfDocLoad.embedJpg(photoABytes);
    const photoB = await pdfDocLoad.embedJpg(photoBBytes);

    const helveticaFont = await pdfDocLoad.embedFont(StandardFonts.Helvetica);

    const pages = pdfDocLoad.getPages();

    const pageCount = pages.length;
    const { width, height } = pages[0].getSize();
    var pngDims;

    var image = photoB.scaleToFit(width, height);

    // console.log(width, height, image.width, image.height);
    // console.log(pages[0].getWidth(), pages[0].getHeight());

    for (let i = 0; i < pageCount; i++) {
      pngDims = photoA.scaleToFit(width, height);
      pages[i].drawImage(photoA, {
        x: width / 4,
        y: height / 2,
        width: pngDims.width * 0.5,
        height: pngDims.height * 0.5,
      });

      pngDims = photoB.scaleToFit(width, height);
      pages[i].drawImage(photoB, {
        x: width / 4,
        y: height / 4,
        width: pngDims.width * 0.5,
        height: pngDims.height * 0.5,
      });
    }

    const pdfBytes = await pdfDocLoad.save({
      objectsPerTick: Infinity,
    });

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const file = window.URL.createObjectURL(blob);
    window.open(file); // open in new window
    return blob;
  }
}
