import { AdminUserService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-logs',
  templateUrl: './activity-logs.component.html',
  styleUrls: ['./activity-logs.component.scss'],
})
export class ActivityLogsComponent implements OnInit {
  columnsToDisplay: string[] = ['date', 'evaluator', 'action'];
  public activityLogs;
  public photo_path =
    'https://baguio-ocpas.s3-ap-southeast-1.amazonaws.com/ocpas-avatar.png';
  constructor(private adminService: AdminUserService) {}

  ngOnInit(): void {
    this.adminService.fetchActivityLogs().subscribe((res) => {
      this.activityLogs = res.data;
    });
  }
}
