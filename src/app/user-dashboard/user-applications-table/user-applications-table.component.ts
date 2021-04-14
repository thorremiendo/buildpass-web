import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/core';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { applicationStatus } from '../../core/enums/application-status.enum';
import { applicationTypes } from '../../core/enums/application-type.enum';

@Component({
  selector: 'app-user-applications-table',
  templateUrl: './user-applications-table.component.html',
  styleUrls: ['./user-applications-table.component.scss'],
})
export class UserApplicationsTableComponent implements OnInit {
  public user;
  public applicationInfoData;
  public filteredApplications;
  public currentItemsToShow;
  public loading: boolean = true;
  public permitType =  new FormControl('');

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator = Object.create(null);
  constructor(
    private userService: UserService,
    private newApplicationService: NewApplicationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.fetchUserApplications(this.user.id).subscribe((result) => {
      this.applicationInfoData = result.data;
      this.filteredApplications = this.applicationInfoData;
      this.currentItemsToShow = this.filteredApplications.slice(0*5, 0*5 + 5);
      this.loading = false;
    });

    this.permitType.valueChanges.subscribe(res => {
      if (res == 0) {
        this.filteredApplications = this.applicationInfoData;
      } else {
        this.filteredApplications = this.applicationInfoData.filter(application => application.permit_type_id == res);
      }
      this.currentItemsToShow = this.filteredApplications.slice(this.paginator.pageIndex*this.paginator.pageSize, this.paginator.pageIndex*this.paginator.pageSize + this.paginator.pageSize);
      this.paginator.firstPage();
    });
  }

  onPageChange($event) {
    this.currentItemsToShow =  this.filteredApplications.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  }

  getApplicationStatus(id): string {
    return applicationStatus[id];
  }

  getPermitType(id): string {
    return applicationTypes[id];
  }

  continueApplication(user_id, application_id) {
    this.newApplicationService
      .fetchDraftDetails(user_id, application_id)
      .subscribe((res) => {
        localStorage.setItem(
          'app_id',
          res.data[res.data.length - 1].application_id
        );
        this.router.navigateByUrl(res.data[res.data.length - 1].url);
      });
  }

  viewApplication(id) {
    this.router.navigate(['dashboard/applications/view', id]);
  }
}
