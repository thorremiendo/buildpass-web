import { officeTypes } from './../../core/enums/offices.enum';
import { NewApplicationService } from './../../core/services/new-application.service';
import { ApplicationInfoService } from '../../core/services/application-info.service';
import {
  Component,
  OnInit,
  Inject,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-remarks-history-table',
  templateUrl: './remarks-history-table.component.html',
  styleUrls: ['./remarks-history-table.component.scss'],
})
export class RemarksHistoryTableComponent implements OnInit {
  @Input() enableAddRemark: boolean;
  @ViewChild(MatTable) remarksTable: MatTable<any>;
  @Output() addUnsavedRemark: EventEmitter<any> = new EventEmitter();
  public documentTypes;
  public documentId;
  public documentType;
  public applicationTimeline;
  public remarks;
  public remarksSorted;
  public officeId;
  public userId;
  public newRemark;
  public showFilter: boolean = false;
  public isLoading: boolean = true;
  public displayedColumns: string[] = ['compliance', 'remark'];

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

    this.newApplicationService.fetchDocumentTypes().subscribe((res) => {
      this.documentTypes = res.data;

      this.applicationService
        .fetchApplicationTmeline(this.data.form.application_id)
        .subscribe((res) => {
          this.documentId = this.data.form.id;
          this.documentType = this.data.form.document_id;
          this.applicationTimeline = res.data;
          this.remarks = this.data.form.document_revision;
          this.officeId = this.data.evaluator
            ? this.data.evaluator.office_id
            : 7;
          this.sortByDate(this.filterByOffice());
        });
    });
  }

  getDocType(id): string {
    return this.documentTypes[id - 1].name;
  }

  getOfficeType(id): string {
    return officeTypes[id];
  }

  chooseOffice(officeId) {
    this.officeId = officeId;
    this.sortByDate(this.filterByOffice());
  }

  filterByOffice() {
    if (this.officeId == 7) return this.remarks;
    else
      return this.remarks.filter(
        (log) => log.evaluator_detail.employee_detail.office_id == this.officeId
      );
  }

  sortByDate(remarks) {
    const nonComplianceDates = this.applicationTimeline.filter(
      (log) => log.office_id == this.officeId && log.color == 'red'
    );
    if (nonComplianceDates.length > 1) {
      nonComplianceDates.forEach((date) => {
        const nonComplianceDate = new Date(date.created_at);
        const remarksSorted = {};
        remarksSorted['current'] = [];
        remarks.forEach((revision) => {
          const revisionCompletedDate = revision.date_time_complied
            ? new Date(revision.date_time_complied)
            : false;
          if (
            revisionCompletedDate &&
            revisionCompletedDate < nonComplianceDate
          ) {
            if (!remarksSorted[date.created_at])
              remarksSorted[date.created_at] = [{ ...revision }];
            else remarksSorted[date.created_at].push({ ...revision });
          } else {
            remarksSorted['current'].push({ ...revision });
          }
        });

        const sortedData = [];
        Object.keys(remarksSorted)
          .filter((key) => key != 'current')
          .forEach((date) => {
            remarksSorted[date].forEach((log) => {
              sortedData.push(log);
            });
            sortedData.push({ label: date });
          });
        remarksSorted['current'].forEach((log) => {
          sortedData.push(log);
        });

        this.remarksSorted = sortedData;
        this.isLoading = false;
      });
    } else {
      this.remarksSorted = remarks;
      this.isLoading = false;
    }
  }

  setRemarkCompliance(remarkId, $event) {
    this.newApplicationService
      .setRemarkCompliance(remarkId, $event.checked)
      .subscribe((res) => {
        this.fetchRemarks();
      });
  }

  fetchRemarks() {
    this.applicationService
      .fetchSpecificDocInfo(this.documentId)
      .subscribe((res) => {
        this.remarks = res.data[0].document_revision;
        this.sortByDate(this.filterByOffice());
      });
  }

  addRemark() {
    const newRemark = {
      evaluator_user_id: this.data.evaluator.user_id,
      remarks: this.newRemark,
    };
    this.newApplicationService
      .updateUserDocs(newRemark, this.documentId)
      .subscribe((res) => {
        this.fetchRemarks();
        this.newRemark = '';
      });
  }

  editRemark(remarkId) {
    const remark = document.getElementById(`remark-${remarkId}`);
    remark.classList.toggle('edit-mode');
  }

  updateRemark(remarkId) {
    const updatedRemark = (<HTMLInputElement>(
      document.getElementById(`edit-remark-${remarkId}`)
    )).value;
    this.newApplicationService
      .updateRemark(remarkId, updatedRemark)
      .subscribe((res) => {
        this.editRemark(remarkId);
        this.fetchRemarks();
      });
  }

  deleteRemark(remarkId) {
    this.newApplicationService.deleteRemark(remarkId).subscribe((res) => {
      this.fetchRemarks();
    });
  }

  toggleFilter() {
    this.showFilter = true;
  }

  closeModal() {
    this.dialogRef.close();
  }

  onChange(e) {
    this.addUnsavedRemark.emit(e);
  }
}
