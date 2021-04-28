import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Announcement } from './announcement';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-admin-announcement',
  templateUrl: './admin-announcement.component.html',
  styleUrls: ['./admin-announcement.component.scss'],
})
export class AdminAnnouncementComponent {
  public announcements: Object[] = Announcement;
  constructor(public dialog: MatDialog) {
    console.log(this.announcements);
  }

  delete(index: any) {
    this.announcements.splice(index, 1);
  }

  openDialog(data, index) {
    this.dialog.open(EditDialogComponent, {
      data: {
        index: index,
        data: data,
      },
      height: '600px',
      width: '800px',
    });
  }

  addNew() {
    this.announcements.push({
      body: 'New Announcement ',
      active: 0,
      photo_path_original: '',
      isDisable: false,
    });
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.announcements,
      event.previousIndex,
      event.currentIndex
    );
  }
}

