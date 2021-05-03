import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Announcement } from './announcement';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { PreviewDialogComponent } from './preview-dialog/preview-dialog.component';

@Component({
  selector: 'app-admin-announcement',
  templateUrl: './admin-announcement.component.html',
  styleUrls: ['./admin-announcement.component.scss'],
})
export class AdminAnnouncementComponent {
  public isActive: boolean;
  public announcements: Object[] = Announcement;
  constructor(public dialog: MatDialog) {
    console.log(this.announcements);
  }

  delete(index: any) {
    this.announcements.splice(index, 1);
  }

  editDialog(data, index) {
    console.log(index)
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: data,
      height: '600px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("After closed"+result.subject);
      this.announcements[index] = result;
      
    });
    
    
  }

  previewDialog(data){
    console.log(data)
   this.dialog.open(PreviewDialogComponent, {
      data: data,
      height: '600px',
      width: '800px',
    });

    

  }

  
  addNew(){
    this.announcements.push({
      subject: 'Test Announcement',
      short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper rutrum velit nec hendrerit. Nullam quis dui a sapien venenatis elementum. Phasellus euismod, magna a interdum blandit, ex velit imperdiet ligula, eu vestibulum justo nisi sed nunc. Praesent sed ex nec eros volutpat maximus vitae quis mi. Sed dictum fermentum nulla, eget sagittis diam mattis ac.',
      body: 'New Announcement 1 ',
      isActive: false,
      photo_path: '',
      date: new Date(),
    });
  }

  preview(){

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.announcements,
      event.previousIndex,
      event.currentIndex
    );
  }

  submit(){
    console.log(this.announcements);
  }
}

