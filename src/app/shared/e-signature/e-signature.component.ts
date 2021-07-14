import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordPromptComponent } from './../password-prompt/password-prompt.component';
import { Component, OnInit, Input } from '@angular/core';
import {
  CdkDragStart,
  CdkDragEnd,
  CdkDragMove,
  CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { PDFDocument } from 'pdf-lib';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-e-signature',
  templateUrl: './e-signature.component.html',
  styleUrls: ['./e-signature.component.scss'],
})
export class ESignatureComponent implements OnInit {
  @Input() props: [{ [key: string]: object | any }];
  public src;
  private minimumHeight = null;
  private minimumWidth = null;
  private originalHeight = null;
  private originalWidth = null;
  private originalX = null;
  private originalY = null;
  private originalMouseX = null;
  private originalMouseY = null;
  private esigImage = null;
  public documentId;
  public applicationId;
  public documentPath;
  public isLoading: boolean;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private applicationService: ApplicationInfoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    // this.openDialog();
    this.isLoading = true;
    this.applicationId = this.route.snapshot.params.id;
    this.documentId = this.route.snapshot.params.docId;
    console.log(this.documentId);
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

  openDialog() {
    const dialogRef = this.dialog.open(PasswordPromptComponent, {
      disableClose: true,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngAfterViewInit() {
    if (!this.isLoading) {
      const esigImageContainer = document.getElementById(
        'e-sig-image-container'
      );
      const computedStyle = getComputedStyle(esigImageContainer);
      const src = computedStyle.backgroundImage.replace(
        /url\((['"])?(.*?)\1\)/gi,
        '$2'
      );
      this.esigImage = new Image();
      this.esigImage.src = src;
    }
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

    if (!this.minimumHeight && !this.minimumWidth) {
      this.minimumHeight = this.originalHeight / 4;
      this.minimumWidth = this.originalWidth / 4;
    }
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
    esigContainer.style.top = `${yCoordinate}px`;
    esigContainer.style.left = `${xCoordinate}px`;
    esigContainer.style.transform = null;
    event.source._dragRef.reset();
  }

  dragOver($event) {
    $event.preventDefault();
  }

  resize($event) {
    const esigContainer = document.getElementById('e-sig-container');
    const offsetX = $event.pageX - this.originalMouseX;
    const offsetY = $event.pageY - this.originalMouseY;

    if ($event.clientX != 0 && $event.clientY != 0) {
      if ($event.target.classList.contains('bottom-right-resize')) {
        const height =
          this.originalHeight + ($event.pageY - this.originalMouseY);
        const width = this.originalWidth + ($event.pageX - this.originalMouseX);
        if (height > this.minimumHeight && width > this.minimumWidth) {
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
        if (height > this.minimumHeight && width > this.minimumWidth) {
          esigContainer.style.height = height + 'px';
          esigContainer.style.width = width + 'px';
          esigContainer.style.left =
            this.originalX + ($event.pageX - this.originalMouseX) + 'px';

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
        if (height > this.minimumHeight && width > this.minimumWidth) {
          esigContainer.style.height = height + 'px';
          esigContainer.style.top =
            this.originalY +
            window.scrollY +
            ($event.pageY - this.originalMouseY) +
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
        if (height > this.minimumHeight && width > this.minimumWidth) {
          esigContainer.style.height = height + 'px';
          esigContainer.style.top =
            this.originalY +
            window.scrollY +
            ($event.pageY - this.originalMouseY) +
            'px';
          esigContainer.style.width = width + 'px';
          esigContainer.style.left =
            this.originalX + ($event.pageX - this.originalMouseX) + 'px';

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

  async insertEsig() {
    const qrCodeBytes = await fetch('../../../assets/esig.png').then((res) =>
      res.arrayBuffer()
    );
    const existingPdfBytes = await fetch(this.src).then((res) =>
      res.arrayBuffer()
    );
    const pdfDocLoad = await PDFDocument.load(existingPdfBytes);
    const qrCode = await pdfDocLoad.embedPng(qrCodeBytes);

    const DOMPages = document.getElementsByClassName('page');
    const pages = pdfDocLoad.getPages();

    const rootContainer = document
      .getElementById('e-signature')
      .getBoundingClientRect();
    const esigImageContainer = document
      .getElementById('e-sig-image-container')
      .getBoundingClientRect();
    const pdfImageHeight =
      (esigImageContainer.height / DOMPages[0].getBoundingClientRect().height) *
      pages[0].getSize().height;
    const pdfImageWidth =
      (esigImageContainer.width / DOMPages[0].getBoundingClientRect().width) *
      pages[0].getSize().width;

    const xPercent =
      (esigImageContainer.left - rootContainer.left) /
      DOMPages[0].getBoundingClientRect().width;
    const yPercent =
      (esigImageContainer.top - rootContainer.top) /
      DOMPages[0].getBoundingClientRect().height;
    const pdfXCoordinate = xPercent * pages[0].getSize().width;
    const pdfYCoordinate = yPercent * pages[0].getSize().height;

    pages[0].drawImage(qrCode, {
      x: pdfXCoordinate,
      y: pages[0].getSize().height - pdfYCoordinate - pdfImageHeight,
      height: pdfImageHeight,
      width: pdfImageWidth,
    });

    const pdfBytes = await pdfDocLoad.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const file = window.URL.createObjectURL(blob);
    // window.open(file);
    this.isLoading = true;
    const body = {
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
