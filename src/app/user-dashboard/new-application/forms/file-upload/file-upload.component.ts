import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() type: string;
  @Input() description: string;
  @Input() path: string;
  @Input() doctypeId: string;
  @Output() emitFile: EventEmitter<File> = new EventEmitter<File>();
  @Output() emitRevision: EventEmitter<File> = new EventEmitter<File>();
  @Output() removeFile: EventEmitter<void> = new EventEmitter<void>();

  public fileDescription: string;
  public filePath: string;
  public fileDoctypeId: string;
  public file: File;
  public loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.fileDoctypeId = this.doctypeId;
    this.fileDescription = this.description;
    this.filePath = this.path;
  }

  ngOnChanges() {
    this.filePath = this.path;
    this.loading = false;
  }

  onSelect($event: NgxDropzoneChangeEvent) {
    this.loading = true;
    this.file = $event.addedFiles[0];
    this.emitFile.emit(this.file);
  }

  onRemove() {
    this.file = null;
    this.removeFile.emit();
  }

  openFileChooser() {
    const element: HTMLElement = document.getElementById(`file-input-${this.doctypeId}`) as HTMLElement;
    element.click();
  }

  onUpdate($event) {
    this.loading = true;
    this.file = $event.target.files[0];
    this.emitRevision.emit(this.file);
  }
}
