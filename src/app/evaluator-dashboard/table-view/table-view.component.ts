import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { applicationStatus } from '../../core/enums/application-status.enum';
import { applicationTypes } from '../../core/enums/application-type.enum';
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements OnInit {
  public dataSource;
  public user;
  public evaluatorDetails;
  public evaluatorRole;
  public isLoading;
  displayedColumns: string[] = [
    'applicationNo',
    // 'applicantFullName',
    'code',
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
      this.fetchEvaluatorDetails();
    });
  }
  fetchEvaluatorDetails() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.evaluatorDetails = this.user.employee_detail;
    this.evaluatorRole = this.user.user_roles[0].role[0];
    this.isLoading = false;
    //console.log('evaluator details', this.evaluatorDetails);
    this.checkCurrentOffice();
  }

  checkCurrentOffice() {
    if (this.evaluatorDetails.office_id == 1) {
      this.filterCpdoApplications();
    } else if (
      this.evaluatorDetails.office_id == 2 ||
      this.evaluatorDetails.office_id == 3
    ) {
      this.filterCbaoCepmoBfpApplications();
    }
  }

  filterCpdoApplications() {
    const CPDO_APPLICATIONS = this.dataSource.filter(
      (e) => e.application_status_id == 2 || e.application_status_id == 10
    );
    this.dataSource = CPDO_APPLICATIONS;
  }

  filterCbaoCepmoBfpApplications() {
    const CBAO_CEPMO_BFP_APPLICATIONS = this.dataSource.filter(
      (e) => e.application_status_id == 3
    );
    this.dataSource = CBAO_CEPMO_BFP_APPLICATIONS;
  }

  getApplicationStatus(id): string {
    return applicationStatus[id];
  }
  getApplicationType(id): string {
    return applicationTypes[id];
  }
  goToApplicationInfo(id) {
    this.router.navigate(['evaluator/application', id]);
  }
}
