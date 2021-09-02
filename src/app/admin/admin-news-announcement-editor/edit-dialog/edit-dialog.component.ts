import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AnnouncementService, ConvertImage } from '../../../core';
import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import ImageResize from 'quill-image-resize-module';
//Quill.register('modules/imageResize', ImageResize);

import { Announcement } from '../announcement'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public newsInfo;
  public newsInfoForm: FormGroup;
  public success:boolean = false;

  public newsImage: File = null;
  private _displayNewsImage: string | ArrayBuffer = '';

  get displayNewsImage(): string | ArrayBuffer {
    return this._displayNewsImage? this._displayNewsImage : this.data.image_path;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private announcementService: AnnouncementService,
    private convertImage: ConvertImage,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
    )
     {

      this.createForm();
    }

  ngOnInit() {  
    console.log(this.data)  
    this.announcementService.fethAnnouncementById(this.data.id).subscribe( data =>{
      this.newsInfo = data.data;
      console.log(this.newsInfo)
      this.isLoading = false;
      this.pathcValue();

      if (this.isLoading = false && this.newsInfo.photo_path_original) {
        this.btnName = 'Change thumbnail';
      
      }
    })

  }

  createForm(){
    this.newsInfoForm = this.fb.group({
      subject:['', Validators.required],
      short_desc:['', Validators.required],
      body:['', Validators.required],
      is_ative:['',Validators.required],
    })
  }

  pathcValue(){
    this.newsInfoForm.patchValue({
      subject: this.newsInfo.subject,
      short_desc:this.newsInfo.short_desc,
      body:this.newsInfo.body,
      is_ative:this.newsInfo.is_active,
    })
  }
  chooseNewsImage() {
    const element: HTMLElement = document.getElementById('newsImage') as HTMLElement;
    element.click();
  }

  handleNewsImageChange($event) {
    this.newsImage = $event.target.files[0];
    this.readSelectedNewsImage();
  }

  readSelectedNewsImage() {
    if (this.newsImage) {
      let reader = new FileReader();
      reader.onload = (res) => {
        this._displayNewsImage = reader.result;
      };
      reader.readAsDataURL(this.newsImage);
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.handleUpload(event);
  }

  handleUpload(event) {
    console.log(event);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.newsInfo.photo_path_original = reader.result;
      console.log(reader.result);
      this.btnName = 'Change image';
    };
  }

  handleDelete() {
    this.newsInfo.photo_path_original = '';
    this.newsInfo.photo_path_crop = '';
    this.btnName = 'Upload image';
  }

  imageCropped(event: ImageCroppedEvent) {
    this.newsInfo.photo_path_crop = event.base64;
    console.log(event);
  }

  updateNews(){
    if(this.newsInfoForm.valid){
      const body = {
        subject: this.newsInfoForm.value.subject,
        short_desc: this.newsInfoForm.value.short_desc,
        body: this.newsInfoForm.value.body,
        image_path:this.newsImage,
      }

      this.announcementService.updateAnnouncementById(this.data.id, body).subscribe( result => {
        console.log(result + "from edit component")
        if(result.message == "Success."){
          // this.newsInfo.push(body);
          this.snackBar.open("Success...", "Close", {
            duration: 3000,
            horizontalPosition: "left",
          });

          this.success = true;
  
        }
        else{
          this.snackBar.open("Something went wrong...", "Close", {
            duration: 3000,
            horizontalPosition: "left",
          });
          this.success = false;
        }
      });
    }
  }
  
}
