import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/admin/admin-news-announcement-editor/announcement';
import { HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementService } from 'src/app/core';
import { PreviewDialogComponent } from '../../shared/preview-dialog/preview-dialog.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  public data: any;

  constructor(
    private announcementService: AnnouncementService,
    public dialog: MatDialog
  ) {
    //this.data = Announcement;
  }

  ngOnInit(): void {
    this.fetchActiveAnnouncements();
  }

  previewDialog(data) {
    this.dialog.open(PreviewDialogComponent, {
      data: data,
      height: '850px',
      width: '1200px',
    });
  }

  fetchActiveAnnouncements() {
    const key = 'is_active';
    const value = '1';
    const param = new HttpParams().set(key, value);

    this.announcementService.fetchAnnouncements(param).subscribe((data) => {
      this.data = data.data;
    });
  }
}
