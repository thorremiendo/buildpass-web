import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
  public imageChangedEvent: any = '';
  public btnName: string = 'Upload thumbnail';
  public modules = {
    // toolbar: {
    //   container: [
    //     [{ 'font': [] }],
    //     [{ 'size': ['small', false, 'large', 'huge'] }],
    //     ['bold', 'italic', 'underline', 'strike'],
    //     [{ 'header': 1 }, { 'header': 2 }],
    //     [{ 'color': [] }, { 'background': [] }],
    //     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //     [{ 'align': [] }],
    //     ['link', 'image']
    //   ]
    // },
    imageResize: true
  };


  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    if (this.data.photo_path_original) {
      this.btnName = 'Change thumbnail';
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.handleUpload(event);
    console.log(this.imageChangedEvent);
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.data.photo_path_original = reader.result;
      this.btnName = 'Change image';
    };
  }

  handleDelete() {
    this.data.photo_path_original = '';
    this.data.photo_path_crop = '';
    this.btnName = 'Upload image';
  }

  imageCropped(event: ImageCroppedEvent) {
    this.data.photo_path_crop = event.base64;
  }
}
