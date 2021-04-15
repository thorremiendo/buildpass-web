import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { applicationStatus } from '../../core/enums/application-status.enum';
import { applicationTypes } from '../../core/enums/application-type.enum';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss']
})
export class ApplicationsListComponent implements OnInit {
  @Input() applications: Array<object>;
  @Output() emitApplication: EventEmitter<object> = new EventEmitter<object>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public filteredApplications = [];
  public currentItemsToShow = [];
  public loading: boolean = true;
  public applicationNumber = new FormControl('');
  public permitType =  new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.filteredApplications = this.applications;
    this.currentItemsToShow = this.filteredApplications.slice(0*5, 0*5 + 5);
    this.loading = false;

    this.applicationNumber.valueChanges.subscribe(res => {
      this.filteredApplications = this.applications.filter(application => application['permit_application_code'].toLowerCase().includes(res.toLowerCase()));
      this.currentItemsToShow = this.filteredApplications.slice(this.paginator.pageIndex*this.paginator.pageSize, this.paginator.pageIndex*this.paginator.pageSize + this.paginator.pageSize);
      this.paginator.firstPage();
    });

    this.permitType.valueChanges.subscribe(res => {
      if (res == 0) {
        this.filteredApplications = this.applications;
      } else {
        this.filteredApplications = this.applications.filter(application => application['permit_type_id'] == res);
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

  chooseApplication($event) {
    this.emitApplication.emit($event);
  }

}
