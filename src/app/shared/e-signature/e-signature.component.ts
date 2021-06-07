import { Component, OnInit, Input } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  CdkDragEnd,
  CdkDragStart,
  CdkDragMove,
  CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Component({
  selector: 'app-e-signature',
  templateUrl: './e-signature.component.html',
  styleUrls: ['./e-signature.component.scss'],
})
export class ESignatureComponent implements OnInit {
  public src = '../../../assets/forms/bldg-permit-certificate.pdf';
  dragDroppables: any[];
  state = '';
  position = '';
  xAxis;
  yAxis;
  @Input() props: [{ [key: string]: object | any }];

  constructor() {}

  ngOnInit(): void {
    this.dragDroppables = this.props;
  }

  public dragEnded(event: CdkDragEnd) {
    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);
    this.xAxis = boundingClientRect.x - parentPosition.left;
    this.yAxis = boundingClientRect.y - parentPosition.top;

    alert(`x: ${this.xAxis} y:${this.yAxis}`);
  }
  getPosition(el) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  async insertQrCode() {
    const url = this.src;
    const qr_code_bytes = await fetch('../../../assets/esig.png').then((res) =>
      res.arrayBuffer()
    );

    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    const pdfDocLoad = await PDFDocument.load(existingPdfBytes);
    const qr_code = await pdfDocLoad.embedPng(qr_code_bytes);

    const pages = pdfDocLoad.getPages();

    const { width, height } = pages[0].getSize();
    const pngDims = qr_code.scale(0.5);

    pages[0].drawImage(qr_code, {
      x: this.xAxis - 100,
      y: this.yAxis - 800,
      // x: 0,
      // y: 0,
      width: pngDims.width / 2.5,
      height: pngDims.height / 2.5,
    });

    const pdfBytes = await pdfDocLoad.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const file = window.URL.createObjectURL(blob);
    // window.open(file); // open in new window
    window.open('../../../assets/bldg-permit-certificate.pdf')
    return blob;
  }
}
