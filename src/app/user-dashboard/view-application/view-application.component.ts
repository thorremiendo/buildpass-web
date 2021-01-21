import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { documentTypes } from '../../core/enums/document-type.enum';
import { documentStatus } from '../../core/enums/document-status.enum';
import { AuthService, UserService } from 'src/app/core';
import { ProjectDetailsComponent } from 'src/app/evaluator-dashboard/project-details/project-details.component';
import { FormDetailsComponent } from 'src/app/evaluator-dashboard/form-details/form-details.component';
import { applicationStatus } from '../../core/enums/application-status.enum';
import Swal from 'sweetalert2';
import { ViewFeesComponent } from 'src/app/evaluator-dashboard/view-fees/view-fees.component';
import { ApplicationFeesService } from 'src/app/core/services/application-fees.service';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss'],
})
export class ViewApplicationComponent implements OnInit {
  public isLoading = true;
  public applicationId;
  public evaluatorDetails;
  public user;
  public pdfSrc;
  public applicationDetails;
  public applicationDate;
  public dataSource;
  displayedColumns: string[] = ['index', 'name', 'status', 'remarks', 'action'];

  constructor(
    private router: Router,
    private applicationService: ApplicationInfoService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private applicationFeeService: ApplicationFeesService
  ) {}
  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '1000px',
      data: {
        projectDetails: this.applicationDetails.project_detail,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  openFeesDialog() {
    this.applicationFeeService
      .fetchFees(this.applicationId)
      .subscribe((res) => {
        const dialogRef = this.dialog.open(ViewFeesComponent, {
          width: '1000px',
          data: {
            fees: res.data,
            applicationId: this.applicationId
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
        });
      });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.applicationId = this.route.snapshot.params.id;
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationDetails = result.data;
        console.log(this.applicationDetails);
        this.applicationService
          .fetchUserDocs(this.applicationId)
          .subscribe((result) => {
            this.dataSource = result.data;
            this.isLoading = false;
          });
      });
  }

  getDocType(id): string {
    return documentTypes[id];
  }
  getDocStatus(id): string {
    return documentStatus[id];
  }
  getApplicationStatus(id): string {
    return applicationStatus[id];
  }
  onSave() {
    const body = {
      application_status_id: 1,
    };
    this.applicationService
      .updateApplicationStatus(body, this.applicationId)
      .subscribe((res) => {
        Swal.fire(
          'Success!',
          `Forwarded to CBAO for Evaluation!`,
          'success'
        ).then((result) => {
          window.location.reload();
        });
      });
  }

  openFormDialog(element): void {
    console.log(element);
    const dialogRef = this.dialog.open(FormDetailsComponent, {
      width: '1500px',
      height: '2000px',
      data: {
        evaluator: this.evaluatorDetails,
        form: element,
        route: this.route,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
}
