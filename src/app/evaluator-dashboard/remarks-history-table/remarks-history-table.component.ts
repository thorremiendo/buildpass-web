import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { officeTypes } from './../../core/enums/offices.enum';
import { NewApplicationService } from './../../core/services/new-application.service';
import { ApplicationInfoService } from '../../core/services/application-info.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-remarks-history-table',
  templateUrl: './remarks-history-table.component.html',
  styleUrls: ['./remarks-history-table.component.scss'],
})
export class RemarksHistoryTableComponent implements OnInit {
  @Input() id: string;
  @ViewChild(MatTable) revisionsTable: MatTable<any>;
  public remarksForm: FormGroup;

  public applicationTimeline;
  public revisionList;
  public officeId;

  public isLoading: boolean = true;
  public revisionData;
  public useDefault: boolean = false;
  public nonComplianceDates = [];
  public revisionLogs = {};
  displayedColumns: string[] = [
    'index',
    'remark',
    'evaluator',
    'office',
    'date_created',
    'date_complied',
  ];

  constructor(
    private newApplicationService: NewApplicationService,
    private applicationService: ApplicationInfoService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RemarksHistoryTableComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    this.remarksForm = this.fb.group({
      remarks: new FormControl('', [Validators.required]),
    });

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
  
  onNoClick(): void {
    this.dialogRef.close();
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
    this.nonComplianceDates = this.applicationTimeline.filter(log => log.office_id == this.officeId && log.color == 'red');
    if (this.nonComplianceDates.length > 1) {
      this.nonComplianceDates.forEach(date => {
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
        this.revisionList.find(revision => revision.id == res.data.id).date_time_complied == res.data.date_time_complied;
      });
  }

  toggle(event: MatSlideToggleChange) {
    this.useDefault = event.checked;
    if (this.useDefault == true) {
      this.revisionData = this.data.form.document_revision;
    } else {
      this.filterByOffice();
    }
  }

  canAddRemark() {
    const status = this.data.applicationInfo.application_status_id;
    const role = this.data.evaluatorRole.code;

    if (status == 1 && role == 'CBAO-REC') {
      return true;
    } else if (status == 2 && (role == 'CPDO-ADM' || role == 'CPDO-ZI')) {
      return true;
    } else if (status == 10 && role == 'CPDO-COD') {
      return true;
    } else if (
      (status == 3 || status == 18) &&
      (role == 'DH-CEPMO' ||
        role == 'CEPMO-ENGR' ||
        role == 'CEPMO-DV' ||
        role == 'DH-BFP' ||
        role == 'BFP-FCA' ||
        role == 'BFP-INS' ||
        role == 'BFP-CHF' ||
        role == 'BFP-CFD' ||
        role == 'CBAO-LG' ||
        role == 'CBAO-ARCH' ||
        role == 'CBAO-STR' ||
        role == 'CBAO-SAN' ||
        role == 'CBAO-ELEC' ||
        role == 'CBAO-MEC' ||
        role == 'CBAO-REL')
    ) {
      return true;
    } else if (status == 12 && role == 'CBAO-DC') {
      return true;
    } else if (status == 13 && role == 'CBAO-BO') {
      return true;
    } else {
      return false;
    }
  }

  addRemarks() {
    const id = this.data.form.id;
    const revisionData = {
      evaluator_user_id: this.data.evaluator.user_id,
      remarks: this.remarksForm.value.remarks,
    };
    this.newApplicationService
      .updateUserDocs(revisionData, id)
      .subscribe((res) => {
        Swal.fire('Success!', `Remarks added!`, 'success').then((result) => {
          this.onNoClick();
        });
      });
  }
}
