import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() type: string;
  @Input() description: string;
  @Output() emitFile: EventEmitter<File> = new EventEmitter<File>();
  @Output() removeFile: EventEmitter<void> = new EventEmitter<void>();

  public fileDescription: string;
  public file: File;

  constructor() { }

  ngOnInit(): void {
    this.fileDescription = this.description;
  }

  onSelect($event: NgxDropzoneChangeEvent) {
    this.file = $event.addedFiles[0];
    this.emitFile.emit(this.file);
  }

  onRemove() {
    this.file = null;
    this.removeFile.emit();
  }
}
