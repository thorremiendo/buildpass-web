import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { NewApplicationService } from './../../core/services/new-application.service';
import { ApplicationInfoService } from '../../core/services/application-info.service';
import { officeTypes } from './../../core/enums/offices.enum';

@Component({
  selector: 'app-document-remarks',
  templateUrl: './document-remarks.component.html',
  styleUrls: ['./document-remarks.component.scss']
})
export class DocumentRemarksComponent implements OnInit {
  @Input() document;
  @Input() enableAddRemark: boolean;
  public userInfo;
  public officeId;
  public applicationTimeline;
  public remarks;
  public remarksSorted;
  public newRemark;
  public showFilter: boolean = false;
  public loading: boolean = true;
  public displayedColumns: string[] = [
    'compliance',
    'remark',
  ];

  constructor(
    private newApplicationService: NewApplicationService,
    private applicationService: ApplicationInfoService,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.userInfo = JSON.parse(localStorage.getItem('user'));
      this.officeId = this.userInfo.employee_detail.office_id;
    }

    this.applicationService
      .fetchApplicationTmeline(this.document.application_id)
      .subscribe(res => {
        this.applicationTimeline = res.data;
        this.fetchRemarks(this.document.id);
      });
  }

  getOfficeType(id): string {
    return officeTypes[id];
  }

  toggleFilter() {
    this.showFilter = true;
  }

  chooseOffice(officeId) {
    this.officeId = officeId;
    this.sortByDate(this.filterByOffice(this.remarks));
  }

  filterByOffice(remarks) {
    if (this.officeId == 7) {
      return remarks;
    } else { 
      return remarks.filter(
        log => log.evaluator_detail.employee_detail.office_id == this.officeId
      );
    }
  }

  sortByDate(remarks) {
    const nonComplianceDates = this.applicationTimeline.filter(log => log.office_id == this.officeId && log.color == 'red');
    if (nonComplianceDates.length > 1) {
      nonComplianceDates.forEach(date => {
        const nonComplianceDate = new Date(date.created_at);
        const remarksSorted = {};
        remarksSorted['current'] = [];
        remarks.forEach(revision => {
          const revisionCompletedDate = revision.date_time_complied ? new Date(revision.date_time_complied) : false;
          if (revisionCompletedDate && revisionCompletedDate < nonComplianceDate) {
            if (!remarksSorted[date.created_at]) remarksSorted[date.created_at] = [{...revision}];
            else remarksSorted[date.created_at].push({...revision});
          } else {
            remarksSorted['current'].push({...revision});
          }
        });

        const sortedData = [];
        Object.keys(remarksSorted).filter(key => key != 'current').forEach(date => {
          remarksSorted[date].forEach(log => {
            sortedData.push(log);
          });
          sortedData.push({label: date});
        });
        remarksSorted['current'].forEach(log => {
          sortedData.push(log);
        });
        
        this.remarksSorted = sortedData;
        this.loading = false;
      });
    } else {
      this.remarksSorted = remarks;
      this.loading = false;
    }
  }
  
  setRemarkCompliance(remarkId, $event) {
    this.newApplicationService
      .setRemarkCompliance(remarkId, $event.checked)
      .subscribe(res => {
        this.fetchRemarks(this.document.id);
      });
  }

  fetchRemarks(id) {
    this.applicationService
      .fetchSpecificDocInfo(id)
      .subscribe(res => {
        console.log(res);
        this.remarks = res.data[0].document_revision;
        this.sortByDate(this.filterByOffice(this.remarks));
      });
  }

  addRemark() {
    const newRemark = {
      evaluator_user_id: this.userInfo.id,
      remarks: this.newRemark
    }

    this.newApplicationService
      .updateUserDocs(newRemark, this.document.id)
      .subscribe(res => {
        this.fetchRemarks(this.document.id);
      });
  }

  editRemark(remarkId) {
    const remark = document.getElementById(`remark-${remarkId}`);
    remark.classList.toggle('edit-mode');
  }

  updateRemark(remarkId) {
    const updatedRemark = (<HTMLInputElement>document.getElementById(`edit-remark-${remarkId}`)).value;
    this.newApplicationService
      .updateRemark(remarkId, updatedRemark)
      .subscribe(res => {
        this.editRemark(remarkId);
        this.fetchRemarks(this.document.id);
      });
  }

  deleteRemark(remarkId) {
    this.newApplicationService
      .deleteRemark(remarkId)
      .subscribe(res => {
        this.fetchRemarks(this.document.id);
      });
  }
}

