import { AppTitleService } from './../../core/services/app-title.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-tasks',
  templateUrl: './new-tasks.component.html',
  styleUrls: ['./new-tasks.component.scss'],
})
export class NewTasksComponent implements OnInit {
  public userInfo;

  constructor(private appTitle: AppTitleService) {}

  ngOnInit(): void {
    this.appTitle.setTitle('BuildPASS');
  }
}
