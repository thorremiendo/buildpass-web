import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @Input() description: string;
  @Input() path: string;
  @Input() info: string;
  @Input() optional: string;
  @Output() emitFile: EventEmitter<File> = new EventEmitter<File>();
  @Output() emitNotApplicable: EventEmitter<File> = new EventEmitter<File>();
  public filePath: string;
  public editMode: boolean = false;
  public loading: boolean = false;
  public isOptional: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.filePath = this.path;
  }

  ngOnChanges() {
    if (this.filePath != this.path) {
      this.filePath = this.path;
      this.loading = false;
    }
  }

  onSelect($event: NgxDropzoneChangeEvent) {
    if (!$event.rejectedFiles.length) {
      this.loading = true;
      this.editMode = false;
      const file = $event.addedFiles[0];
      this.checkEncryptedFile(file);
    } else {
      this.snackBar.open('You can only upload PDF files.', 'Close', {
        duration: 2000,
      });
    }
  }

  checkEncryptedFile(file) {
    var fileReader: FileReader = new FileReader();
    fileReader.onload = (e) => {
      const isEncrypted = fileReader.result.toString().includes('Encrypt');
      if (isEncrypted) {
        this.snackBar.open('You can only upload unprotected PDF files.', 'Close', {
          duration: 2000,
        });
      } else {
        this.emitFile.emit(file);
      }
    };
    fileReader.readAsText(file);
  }
  
  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  toggleOptional(e) {
    if (e.checked) {
      (async () => {
        const pdf = await fetch(
          'https://s3-ap-southeast-1.amazonaws.com/baguio-ocpas/MaZXPXPOptMGBcvThBJ2VejNVzCEXVbEcYHZtU8y.pdf'
        );
        const data = await pdf.blob();
        const metadata = {
          type: 'application/pdf',
        };
        const file = new File([data], 'not-applicable.pdf', metadata);
        this.isOptional = false;

        this.emitNotApplicable.emit(file);
      })();
    }
  }
}
