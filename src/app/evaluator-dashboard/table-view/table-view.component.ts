import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';

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
    'permitType',
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
  goToApplicationInfo(id) {
    this.router.navigate(["evaluator/application", id]);

  }
}
