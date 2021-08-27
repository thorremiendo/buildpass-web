import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Announcement } from './announcement';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementService } from '../../core';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { PreviewDialogComponent } from './preview-dialog/preview-dialog.component';

@Component({
  selector: 'app-admin-news-editor',
  templateUrl: './admin-news-editor.component.html',
  styleUrls: ['./admin-news-editor.scss'],
})
export class AdminNewsEditorComponent {
  public isActive: boolean;
  public newsInfo: Object[];
  // public announcements: Object[] = Announcement;
  constructor(
    public dialog: MatDialog,
    private announcementService: AnnouncementService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchAllAnnouncements();
  }

  fetchAllAnnouncements() {
    this.announcementService.fetchAnnouncements().subscribe((data) => {
      this.newsInfo = data.data;
    });
  }

  fetchActiveAnnouncements() {
    const key = 'is_active';
    const value = '1';
    const param = new HttpParams().set(key, value);

    this.announcementService.fetchAnnouncements(param).subscribe((data) => {
      this.newsInfo = data.data;
    });
  }

  delete(index: any) {
    this.newsInfo.splice(index, 1);
  }

  editDialog(data, index) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: data,
      height: '600px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
     this.fetchAllAnnouncements();
    });
  }

  previewDialog(data) {
    this.dialog.open(PreviewDialogComponent, {
      data: data,
      height: '600px',
      width: '800px',
    });
  }

  addNew(){
    const body = {
      subject: 'Test Announcement',
      short_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      body: 'New Announcement 1 ',
      isActive: false,
      //photo_path: '',

    }
    this.announcementService.postAnnouncement(body).subscribe( result =>{
      if(result.message = "Success."){
        this.newsInfo.push(body);
        this.snackBar.open("Success...", "Close", {
          duration:3000,
          horizontalPosition: "left",
        });

      }
      else{
        this.snackBar.open("Something went wrong...", "Close", {
          duration:3000,
          horizontalPosition: "left",
        });

      }

    })
  }

  changeStatus(id, isActive){
    console.log(isActive)
    if(isActive){
      const body = {
        is_active: 0,
      }
      this.announcementService.updateAnnouncementById(id,body);
    }
    else{
      const body = {
        is_active: 1,
      }
      this.announcementService.updateAnnouncementById(id,body);

    }

  }


  preview() {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.newsInfo,
      event.previousIndex,
      event.currentIndex
    );
  }

  submit() {}
}
