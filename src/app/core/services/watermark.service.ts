import { Injectable } from '@angular/core';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class WaterMarkService {
  public mergedPlans;
  private comliantImgPath = '../../assets/compliant.png';
  private forComplianceImgPath = '../../assets/forCompliance.png';
  public duplicatePdf;
  constructor(private api: ApiService) {}

  async insertWaterMark(doc_path: string, doc_type: string) {
    const url = doc_path;

    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    const pdfDocLoad = await PDFDocument.load(existingPdfBytes);

    const compliantImgBytes = await fetch(this.comliantImgPath).then((res) =>
      res.arrayBuffer()
    );
    const forComplianceImgBytes = await fetch(this.forComplianceImgPath).then(
      (res) => res.arrayBuffer()
    );

    const compliantImg = await pdfDocLoad.embedPng(compliantImgBytes);
    const forComplianceImg = await pdfDocLoad.embedPng(forComplianceImgBytes);

    const helveticaFont = await pdfDocLoad.embedFont(StandardFonts.Helvetica);

    const pages = pdfDocLoad.getPages();
    const pageCount = pages.length;
    const { width, height } = pages[0].getSize();
    var pngDims;

    var image = forComplianceImg.scaleToFit(width, height);

    console.log(width, height, image.width, image.height);
    console.log(pages[0].getWidth(), pages[0].getHeight());

    for (let i = 0; i < pageCount; i++) {
      switch (doc_type) {
        case 'compliant':
          pngDims = compliantImg.scaleToFit(width, height);
          pages[i].drawImage(compliantImg, {
            x: width / 2 - pngDims.width / 2 + 100,
            y: height / 2 + pngDims.height - 100,
            opacity: 0.8,
            rotate: degrees(-45),
            width: pngDims.width * 0.8,
            height: pngDims.height * 0.8,
          });

          break;

        case 'for-compliance':
          pngDims = forComplianceImg.scaleToFit(width, height);
          pages[i].drawImage(forComplianceImg, {
            x: width / 2 - pngDims.width / 2 + 100,
            y: height / 2 + pngDims.height - 100,
            opacity: 0.8,
            rotate: degrees(-45),
            width: pngDims.width * 0.7,
            height: pngDims.height * 0.7,
          });

        //   break;
        // case 'compliant':
        //   pages[i].drawText('Compliant', {
        //     x: width / 2 - 150,
        //     y: height / 2 + 150,
        //     size: 80,
        //     font: helveticaFont,
        //     color: rgb(0, 1, 0),
        //     opacity: 0.2,
        //     rotate: degrees(-45),
        //   });
        //   break;
        // case 'for-compliance':
        //   pages[i].drawText('Non Compliant', {
        //     x: width / 2 - 200,
        //     y: height / 2 + 150,
        //     size: 80,
        //     font: helveticaFont,
        //     color: rgb(1, 0, 0),
        //     opacity: 0.2,
        //     rotate: degrees(-45),
        //   });
        //   break;
      }
    }

    const pdfBytes = await pdfDocLoad.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const file = window.URL.createObjectURL(blob);
    window.open(file); // open in new window

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

  async merge(forms) {
    let architectural;
    let civil;
    let sanitary;
    let electrical;
    let electricalDesign;
    let buildingSpec;
    let billOfMaterials;
    let soilAnalysis;
    let structural;

    const architecturalUrl = forms.filter((e) => e.document_id == 59);
    const civilUrl = forms.filter((e) => e.document_id == 61);
    const sanitaryUrl = forms.filter((e) => e.document_id == 63);
    const electricalDesignUrl = forms.filter((e) => e.document_id == 30);
    const electricalUrl = forms.filter((e) => e.document_id == 62);
    const buildingSpecUrl = forms.filter((e) => e.document_id == 32);
    const billOfMaterialsUrl = forms.filter((e) => e.document_id == 33);
    const soilAnalysisUrl = forms.filter((e) => e.document_id == 31);
    const structuralUrl = forms.filter((e) => e.document_id == 29);

    const architectrualBytes = await this.convertToBytes(architecturalUrl);
    const civilBytes = await this.convertToBytes(civilUrl);
    const sanitaryBytes = await this.convertToBytes(sanitaryUrl);
    const electricalDesignBytes = await this.convertToBytes(
      electricalDesignUrl
    );
    const electricalBytes = await this.convertToBytes(electricalUrl);
    const buildingSpecBytes = await this.convertToBytes(buildingSpecUrl);
    const billOfMaterialsBytes = await this.convertToBytes(billOfMaterialsUrl);
    const soilAnalaysisBytes = await this.convertToBytes(soilAnalysisUrl);
    const structuralBytes = await this.convertToBytes(structuralUrl);

    if (architectrualBytes) {
      architectural = await PDFDocument.load(architectrualBytes);
    }
    if (civilBytes) {
      civil = await PDFDocument.load(civilBytes);
    }
    if (sanitaryBytes) {
      sanitary = await PDFDocument.load(sanitaryBytes);
    }
    if (electricalBytes) {
      electrical = await PDFDocument.load(electricalBytes);
    }
    if (electricalDesignBytes) {
      electricalDesign = await PDFDocument.load(electricalDesignBytes);
    }
    if (buildingSpecBytes) {
      buildingSpec = await PDFDocument.load(buildingSpecBytes);
    }
    if (billOfMaterialsBytes) {
      billOfMaterials = await PDFDocument.load(billOfMaterialsBytes);
    }
    if (soilAnalaysisBytes) {
      soilAnalysis = await PDFDocument.load(soilAnalaysisBytes);
    }
    if (structuralBytes) {
      structural = await PDFDocument.load(structuralBytes);
    }

    const mergedPdf = await PDFDocument.create();

    if (architectural) {
      const copiedPagesA = await mergedPdf.copyPages(
        architectural,
        architectural.getPageIndices()
      );
      copiedPagesA.forEach((page) => mergedPdf.addPage(page));
    }
    if (civil) {
      const copiedPagesB = await mergedPdf.copyPages(
        civil,
        civil.getPageIndices()
      );
      copiedPagesB.forEach((page) => mergedPdf.addPage(page));
    }

    if (sanitary) {
      const copiedPagesC = await mergedPdf.copyPages(
        sanitary,
        sanitary.getPageIndices()
      );
      copiedPagesC.forEach((page) => mergedPdf.addPage(page));
    }

    if (electrical) {
      const copiedPagesD = await mergedPdf.copyPages(
        electrical,
        electrical.getPageIndices()
      );
      copiedPagesD.forEach((page) => mergedPdf.addPage(page));
    }

    if (electricalDesign) {
      const copiedPagesE = await mergedPdf.copyPages(
        electricalDesign,
        electricalDesign.getPageIndices()
      );
      copiedPagesE.forEach((page) => mergedPdf.addPage(page));
    }

    if (buildingSpec) {
      const copiedPagesF = await mergedPdf.copyPages(
        buildingSpec,
        buildingSpec.getPageIndices()
      );
      copiedPagesF.forEach((page) => mergedPdf.addPage(page));
    }

    if (billOfMaterials) {
      const copiedPagesG = await mergedPdf.copyPages(
        billOfMaterials,
        billOfMaterials.getPageIndices()
      );
      copiedPagesG.forEach((page) => mergedPdf.addPage(page));
    }

    if (soilAnalysis) {
      const copiedPagesH = await mergedPdf.copyPages(
        soilAnalysis,
        soilAnalysis.getPageIndices()
      );
      copiedPagesH.forEach((page) => mergedPdf.addPage(page));
    }

    if (structural) {
      const copiedPagesI = await mergedPdf.copyPages(
        structural,
        structural.getPageIndices()
      );
      copiedPagesI.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfFile = await mergedPdf.save();

    const blob = new Blob([mergedPdfFile], { type: 'application/pdf' });
    const file = window.URL.createObjectURL(blob);
    this.mergedPlans = file;
    // window.open(file); // open in new window
  }

  async rotatePdf(pdfUrl) {
    // Fetch the PDF with form fields
    const formUrl = pdfUrl;
    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

    // Load a PDF with form fields
    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const firstPage = pdfDoc.getPages()[0];

    console.log('rotation', firstPage.getRotation());

    firstPage.setRotation(degrees(0));

    console.log('rotated', firstPage.getRotation());

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const file = window.URL.createObjectURL(blob);
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
    window.open(file);
  }

  convertToBytes(url) {
    if (url[0]) {
      const bytes = fetch(url[0].document_path).then((res) =>
        res.arrayBuffer()
      );
      return bytes;
    }
  }

  convertBytes(url) {
    if (url) {
      const bytes = fetch(url).then((res) => res.arrayBuffer());
      return bytes;
    }
  }

  async duplicate(formUrl) {
    let architectural;
    const architectrualBytes = await this.convertBytes(formUrl);

    architectural = await PDFDocument.load(architectrualBytes);

    const mergedPdf = await PDFDocument.create();

    if (architectural) {
      const copiedPagesA = await mergedPdf.copyPages(
        architectural,
        architectural.getPageIndices()
      );
      copiedPagesA.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfFile = await mergedPdf.save();

    const blob = new Blob([mergedPdfFile], { type: 'application/pdf' });
    const file = window.URL.createObjectURL(blob);
    // this.mergedPlans = file;
  }

  generateQrCode(id) {
    const url = `/application/${id}/qrcode`;
    return this.api.post(url, null);
  }
}
