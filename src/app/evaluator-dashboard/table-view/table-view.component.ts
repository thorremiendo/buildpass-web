import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements OnInit {
  public user;
  public evaluatorDetails;
  public evaluatorRole;
  public applications;

  constructor(
    private router: Router,
    private applicationService: ApplicationInfoService
  ) {}

  ngOnInit(): void {
    this.applicationService.fetchApplications().subscribe((result) => {
      this.applications = result.data.filter(application => application.application_status_id != 6);
      this.fetchEvaluatorDetails();
    });
  }

  fetchEvaluatorDetails() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.evaluatorDetails = this.user.employee_detail;
    this.evaluatorRole = this.user.user_roles[0].role[0];
    // this.checkCurrentOffice();
  }

  // checkCurrentOffice() {
  //   if (this.evaluatorDetails.office_id == 1) {
  //     this.filterCpdoApplications();
  //   } else if (
  //     this.evaluatorDetails.office_id == 2 ||
  //     this.evaluatorDetails.office_id == 3
  //   ) {
  //     this.filterCbaoCepmoBfpApplications();
  //   }
  // }

  // filterCpdoApplications() {
  //   this.applications = this.applications.filter(
  //     (e) => e.application_status_id == 2 || e.application_status_id == 10
  //   );
  // }

  // filterCbaoCepmoBfpApplications() {
  //   this.applications = this.applications.filter(
  //     (e) => e.application_status_id == 3
  //   );
  // }

  viewApplication(id) {
    this.router.navigate(['evaluator/application', id]);
  }
}
