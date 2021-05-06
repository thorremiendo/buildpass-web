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
  @Output() emitFile: EventEmitter<File> = new EventEmitter<File>();

  public fileDescription: string;
  public filePath: string;
  public file: File;
  public editMode: boolean = false;
  public loading: boolean = false;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fileDescription = this.description;
    this.filePath = this.path;
    this.checkIfPicture();
  }
  checkIfPicture() {
    return this.fileDescription.includes('picture');
  }
  ngOnChanges() {
    this.filePath = this.path;
    this.loading = false;
  }

  onSelect($event: NgxDropzoneChangeEvent) {
    console.log($event);
    if ($event.rejectedFiles.length == 0) {
      this.loading = true;
      this.editMode = false;
      this.file = $event.addedFiles[0];
      this.emitFile.emit(this.file);
    } else {
      this.snackBar.open('You can only upload PDF files.', 'Close', {
        duration: 2000,
      });
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
