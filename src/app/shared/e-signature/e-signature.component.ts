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
import { PDFDocument, degrees } from 'pdf-lib';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-e-signature',
  templateUrl: './e-signature.component.html',
  styleUrls: ['./e-signature.component.scss'],
})
export class ESignatureComponent implements OnInit {
  @Input() props: [{ [key: string]: object | any }];
  public src;
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
  private esigRotation = 0;
  public documentId;
  public applicationId;
  public documentPath;
  public isLoading: boolean;
  public userDetails;
  public userSignature;
  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationInfoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private esignatureService: EsignatureService
  ) {}

  ngOnInit() {
    // this.openDialog();
    this.isLoading = true;
    this.userDetails = JSON.parse(localStorage.getItem('user'));
    this.applicationId = this.route.snapshot.params.id;
    this.documentId = this.route.snapshot.params.docId;
    this.userSignature = this.esignatureService.userSignature;
    this.esigImage = new Image();
    this.esigImage.src = this.userSignature;
    if (Math.abs(this.esigImage.width) > Math.abs(this.esigImage.height)) {
      this.minimumWidth = this.minimumHeight / (this.esigImage.height / this.esigImage.width);
      this.maximumWidth = this.maximumHeight / (this.esigImage.height / this.esigImage.width);
    } else {
      this.minimumWidth = this.minimumHeight * (this.esigImage.width / this.esigImage.height);
      this.maximumWidth = this.maximumHeight * (this.esigImage.width / this.esigImage.height);
    }
    this.applicationService
      .fetchSpecificDocInfo(this.documentId)
      .subscribe((res) => {
        this.src =
          res.data[0].document_history[
            res.data[0].document_history.length - 1
          ].document_path;
        this.isLoading = false;
      });
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
        const height = this.originalHeight + ($event.pageY - this.originalMouseY);
        const width = this.originalWidth + ($event.pageX - this.originalMouseX);
        if (height >= this.minimumHeight && height <= this.maximumHeight && width >= this.minimumWidth && width <= this.maximumWidth) {
          esigContainer.style.height = height + 'px';
          esigContainer.style.width = width + 'px';

          if (Math.abs(offsetX) > Math.abs(offsetY)) {
            esigContainer.style.height = width * (this.esigImage.height / this.esigImage.width) + 'px';
          } else {
            esigContainer.style.width = height * (this.esigImage.width / this.esigImage.height) + 'px';
          }
        }
      } else if ($event.target.classList.contains('bottom-left-resize')) {
        const height = this.originalHeight + ($event.pageY - this.originalMouseY);
        const width = this.originalWidth - ($event.pageX - this.originalMouseX);
        if (height >= this.minimumHeight && height <= this.maximumHeight && width >= this.minimumWidth && width <= this.maximumWidth) {
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
        const height = this.originalHeight - ($event.pageY - this.originalMouseY);
        const width = this.originalWidth + ($event.pageX - this.originalMouseX);
        if (height >= this.minimumHeight && height <= this.maximumHeight && width >= this.minimumWidth && width <= this.maximumWidth) {
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
        const height = this.originalHeight - ($event.pageY - this.originalMouseY);
        const width = this.originalWidth - ($event.pageX - this.originalMouseX);
        if (height >= this.minimumHeight && height <= this.maximumHeight && width >= this.minimumWidth && width <= this.maximumWidth) {
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

  rotate() {
    this.esigRotation = this.getCurrentRotation() + 90;
    const resizeContainer = document.getElementById('resize-container');
    resizeContainer.style.transform = `rotate(${this.esigRotation}deg)`;
  }

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

  getTargetPage() {
    const esigTop = document
      .getElementById('e-sig-image-container')
      .getBoundingClientRect().top;
    const pages = document.getElementsByClassName('page');
    for (let i = 0; i < pages.length; i++) {
      const pageBottom = pages[i].getBoundingClientRect().bottom;
      if (Number(esigTop) < Number(pageBottom)) {
        return i;
      }
    }
  }

  getCoordinates(pages) {
    const targetPage = this.getTargetPage();
    const DOMPages = document.getElementsByClassName('page');
    const pageOriginX = DOMPages[targetPage].getBoundingClientRect().left;
    const pageOriginY = DOMPages[targetPage].getBoundingClientRect().top;

    const esigImageContainer = document.getElementById('e-sig-image-container').getBoundingClientRect();
    const imageHeight = (esigImageContainer.height / DOMPages[targetPage].getBoundingClientRect().height) * pages[targetPage].getSize().height;
    const imageWidth = (esigImageContainer.width / DOMPages[targetPage].getBoundingClientRect().width) * pages[targetPage].getSize().width;
    const xPercent = (esigImageContainer.left - pageOriginX) / DOMPages[targetPage].getBoundingClientRect().width;
    const yPercent = (esigImageContainer.top - pageOriginY) / DOMPages[targetPage].getBoundingClientRect().height;
    const xCoordinate = xPercent * pages[targetPage].getSize().width;
    const yCoordinate = yPercent * pages[targetPage].getSize().height;

    let data = {
      imageHeight: imageHeight,
      imageWidth: imageWidth,
      xCoordinate: xCoordinate,
      yCoordinate: pages[targetPage].getSize().height - yCoordinate - imageHeight,
      rotation: this.esigRotation,
      page: targetPage,
    };

    if (this.esigRotation == 90 || this.esigRotation == 270) {
      data.imageHeight = imageWidth;
      data.imageWidth = imageHeight;

      if (this.esigRotation == 90) {
        data.rotation = 270;
        data.xCoordinate = xCoordinate;
        data.yCoordinate = pages[targetPage].getSize().height - yCoordinate;
      } else if (this.esigRotation == 270) {
        data.rotation = 90;
        data.xCoordinate = xCoordinate + imageWidth;
      }
    } else if (this.esigRotation == 180) {
      data.xCoordinate = xCoordinate + imageWidth;
      data.yCoordinate = pages[targetPage].getSize().height - yCoordinate;
    }

    return data;
  }

  async insertEsig() {
    const esignatureBuffer = await fetch(this.userSignature).then((res) =>
      res.arrayBuffer()
    );
    const existingPdfBytes = await fetch(this.src).then((res) =>
      res.arrayBuffer()
    );
    const pdfDocLoad = await PDFDocument.load(existingPdfBytes);
    const eSig = await pdfDocLoad.embedPng(esignatureBuffer);

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
    // const file = window.URL.createObjectURL(blob);
    // window.open(file);
    this.isLoading = true;
    const body = {
      // document_status_id: 1,
      document_path: blob,
    };
    this.applicationService
      .updateDocumentFile(body, this.documentId)
      .subscribe((res) => {
        this.isLoading = false;
        this.openSnackBar('Success!');
        setTimeout(() => {
          this.router.navigate(['/evaluator/application', this.applicationId]);
        }, 1000);
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      // horizontalPosition: 'right',
      // verticalPosition: 'top',
    });
  }
}
