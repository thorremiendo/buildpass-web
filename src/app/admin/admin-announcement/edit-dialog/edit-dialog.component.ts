import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnnouncementService, ConvertImage } from '../../../core';
// import imageToBase64 from 'image-to-base64/browser';
import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
// Quill.register('modules/imageResize', ImageResize);

import { Announcement } from '../announcement';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
  public maxLength = 360;
  public imageChangedEvent: any = '';
  public btnName: string = 'Upload thumbnail';
  public isLoading: boolean = true;
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
    imageResize: true,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private announcementService: AnnouncementService,
    private convertImage: ConvertImage
  ) {}

  ngOnInit() {
    this.announcementService
      .fethAnnouncementById(this.data.id)
      .subscribe((data) => {
        this.data = data.data;
        this.isLoading = false;

        if ((this.isLoading = false && this.data.photo_path_original)) {
          this.btnName = 'Change thumbnail';
        }
      });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.handleUpload(event);
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
