import { officeTypes } from './../../core/enums/offices.enum';
import { NewApplicationService } from './../../core/services/new-application.service';
import { ApplicationInfoService } from '../../core/services/application-info.service';
import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-remarks-history-table',
  templateUrl: './remarks-history-table.component.html',
  styleUrls: ['./remarks-history-table.component.scss'],
})
export class RemarksHistoryTableComponent implements OnInit {
  @Input() id: string;
  @ViewChild(MatTable) revisionsTable: MatTable<any>;
  public applicationTimeline;
  public revisionList;
  public revisionData;
  public officeId;
  public userId;
  public isLoading: boolean = true;
  displayedColumns: string[] = [
    'compliance',
    'remark',
  ];

  constructor(
    private newApplicationService: NewApplicationService,
    private applicationService: ApplicationInfoService,
    public dialogRef: MatDialogRef<RemarksHistoryTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      this.userId = userInfo.id;
    }

    this.applicationService
      .fetchApplicationTmeline(this.data.form.application_id)
      .subscribe(res => {
        this.applicationTimeline = res.data;
        this.revisionList = this.data.form.document_revision;
        this.officeId = this.data.evaluator ? this.data.evaluator.office_id : 7;
        this.sortByDate(this.filterByOffice());
      });
  }

  getOfficeType(id): string {
    return officeTypes[id];
  }

  chooseOffice(officeId) {
    this.officeId = officeId;
    this.sortByDate(this.filterByOffice());
  }

  filterByOffice() {
    if (this.officeId == 7) return this.revisionList;
    else return this.revisionList.filter(
      log => log.evaluator_detail.employee_detail.office_id == this.officeId
    );
  }

  sortByDate(revisions) {
    const nonComplianceDates = this.applicationTimeline.filter(log => log.office_id == this.officeId && log.color == 'red');
    if (nonComplianceDates.length > 1) {
      nonComplianceDates.forEach(date => {
        const nonComplianceDate = new Date(date.created_at);
        const revisionData = {};
        revisionData['current'] = [];
        revisions.forEach(revision => {
          const revisionCompletedDate = revision.date_time_complied ? new Date(revision.date_time_complied) : false;
          if (revisionCompletedDate && revisionCompletedDate < nonComplianceDate) {
            if (!revisionData[date.created_at]) revisionData[date.created_at] = [{...revision}];
            else revisionData[date.created_at].push({...revision});
          } else {
            revisionData['current'].push({...revision});
          }
        });

        const sortedData = [];
        Object.keys(revisionData).filter(key => key != 'current').forEach(date => {
          revisionData[date].forEach(log => {
            sortedData.push(log);
          });
          sortedData.push({label: date});
        });
        revisionData['current'].forEach(log => {
          sortedData.push(log);
        });
        
        this.revisionData = sortedData;
        this.isLoading = false;
      });
    } else {
      this.revisionData = revisions;
      this.isLoading = false;
    }
  }
  
  setRemarkCompliance(remarkId, $event) {
    this.newApplicationService
      .setRemarkCompliance(remarkId, $event.checked)
      .subscribe(res => {
        this.dialogRef.close();
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
        this.dialogRef.close();
      });
  }

  deleteRemark(remarkId) {
    this.newApplicationService
      .deleteRemark(remarkId)
      .subscribe(res => {
        this.dialogRef.close();
      });
  }
}
