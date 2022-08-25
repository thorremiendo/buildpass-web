import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice-of-violation-forms',
  templateUrl: './notice-of-violation-forms.component.html',
  styleUrls: ['./notice-of-violation-forms.component.scss'],
})
export class NoticeOfViolationFormsComponent implements OnInit {
  pdfSource = '../../../assets/forms/notice-of-violation/NOV.pdf';
  constructor() {}

  ngOnInit(): void {}
}
