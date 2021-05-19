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
import { ApplicationInfoService, EvaluatorService } from '../../core';
import Swal from 'sweetalert2';

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
  public applicationNumber = new FormControl('');
  public permitType = new FormControl('');

  constructor(
    private evaluatorService: EvaluatorService,
    private applicationService: ApplicationInfoService,
  ) {}

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user'));

    this.filteredApplications = this.applications;
    this.currentItemsToShow = this.filteredApplications.slice(0 * 5, 0 * 5 + 5);
    this.loading = false;

    this.applicationNumber.valueChanges.subscribe((res) => {
      this.filteredApplications = this.applications.filter((application) =>
        application['permit_application_code']
          .toLowerCase()
          .includes(res.toLowerCase())
      );
      this.currentItemsToShow = this.filteredApplications.slice(
        this.paginator.pageIndex * this.paginator.pageSize,
        this.paginator.pageIndex * this.paginator.pageSize +
          this.paginator.pageSize
      );
      this.paginator.firstPage();
    });

    this.permitType.valueChanges.subscribe((res) => {
      if (res == 0) {
        this.filteredApplications = this.applications;
      } else {
        this.filteredApplications = this.applications.filter(
          (application) => application['permit_type_id'] == res
        );
      }
      this.currentItemsToShow = this.filteredApplications.slice(
        this.paginator.pageIndex * this.paginator.pageSize,
        this.paginator.pageIndex * this.paginator.pageSize +
          this.paginator.pageSize
      );
      this.paginator.firstPage();
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
      this.paginator.firstPage();
      this.loading = false;
    }, 3000);
  }

  onPageChange($event) {
    this.currentItemsToShow = this.filteredApplications.slice(
      $event.pageIndex * $event.pageSize,
      $event.pageIndex * $event.pageSize + $event.pageSize
    );
  }

  getApplicationStatus(id): string {
    return applicationStatus[id];
  }

  getPermitType(id): string {
    return applicationTypes[id];
  }

  chooseApplication($event) {
    this.emitApplication.emit($event);
  }

  deleteApplication(id) {
    Swal.fire({
      title: 'Are you sure you want to delete application?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Delete`,
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.applicationService.deleteApplication(id).subscribe(res => {
          Swal.fire('Success!', `Application deleted.`, 'success').then(res => {
              window.location.reload();
            }
          );
        });
      } else if (result.isDenied) {
        
      }
    });
  }

  //   btnCategoryClick(status_id: number ){

  //     this.evaluatorService.fetchApplicationByStatus(this.userInfo.id, status_id)
  //     this.filteredApplications = this.applications.filter(application => application['permit_application_code'].toLowerCase().includes(res.toLowerCase()));
  //     console.log(this.filteredApplications)
  //     this.currentItemsToShow = this.filteredApplications.slice(this.paginator.pageIndex*this.paginator.pageSize, this.paginator.pageIndex*this.paginator.pageSize + this.paginator.pageSize);
  //     console.log(this.currentItemsToShow);
  //     this.paginator.firstPage();

  // }
}
