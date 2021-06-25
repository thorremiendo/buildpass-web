import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { Router } from '@angular/router';
import { TreasuryService } from './../treasury-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treasury-home',
  templateUrl: './treasury-home.component.html',
  styleUrls: ['./treasury-home.component.scss'],
})
export class TreasuryHomeComponent implements OnInit {
  public applications;
  public user;
  constructor(
    private treasuryService: TreasuryService,
    private router: Router,
    private applicationService: ApplicationInfoService
  ) {}

  ngOnInit(): void {
    this.treasuryService.fetchTreasuryApplications().subscribe((res) => {
      this.applications = res.data;

      this.applications = res.data.filter(
        (application) => application.application_status_id == 8
      );
    });
  }
  viewApplication(id) {
    this.router.navigate(['treasury/dashboard/application', id]);
  }
}
