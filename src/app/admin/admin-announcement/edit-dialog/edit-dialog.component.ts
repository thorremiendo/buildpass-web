import { Component, OnInit, Inject, Optional, ViewChild,ElementRef  } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Announcement } from '../announcement';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  public announcements: Object[] = Announcement;
  public body: string = '';
  public imageChangedEvent: any = '';
  public originalImage: any = ''; 
  public croppedImage: any = '';
  public savedImage: any = '';
  public btnName: string = "Upload image"
  public hasPhoto: boolean = false;



  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    let i = this.data.index;
    let announcement = this.data.data[i];
    this.body = announcement.body;
    this.croppedImage = announcement.photo_path_crop;
    this.originalImage = announcement.photo_path_original;
    console.log(data);
  }

  ngOnInit(){
    if(this.originalImage){
      this.btnName = "Change image"
    }

  }

  submit() {
    this.announcements[this.data.index] = {
      body: this.body,
      active: 0,
      photo_path_original: this.originalImage,
      photo_path_crop: this.croppedImage,
      isDisable: false,
    };
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.handleUpload(event);
    console.log(this.imageChangedEvent)
   
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.originalImage = reader.result;
        this.btnName = "Change image"
        console.log(this.originalImage);
    };
}

handleDelete(){
  this.originalImage = '';
  this.croppedImage = '';
  this.btnName = "Upload image"
}
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    
    // this.savedImage = event
    console.log(event);
  }
}
