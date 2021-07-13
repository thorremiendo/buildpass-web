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
  public isActive: boolean;
  public announcements: Object[];
  // public announcements: Object[] = Announcement;
  constructor(
    public dialog: MatDialog,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.fetchAllAnnouncements();
  }

  fetchAllAnnouncements() {
    this.announcementService.fetchAnnouncements().subscribe((data) => {
      this.announcements = data.data;
    });
  }

  fetchActiveAnnouncements() {
    const key = 'is_active';
    const value = '1';
    const param = new HttpParams().set(key, value);

    this.announcementService.fetchAnnouncements(param).subscribe((data) => {
      this.announcements = data.data;
    });
  }

  delete(index: any) {
    this.announcements.splice(index, 1);
  }

  editDialog(data, index) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: data,
      height: '600px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      window.location.reload();
    });
  }

  previewDialog(data) {
    this.dialog.open(PreviewDialogComponent, {
      data: data,
      height: '600px',
      width: '800px',
    });
  }

  addNew() {
    this.announcements.push({
      subject: 'Test Announcement',
      short_description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper rutrum velit nec hendrerit. Nullam quis dui a sapien venenatis elementum. Phasellus euismod, magna a interdum blandit, ex velit imperdiet ligula, eu vestibulum justo nisi sed nunc. Praesent sed ex nec eros volutpat maximus vitae quis mi. Sed dictum fermentum nulla, eget sagittis diam mattis ac.',
      body: 'New Announcement 1 ',
      isActive: false,
      photo_path: '',
      date: new Date(),
    });
  }

  preview() {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.announcements,
      event.previousIndex,
      event.currentIndex
    );
  }

  submit() {}
}
