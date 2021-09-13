import { PopOutNotificationsService } from './../../core/services/pop-out-notification.service';
import { ApplicationInfoService } from './../../core/services/application-info.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  public projectCostForm = new FormControl();
  public projectCost;
  public isLoading;
  public editMode: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data,
    private applicationService: ApplicationInfoService,
    private popout: PopOutNotificationsService
  ) {}

  ngOnInit(): void {
    this.transformProjectCost();
    console.log(this.data.projectDetails);
  }
  transformProjectCost() {
    this.isLoading = true;
    this.projectCost = this.data.projectDetails.project_cost_cap.replace(
      ',',
      ''
    );
    this.isLoading = false;
  }

  edit() {
    this.editMode = !this.editMode;
  }
  save() {
    console.log(this.projectCostForm.value);
    const body = {
      project_cost_cap: this.projectCostForm.value,
    };
    this.applicationService
      .updateApplicationInfo(body, this.data.applicationId)
      .subscribe((res) => {
        this.popout.openSnackBar('Success!');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
  }
}
