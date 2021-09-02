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
  public projectCost;
  public isLoading;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data
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
}
