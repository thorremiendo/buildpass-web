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
export class ApplicationsListComponent implements OnInit {
  @Input() applications: Array<object>;
  @Input() applicationCount: String;
  @Input() pageIndex: String;
  @Input() pageSize: String;
  @Output() emitIndex: EventEmitter<string> = new EventEmitter<string>();
  @Output() emitApplication: EventEmitter<object> = new EventEmitter<object>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private userInfo;
  public filteredApplications = [];
  public currentItemsToShow = [];
  public loading: boolean = true;

  constructor(
    private applicationService: ApplicationInfoService
  ) {}

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.loading = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.applications = [...this.applications];
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

  onPageChange($event) {
    this.emitIndex.emit($event);
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
