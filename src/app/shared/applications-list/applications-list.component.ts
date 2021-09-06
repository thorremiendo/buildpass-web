import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { applicationStatus } from '../../core/enums/application-status.enum';
import { applicationTypes } from '../../core/enums/application-type.enum';
import { ApplicationInfoService } from '../../core';
import Swal from 'sweetalert2';
import { constructionType } from '../../core/enums/construction-type.enum';
@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss'],
})
export class ApplicationsListComponent implements OnInit, OnChanges {
  @Input() applications: Array<object>;
  @Input() applicationStatus: string | number;
  @Output() emitApplication: EventEmitter<object> = new EventEmitter<object>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private userInfo;
  public filteredApplications = [];
  public currentItemsToShow = [];
  public loading: boolean = true;
  public searchKey = new FormControl('');
  public permitType = new FormControl('');
  public dateStart = new FormControl('');
  public dateEnd = new FormControl('');

  constructor(
    private applicationService: ApplicationInfoService
  ) {}

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user'));

    this.filteredApplications = this.applications;
    this.currentItemsToShow = this.filteredApplications.slice(0 * 5, 0 * 5 + 5);
    this.loading = false;

    this.searchKey.valueChanges.subscribe((res) => {
      this.filteredApplications = this.applications.filter((application) => 
        this.searchPerToken(application, res.split(' '))
      );
      this.resetPaginator();
    });

    this.permitType.valueChanges.subscribe((res) => {
      if (res == 0) {
        this.filteredApplications = this.applications;
      } else {
        this.filteredApplications = this.applications.filter(
          (application) => application['permit_type_id'] == res
        );
      }
      this.resetPaginator();
    });

    this.dateStart.valueChanges.subscribe((res) => {
      this.filteredApplications = this.applications.filter((application) => 
        new Date(application['submitted_at']) > new Date(res)
      );
      this.resetPaginator();
    });

    this.dateEnd.valueChanges.subscribe((res) => {
      this.filteredApplications = this.applications.filter((application) => 
        new Date(application['submitted_at']) < new Date(new Date(res).valueOf() + 1000*3600*24)
      );
      this.resetPaginator();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loading = true;
    this.filteredApplications = this.applications;
    setTimeout(() => {
      this.currentItemsToShow = this.filteredApplications.slice(
        this.paginator.pageIndex * this.paginator.pageSize,
        this.paginator.pageIndex * this.paginator.pageSize +
          this.paginator.pageSize
      );
      this.loading = false;
    }, 3000);
  }

  onPageChange($event) {
    this.currentItemsToShow = this.filteredApplications.slice(
      $event.pageIndex * $event.pageSize,
      $event.pageIndex * $event.pageSize + $event.pageSize
    );
  }

  resetPaginator() {
    this.currentItemsToShow = this.filteredApplications.slice(
      this.paginator.pageIndex * this.paginator.pageSize,
      this.paginator.pageIndex * this.paginator.pageSize +
        this.paginator.pageSize
    );
    this.paginator.firstPage();
  }

  searchPerToken(application, tokens) {
    const applicationNumber = application['permit_application_code'];
    const applicantFullName = `${application['applicant_detail'].first_name} ${application['applicant_detail'].middle_name} ${application['applicant_detail'].last_name} ${application['applicant_detail'].suffix_name}`;
    let projectLocation = '';
    if (application['project_detail'].block_number) projectLocation += `BLOCK ${application['project_detail'].block_number} `;
    if (application['project_detail'].lot_number) projectLocation += `LOT ${application['project_detail'].lot_number} `;
    if (application['project_detail'].house_number) projectLocation += `#${application['project_detail'].house_number} `;
    projectLocation += `${application['project_detail'].street_name} ${application['project_detail'].subdivision} ${application['project_detail'].barangay}`;

    let mismatchFlag = false;
    tokens.every(token => {
      let matchFlag = false;
      [applicationNumber, applicantFullName, projectLocation].every(field => {
        if (this.searchForToken(field, token)) {
          matchFlag = true;
          return false;
        } else {
          return true;
        }
      });

      if (!matchFlag) {
        mismatchFlag = true;
        return false;
      } else {
        return true;
      }
    });

    return !mismatchFlag;
  }

  searchForToken(string, key) {
    return string.toLowerCase().indexOf(key.toLowerCase()) !== -1;
  }

  getApplicationStatus(id): string {
    return applicationStatus[id];
  }

  getConstructionType(id): string {
    return constructionType[id];
  }

  getPermitType(id): string {
    return applicationTypes[id];
  }

  chooseApplication($event) {
    this.emitApplication.emit($event);
  }

  deleteApplication(id) {
    Swal.fire({
      title: 'Are you sure you want to delete your application?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Delete`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.applicationService.deleteApplication(id).subscribe((res) => {
          Swal.fire('Success!', `Application deleted.`, 'success').then(
            (res) => {
              window.location.reload();
            }
          );
        });
      } else if (result.isDenied) {
      }
    });
  }
}
