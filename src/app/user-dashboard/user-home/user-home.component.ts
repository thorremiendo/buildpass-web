import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  panelOpenState = false;
  reminders = ['Reminder 1', 'Reminder 2', 'Reminder 3','Reminder 4'];
  constructor() {}

  ngOnInit(): void {}
}
