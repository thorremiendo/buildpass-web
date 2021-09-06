import { WaterMarkService } from './../../../../core/services/watermark.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
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
  @Input() formId: string;
  @Input() applicationDetails;
  @Output() emitFile: EventEmitter<File> = new EventEmitter<File>();

  public fileDescription: string;
  public filePath: string;
  public file: File;
  public infoPath: string;
  public editMode: boolean = false;
  public loading: boolean = false;
  public isOptional: boolean = false;
  public isProtected: boolean = false;
  constructor(
    private snackBar: MatSnackBar,
    private newApplicationService: NewApplicationService,
    private pdfService: WaterMarkService
  ) {}

  ngOnInit(): void {
    this.fileDescription = this.description;
    this.filePath = this.path;
    this.infoPath = this.info;
    this.checkIfPicture();
  }
  checkIfPicture() {
    return this.fileDescription.includes('picture');
  }
  ngOnChanges() {
    this.filePath = this.path;
    this.infoPath = this.info;
    this.loading = false;
  }

  onSelect($event: NgxDropzoneChangeEvent) {
    if ($event.rejectedFiles.length == 0) {
      this.loading = true;
      this.editMode = false;
      this.file = $event.addedFiles[0];
      // this.emitFile.emit(this.file);
      this.checkEncryptedFile(this.file);
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
        this.file = null;
        this.openSnackBar('You can only upload unprotected PDF files.');
        this.loading = false;
      } else {
        this.emitFile.emit(file);
        this.loading = false;
      }
    };
    fileReader.readAsText(file);
  }

  onToggleChange(e) {
    console.log(e.checked);
    if (e.checked == true) {
      this.submitNotApplicable();
    }
  }

  async submitNotApplicable() {
    let pdf = await fetch(
      'https://s3-ap-southeast-1.amazonaws.com/baguio-ocpas/MaZXPXPOptMGBcvThBJ2VejNVzCEXVbEcYHZtU8y.pdf'
    );
    let data = await pdf.blob();
    let metadata = {
      type: 'application/pdf',
    };
    let file = new File([data], 'not-applicable.pdf', metadata);
    this.emitFile.emit(file);
    this.isOptional = false;
    // const uploadDocumentData = {
    //   application_id: this.applicationDetails.id,
    //   user_id: this.applicationDetails.user_id,
    //   document_id: this.formId,
    //   document_path: file,
    //   document_status: '0',
    // };
    // debugger;

    // this.newApplicationService
    //   .submitDocument(uploadDocumentData)
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
    });
  }
}
