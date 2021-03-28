import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  reminders = ['Reminder 1', 'Reminder 2', 'Reminder 3','Reminder 4'];

  constructor() { }

  ngOnInit(): void {
  }

}
