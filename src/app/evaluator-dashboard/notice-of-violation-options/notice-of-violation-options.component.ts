import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice-of-violation-options',
  templateUrl: './notice-of-violation-options.component.html',
  styleUrls: ['./notice-of-violation-options.component.scss'],
})
export class NoticeOfViolationOptionsComponent implements OnInit {
  notice = [
    {
      id: 1,
      title: '1ST NOTICE OF VIOLATION',
      selected: false,
      status: 'Delivered',
    },
    {
      id: 2,
      title: '2ND NOTICE OF VIOLATION',
      selected: false,
      status: 'Division Chief Review',
    },
    {
      id: 3,
      title: '3RD NOTICE OF VIOLATION',
      selected: false,
      status: 'For Signature',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
