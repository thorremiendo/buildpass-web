import { PopOutNotificationsService } from './../../core/services/pop-out-notification.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as moment from 'moment';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-user-applications-table',
  templateUrl: './user-applications-table.component.html',
  styleUrls: ['./user-applications-table.component.scss'],
})
export class UserApplicationsTableComponent implements OnInit {
  @ViewChild('filtersTemplate', { static: true })
  filtersTemplate: TemplateRef<any>;
  private userInfo;
  public applications;
  public applicationCount;
  public searchKey = new FormControl('');
  public permitType = new FormControl('0');
  public complianceStatus = new FormControl('0');
  public dateStart = new FormControl('');
  public dateEnd = new FormControl('');
  public sortType = new FormControl('0');
  public pageIndex = 0;
  public pageSize = 5;
  public filterCount = 0;
  public loading: boolean = false;
  private dialog;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private newApplicationService: NewApplicationService,
    private matDialog: MatDialog,
    private notif: PopOutNotificationsService
  ) {}

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    if (this.userInfo) {
      this.fetchApplications();

      this.searchKey.valueChanges.pipe(debounceTime(300)).subscribe((res) => {
        this.pageIndex = 0;
        this.getFilterCount();
        this.fetchApplications();
      });

      this.permitType.valueChanges.subscribe((res) => {
        this.pageIndex = 0;
        this.getFilterCount();
        this.fetchApplications();
      });

      this.complianceStatus.valueChanges.subscribe((res) => {
        this.pageIndex = 0;
        this.getFilterCount();
        this.fetchApplications();
      });

      this.dateStart.valueChanges.subscribe((res) => {
        this.pageIndex = 0;
        this.getFilterCount();
        this.fetchApplications();
      });

      this.dateEnd.valueChanges.subscribe((res) => {
        this.pageIndex = 0;
        this.getFilterCount();
        this.fetchApplications();
      });

      this.sortType.valueChanges.subscribe((res) => {
        this.pageIndex = 0;
        this.fetchApplications();
      });
    }
  }

  fetchApplications() {
    this.loading = true;
    const params = {
      userId: this.userInfo.id,
      searchKey: this.searchKey.value ? this.searchKey.value : '',
      permitType: this.permitType.value ? this.permitType.value : '',
      complianceStatus: this.complianceStatus.value
        ? this.complianceStatus.value
        : '',
      dateStart: this.dateStart.value
        ? moment(this.dateStart.value).format('YYYY-MM-DD')
        : '',
      dateEnd: this.dateEnd.value
        ? moment(this.dateEnd.value).format('YYYY-MM-DD')
        : '',
      sortType: this.sortType.value ? this.sortType.value : '',
      pageIndex: this.pageIndex + 1,
      pageSize: this.pageSize,
    };

    this.userService
      .fetchUserApplications(params, this.userInfo.id)
      .subscribe((data) => {
        this.applications = data.data;
        this.applicationCount = data.total;
        this.loading = false;
      });
  }

  getFilterCount() {
    let filterCount = 0;
    if (Number(this.permitType.value)) filterCount++;
    if (Number(this.complianceStatus.value)) filterCount++;
    if (Number(this.dateStart.value)) filterCount++;
    if (Number(this.dateEnd.value)) filterCount++;

    this.filterCount = filterCount;
  }

  clearFilters() {
    this.permitType.setValue('0');
    this.complianceStatus.setValue('0');
    this.dateStart.setValue(null);
    this.dateEnd.setValue(null);
  }

  openFilters() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = 'auto';
    dialogConfig.width = '700px';

    this.dialog = this.matDialog.open(this.filtersTemplate, dialogConfig);
    this.dialog.afterClosed().subscribe((result) => {
      this.router.navigate([{ outlets: { modal: null } }], {
        relativeTo: this.route.parent,
      });
    });
  }

  closeFilters() {
    this.dialog.close();
  }

  changeIndex(index) {
    this.pageIndex = index;
    this.fetchApplications();
  }

  continueApplication(user_id, application_id) {
    this.newApplicationService
      .fetchDraftDetails(user_id, application_id)
      .subscribe(
        (res) => {
          localStorage.setItem(
            'app_id',
            res.data[res.data.length - 1].application_id
          );
          this.newApplicationService
            .fetchApplicationInfo(res.data[res.data.length - 1].application_id)
            .subscribe((res) => {
              const permitType = res.data.permit_type_id;
              switch (permitType) {
                case 1:
                  this.router.navigateByUrl('/dashboard/new/building-permit');
                  break;
                case 2:
                  this.router.navigateByUrl('/dashboard/new/occupancy-permit');
                  break;
                case 3:
                  this.router.navigateByUrl('/dashboard/new/excavation-permit');
                  break;
                case 4:
                  this.router.navigateByUrl('/dashboard/new/fencing-permit');
                  break;
                case 5:
                  this.router.navigateByUrl('/dashboard/new/demolition-permit');
                  break;
                case 6:
                  this.router.navigateByUrl(
                    '/dashboard/new/scaffolding-permit'
                  );
                  break;
                case 7:
                  this.router.navigateByUrl('/dashboard/new/sign-permit');
                  break;
                case 8:
                  this.router.navigateByUrl(
                    '/dashboard/new/temporary-sidewalk'
                  );
                  break;
                case 9:
                  this.router.navigateByUrl('/dashboard/new/mechanical-permit');
                  break;
                case 10:
                  this.router.navigateByUrl(
                    '/dashboard/new/electrical-inspection'
                  );
                  break;
              }
            });
        },
        (err) => {
          this.notif.openSnackBar(
            'An error has occured. Please contact support.'
          );
        }
      );
  }

  viewApplication(id) {
    this.router.navigate(['dashboard/applications/view', id]);
  }

  applicationSummary(id) {
    this.router.navigate(['dashboard/new/summary/', id]);
  }
}
