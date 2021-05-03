import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-application-list',
  templateUrl: './admin-application-list.component.html',
  styleUrls: ['./admin-application-list.component.scss'],
})
export class AdminApplicationListComponent implements OnInit {
  public applications;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.adminService.fetchAllApplication().subscribe((data) => {
      console.log(data.data);
      this.applications = data.data;
    });
  }

  viewApplication(id) {
    let index = id--;

    if (this.applications[index].application_status_id == 6) {
      this.snackBar.open('Incomplete Application', 'close', {
        duration: 3000,
      });
    } else {
      this.router.navigate(['admin/dashboard/application', id]);
    }
  }
}
