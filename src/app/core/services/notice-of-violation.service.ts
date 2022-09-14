import { Injectable } from '@angular/core';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { ApiService } from './api.service';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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

  constructor(private api: ApiService) {}

  getAllNovs() {
    const url = `/noticeofviolation`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  uploadFile(body) {
    const url = `/noticeofviolation/upload-file`;
    return this.api.post(url, body);
  }

  getActions(id) {
    const url = `/noticeofviolation/actions/${id}`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  addNov(body) {
    const url = `/noticeofviolation`;
    return this.api.post(url, body);
  }

  addSubNov(body) {
    const url = `/noticeofviolation/sub`;
    return this.api.post(url, body);
  }

  updateSub(body, id) {
    const url = `/noticeofviolation/sub/${id}`;
    return this.api.post(url, body);
  }

  addRemarks(body) {
    const url = `/noticeofviolation/remark`;
    return this.api.post(url, body);
  }

  getSubById(id) {
    const url = `/noticeofviolation/sub/${id}`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }
  getMainById(id) {
    const url = `/noticeofviolation/${id}`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  getInvestigatorNov(id) {
    const url = `/noticeofviolation/${id}/evaluator`;
    return this.api.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError('Something went wrong.');
      })
    );
  }

  async generatePdf(photoApath, photoBpath) {
    const url = this.blankPdf;
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDocLoad = await PDFDocument.load(existingPdfBytes, {
      parseSpeed: Infinity,
    });

    const photoABytes = await fetch(photoApath).then((res) =>
      res.arrayBuffer()
    );
    const photoBBytes = await fetch(photoBpath).then((res) =>
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
    // const file = window.URL.createObjectURL(blob);
    // window.open(file); // open in new window
    return blob;
  }

  async inserEsig(pdfSource, esigSource) {
    const url = pdfSource;
    const qr_code_bytes = await fetch(esigSource).then((res) =>
      res.arrayBuffer()
    );

    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    const pdfDocLoad = await PDFDocument.load(existingPdfBytes, {
      parseSpeed: Infinity,
    });
    const qr_code = await pdfDocLoad.embedPng(qr_code_bytes);

    const pages = pdfDocLoad.getPages();
    const pageCount = pages.length;
    const { width, height } = pages[0].getSize();
    const pngDims = qr_code.scale(0.5);
    const pngDimsfire = qr_code.scale(0.4);

    for (let i = 0; i < pageCount; i++) {
      pages[0].drawImage(qr_code, {
        x: width / 2 + 100,
        y: height / 2 - 460,
        width: pngDims.width * 0.6,
        height: pngDims.height * 0.6,
      });
    }

    const pdfBytes = await pdfDocLoad.save({ objectsPerTick: Infinity });
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const file = window.URL.createObjectURL(blob);
    window.open(file); // open in new window
    debugger;
    // return blob;
  }
}
