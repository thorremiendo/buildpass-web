import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/admin/admin-news-announcement-editor/announcement';
import { HttpParams } from '@angular/common/http';
import { AnnouncementService } from 'src/app/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public data:any;

  constructor(
    private announcementService: AnnouncementService,
  ) {
    //this.data = Announcement;

   }

  ngOnInit(): void {
    this.fetchActiveAnnouncements()
  }

  fetchActiveAnnouncements() {
    const key = 'is_active';
    const value = '1';
    const param = new HttpParams().set(key, value);

    this.announcementService.fetchAnnouncements(param).subscribe((data) => {
      console.log(data)
      this.data = data.data;
    });
  }

}







