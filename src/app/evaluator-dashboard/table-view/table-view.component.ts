import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { applicationStatus } from '../../core/enums/application-status.enum';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements OnInit {
  public dataSource;
  displayedColumns: string[] = [
    'applicationNo',
    'applicantFullName',
    'applicationDate',
    'permitType',
    'applicationStatus',
    'action',
  ];
  constructor(
    private router: Router,
    private applicationService: ApplicationInfoService
  ) {}

  ngOnInit(): void {
    this.applicationService.fetchApplications().subscribe((result) => {
      this.dataSource = result.data;
    });
  }
  getApplicationStatus(id): string {
    return applicationStatus[id];
  }
  goToApplicationInfo(id) {
    this.router.navigate(['evaluator/application', id]);
  }
}
