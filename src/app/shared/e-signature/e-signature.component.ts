import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { NewApplicationFormService } from './../../core/services/new-application-form-service';
import { WaterMarkService } from './../../core/services/watermark.service';
import { EsigPdfPreviewComponent } from './../esig-pdf-preview/esig-pdf-preview.component';
import { EsignatureService } from 'src/app/core/services/esignature.service';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import {
  CdkDragStart,
  CdkDragEnd,
  CdkDragMove,
  CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { PDFDocument, degrees, breakTextIntoLines } from 'pdf-lib';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'app-e-signature',
  templateUrl: './e-signature.component.html',
  styleUrls: ['./e-signature.component.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('1500ms ease-out')),
      transition('default => rotated', animate('400ms ease-in')),
    ]),
  ],
})
export class ESignatureComponent implements OnInit {
  private minimumHeight = 80;
  private minimumWidth = null;
  private maximumHeight = 180;
  private maximumWidth = null;
  private originalHeight = null;
  private originalWidth = null;
  private originalX = null;
  private originalY = null;
  private originalMouseX = null;
  private originalMouseY = null;
  private esigImage = null;
  public documentId;
  public applicationId;
  public pdfSource;
  public esigSource;
  public targetPage = 1;
  public isLoading: boolean = false;
  public documentInfo;
  public userDocuments;
  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationInfoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private esignatureService: EsignatureService,
    public dialog: MatDialog,
    private waterMarkService: WaterMarkService,
    private newApplicationService: NewApplicationService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.applicationId = this.route.snapshot.params.id;
    this.documentId = this.route.snapshot.params.docId;
    this.esigSource = this.esignatureService.userSignature;
    this.getImageDimensions(this.esigSource);

    this.applicationService
      .fetchSpecificDocInfo(this.documentId)
      .subscribe((res) => {
        this.documentInfo = res.data[0];
        this.pdfSource = res.data[0].document_path;
        this.newApplicationService
          .fetchApplicationInfo(this.applicationId)
          .subscribe((res) => {
            this.isLoading = false;
            this.userDocuments = res.data.user_docs;
          });
      });
  }

  getImageDimensions(data) {
    const photoBlock = data.split(';');
    const photoContentType = photoBlock[0].split(':')[1];
    const photoRealData = photoBlock[1].split(',')[1];
    const photoBlob = this.b64toBlob(photoRealData, photoContentType);

    let reader = new FileReader();
    reader.onload = (res) => {
      this.esigImage = new Image();
      this.esigImage.src = reader.result;
      if (Math.abs(this.esigImage.width) > Math.abs(this.esigImage.height)) {
        this.minimumWidth =
          this.minimumHeight / (this.esigImage.height / this.esigImage.width);
        this.maximumWidth =
          this.maximumHeight / (this.esigImage.height / this.esigImage.width);
      } else {
        this.minimumWidth =
          this.minimumHeight * (this.esigImage.width / this.esigImage.height);
        this.maximumWidth =
          this.maximumHeight * (this.esigImage.width / this.esigImage.height);
      }
    };
    reader.readAsDataURL(photoBlob);
  }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  dragStart($event) {
    const esigContainer = document.getElementById('e-sig-container');
    this.originalHeight = parseFloat(
      getComputedStyle(esigContainer, null)
        .getPropertyValue('height')
        .replace('px', '')
    );
    this.originalWidth = parseFloat(
      getComputedStyle(esigContainer, null)
        .getPropertyValue('width')
        .replace('px', '')
    );
    this.originalX = esigContainer.getBoundingClientRect().left;
    this.originalY = esigContainer.getBoundingClientRect().top;
    this.originalMouseX = $event.pageX;
    this.originalMouseY = $event.pageY;
  }

  dragEnd(event: CdkDragEnd) {
    const rootContainer = document
      .getElementById('e-signature')
      .getBoundingClientRect();
    const esigContainer = document.getElementById('e-sig-container');
    const xCoordinate =
      esigContainer.getBoundingClientRect().left - rootContainer.left;
    const yCoordinate =
      esigContainer.getBoundingClientRect().top - rootContainer.top;

    const breadCrumbsOffset = document.getElementsByClassName(
      'page-breadcrumb'
    )[0]
      ? document
          .getElementsByClassName('page-breadcrumb')[0]
          .getBoundingClientRect().height + 16
      : 0;

    esigContainer.style.top = `${yCoordinate + breadCrumbsOffset + 15}px`;
    esigContainer.style.left = `${xCoordinate + 15}px`;
    esigContainer.style.transform = null;
    event.source._dragRef.reset();
  }

  dragOver($event) {
    $event.preventDefault();
  }

  resize($event) {
    const matSidenavContent = document.getElementsByClassName(
      'mat-sidenav-content'
    )[0];
    const esigContainer = document.getElementById('e-sig-container');
    const offsetX = $event.pageX - this.originalMouseX - 15;
    const offsetY = $event.pageY - this.originalMouseY - 15;

    const sideBarOffset = document.querySelectorAll(
      '.mat-sidenav.mat-drawer-opened'
    )[0]
      ? document
          .querySelectorAll('.mat-sidenav.mat-drawer-opened')[0]
          .getBoundingClientRect().width
      : 0;
    const breadCrumbsOffset = document.getElementsByClassName(
      'page-breadcrumb'
    )[0]
      ? document
          .getElementsByClassName('page-breadcrumb')[0]
          .getBoundingClientRect().height + 16
      : 0;

    if ($event.clientX != 0 && $event.clientY != 0) {
      if ($event.target.classList.contains('bottom-right-resize')) {
        const height =
          this.originalHeight + ($event.pageY - this.originalMouseY);
        const width = this.originalWidth + ($event.pageX - this.originalMouseX);
        if (
          height >= this.minimumHeight &&
          height <= this.maximumHeight &&
          width >= this.minimumWidth &&
          width <= this.maximumWidth
        ) {
          esigContainer.style.height = height + 'px';
          esigContainer.style.width = width + 'px';

          if (Math.abs(offsetX) > Math.abs(offsetY)) {
            esigContainer.style.height =
              width * (this.esigImage.height / this.esigImage.width) + 'px';
          } else {
            esigContainer.style.width =
              height * (this.esigImage.width / this.esigImage.height) + 'px';
          }
        }
      } else if ($event.target.classList.contains('bottom-left-resize')) {
        const height =
          this.originalHeight + ($event.pageY - this.originalMouseY);
        const width = this.originalWidth - ($event.pageX - this.originalMouseX);
        if (
          height >= this.minimumHeight &&
          height <= this.maximumHeight &&
          width >= this.minimumWidth &&
          width <= this.maximumWidth
        ) {
          esigContainer.style.height = height + 'px';
          esigContainer.style.width = width + 'px';
          esigContainer.style.left =
            this.originalX +
            ($event.pageX - this.originalMouseX) -
            sideBarOffset +
            'px';

          if (Math.abs(offsetX) > Math.abs(offsetY)) {
            esigContainer.style.height =
              width * (this.esigImage.height / this.esigImage.width) + 'px';
          } else {
            esigContainer.style.width =
              height * (this.esigImage.width / this.esigImage.height) + 'px';
            const computedStyle = getComputedStyle(esigContainer);
            esigContainer.style.left =
              Number(computedStyle.left.replace('px', '')) +
              (width - Number(computedStyle.width.replace('px', ''))) +
              'px';
          }
        }
      } else if ($event.target.classList.contains('top-right-resize')) {
        const height =
          this.originalHeight - ($event.pageY - this.originalMouseY);
        const width = this.originalWidth + ($event.pageX - this.originalMouseX);
        if (
          height >= this.minimumHeight &&
          height <= this.maximumHeight &&
          width >= this.minimumWidth &&
          width <= this.maximumWidth
        ) {
          esigContainer.style.height = height + 'px';
          esigContainer.style.top =
            this.originalY +
            matSidenavContent.scrollTop +
            ($event.pageY - this.originalMouseY) -
            breadCrumbsOffset +
            24 +
            'px';
          esigContainer.style.width = width + 'px';

          if (Math.abs(offsetX) > Math.abs(offsetY)) {
            esigContainer.style.height =
              width * (this.esigImage.height / this.esigImage.width) + 'px';
            const computedStyle = getComputedStyle(esigContainer);
            esigContainer.style.top =
              Number(computedStyle.top.replace('px', '')) +
              (height - Number(computedStyle.height.replace('px', ''))) +
              'px';
          } else {
            esigContainer.style.width =
              height * (this.esigImage.width / this.esigImage.height) + 'px';
          }
        }
      } else if ($event.target.classList.contains('top-left-resize')) {
        const height =
          this.originalHeight - ($event.pageY - this.originalMouseY);
        const width = this.originalWidth - ($event.pageX - this.originalMouseX);
        if (
          height >= this.minimumHeight &&
          height <= this.maximumHeight &&
          width >= this.minimumWidth &&
          width <= this.maximumWidth
        ) {
          esigContainer.style.height = height + 'px';
          esigContainer.style.top =
            this.originalY +
            matSidenavContent.scrollTop +
            ($event.pageY - this.originalMouseY) -
            breadCrumbsOffset +
            24 +
            'px';
          esigContainer.style.width = width + 'px';
          esigContainer.style.left =
            this.originalX +
            ($event.pageX - this.originalMouseX) -
            sideBarOffset +
            'px';

          if (Math.abs(offsetX) > Math.abs(offsetY)) {
            esigContainer.style.height =
              width * (this.esigImage.height / this.esigImage.width) + 'px';
            const computedStyle = getComputedStyle(esigContainer);
            esigContainer.style.top =
              Number(computedStyle.top.replace('px', '')) +
              (height - Number(computedStyle.height.replace('px', ''))) +
              'px';
          } else {
            esigContainer.style.width =
              height * (this.esigImage.width / this.esigImage.height) + 'px';
            const computedStyle = getComputedStyle(esigContainer);
            esigContainer.style.left =
              Number(computedStyle.left.replace('px', '')) +
              (width - Number(computedStyle.width.replace('px', ''))) +
              'px';
          }
        }
      }
    }
  }

  // rotate() {
  //   this.esigRotation = this.getCurrentRotation() + 90;
  //   const resizeContainer = document.getElementById('resize-container');
  //   resizeContainer.style.transform = `rotate(${this.esigRotation}deg)`;
  // }

  getCurrentRotation() {
    var st = window.getComputedStyle(
      document.getElementById('resize-container'),
      null
    );
    var tm =
      st.getPropertyValue('-webkit-transform') ||
      st.getPropertyValue('-moz-transform') ||
      st.getPropertyValue('-ms-transform') ||
      st.getPropertyValue('-o-transform') ||
      st.getPropertyValue('transform') ||
      'none';
    if (tm != 'none') {
      var values = tm.split('(')[1].split(')')[0].split(',');
      var angle = Math.round(
        Math.atan2(Number(values[1]), Number(values[0])) * (180 / Math.PI)
      );
      return angle;
    }
    return 0;
  }

  getCoordinates(pages) {
    const DOMPage = document.getElementsByClassName('page')[0];
    const pageOriginX = DOMPage.getBoundingClientRect().left;
    const pageOriginY = DOMPage.getBoundingClientRect().top;
    const pageRotation = pages[this.targetPage - 1].getRotation().angle % 360;
    const esigImageContainer = document
      .getElementById('e-sig-image-container')
      .getBoundingClientRect();

    let imageHeight = null;
    let imageWidth = null;
    let xPercent = null;
    let yPercent = null;
    let xCoordinate = null;
    let yCoordinate = null;

    if (pageRotation == 0 || pageRotation == 180) {
      imageHeight =
        (esigImageContainer.height / DOMPage.getBoundingClientRect().height) *
        pages[this.targetPage - 1].getSize().height;
      imageWidth =
        (esigImageContainer.width / DOMPage.getBoundingClientRect().width) *
        pages[this.targetPage - 1].getSize().width;
      xPercent =
        (esigImageContainer.left - pageOriginX) /
        DOMPage.getBoundingClientRect().width;
      yPercent =
        (esigImageContainer.top - pageOriginY) /
        DOMPage.getBoundingClientRect().height;
      xCoordinate = xPercent * pages[this.targetPage - 1].getSize().width;
      yCoordinate = yPercent * pages[this.targetPage - 1].getSize().height;
    } else if (pageRotation == 90 || pageRotation == 270) {
      imageHeight =
        (esigImageContainer.height / DOMPage.getBoundingClientRect().width) *
        pages[this.targetPage - 1].getSize().height;
      imageWidth =
        (esigImageContainer.width / DOMPage.getBoundingClientRect().height) *
        pages[this.targetPage - 1].getSize().width;
      xPercent =
        (esigImageContainer.left - pageOriginX) /
        DOMPage.getBoundingClientRect().width;
      yPercent =
        (esigImageContainer.top - pageOriginY) /
        DOMPage.getBoundingClientRect().height;
      xCoordinate = xPercent * pages[this.targetPage - 1].getSize().height;
      yCoordinate = yPercent * pages[this.targetPage - 1].getSize().width;
    }

    switch (pageRotation) {
      case 0:
        return {
          imageHeight: imageHeight,
          imageWidth: imageWidth,
          xCoordinate: xCoordinate,
          yCoordinate:
            pages[this.targetPage - 1].getSize().height -
            yCoordinate -
            imageHeight,
          rotation: pageRotation,
          page: this.targetPage - 1,
        };
      case 90: {
        return {
          imageHeight: imageHeight,
          imageWidth: imageWidth,
          xCoordinate: yCoordinate + imageHeight,
          yCoordinate: xCoordinate,
          rotation: pageRotation,
          page: this.targetPage - 1,
        };
      }
      case 180:
        return {
          imageHeight: imageHeight,
          imageWidth: imageWidth,
          xCoordinate: pages[this.targetPage - 1].getSize().width - xCoordinate,
          yCoordinate: yCoordinate + imageHeight,
          rotation: pageRotation,
          page: this.targetPage - 1,
        };
      case 270:
        return {
          imageHeight: imageHeight,
          imageWidth: imageWidth,
          xCoordinate:
            pages[this.targetPage - 1].getSize().width -
            yCoordinate -
            imageHeight,
          yCoordinate:
            pages[this.targetPage - 1].getSize().height - xCoordinate,
          rotation: pageRotation,
          page: this.targetPage - 1,
        };
    }
  }

  previousPage() {
    if (this.targetPage - 1 != 0) {
      this.targetPage = this.targetPage - 1;
    }
  }

  nextPage() {
    this.targetPage = this.targetPage + 1;
  }

  async insertEsig() {
    this.isLoading = true;
    const esigBuffer = await fetch(this.esigSource).then((res) =>
      res.arrayBuffer()
    );
    const pdfBuffer = await fetch(this.pdfSource).then((res) =>
      res.arrayBuffer()
    );
    const pdfDocLoad = await PDFDocument.load(pdfBuffer);
    const eSig = await pdfDocLoad.embedPng(esigBuffer);

    const pages = pdfDocLoad.getPages();
    const data = this.getCoordinates(pages);

    pages[data.page].drawImage(eSig, {
      x: data.xCoordinate,
      y: data.yCoordinate,
      height: data.imageHeight,
      width: data.imageWidth,
      rotate: degrees(Number(data.rotation)),
    });

    const pdfBytes = await pdfDocLoad.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const body = {
      document_path: blob,
    };
    this.applicationService.updateDocumentFile(body, this.documentId).subscribe(
      (res) => {
        if (this.documentInfo.document_id == 50) {
          const body = {
            application_status_id: 8,
            bo_status_id: 1,
          };
          this.applicationService
            .updateApplicationStatus(body, this.applicationId)
            .subscribe((res) => {
              this.addWatermarkToAllCompliant();
            });
        } else {
          this.isLoading = false;
          this.openSnackBar('Success!');
          setTimeout(() => {
            this.router.navigate([
              '/evaluator/application',
              this.applicationId,
            ]);
          }, 1000);
        }
      },
      (err) => {
        this.isLoading = false;
        this.openSnackBar('An error occured. Please try again.');
        setTimeout(() => {
          this.router.navigate(['/evaluator/application', this.applicationId]);
        }, 1000);
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  openFilePreview(blob) {
    const dialogRef = this.dialog.open(EsigPdfPreviewComponent, {
      width: '1000px',
      data: {
        pdf: blob,
        applicationId: this.applicationId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  addWatermarkToAllCompliant() {
    var count = 0;
    var bar = new Promise<void>((resolve, reject) => {
      this.userDocuments.forEach((element, index, array) => {
        this.isLoading = true;
        if (element.document_id !== 50) {
          this.waterMarkService
            .insertWaterMark(element.document_path, 'compliant')
            .then((blob) => {
              const updateFileData = {
                document_status_id: 1,
                document_path: blob,
              };
              this.newApplicationService
                .updateDocumentFile(updateFileData, element.id)
                .subscribe((res) => {
                  count = count + 1;
                  if (count === array.length - 1) {
                    this.isLoading = false;
                    this.openSnackBar('Success!');
                    setTimeout(() => {
                      this.router.navigate([
                        '/evaluator/application',
                        this.applicationId,
                      ]);
                    }, 1000);
                  }
                });
            });
        }
      });
    });
  }
}
