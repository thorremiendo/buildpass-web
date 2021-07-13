import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.scss']
})
export class AnnouncementListComponent implements OnInit {
 @Input() announcements: any;

  constructor() { }

  ngOnInit(): void {
  }

}
