import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ProjectDetailsComponent } from 'src/app/evaluator-dashboard/project-details/project-details.component';
import { RepresentativeDetailsComponent } from '../representative-details/representative-details.component';
import { applicationTypes } from '../../core/enums/application-type.enum';
import { applicationStatus } from '../../core/enums/application-status.enum';

@Component({
  selector: 'app-application-summary',
  templateUrl: './application-summary.component.html',
  styleUrls: ['./application-summary.component.scss'],
})
export class ApplicationSummaryComponent implements OnInit {
  public applicationId;
  public applicationInfo;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private applicationService: ApplicationInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params.id;
    this.fetchApplicationDetails();
  }

  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '1600px',
      data: {
        projectDetails: this.applicationInfo.project_detail,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  handleNext() {
    this.router.navigateByUrl('dashboard/new/occupancy-permit');
  }
  openRepresentativeDialog() {
    const dialogRef = this.dialog.open(RepresentativeDetailsComponent, {
      width: '1600px',
      data: {
        representativeDetails: this.applicationInfo.representative_detail,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  getApplicationStatus(id): string {
    return applicationStatus[id];
  }
  getApplicationType(id): string {
    return applicationTypes[id];
  }

  fetchApplicationDetails() {
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((res) => {
        this.applicationInfo = res.data;
        console.log(this.applicationInfo);
      });
  }
}
