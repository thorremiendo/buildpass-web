import { officeTypes } from './../../core/enums/offices.enum';
import { NewApplicationService } from './../../core/services/new-application.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-remarks-history-table',
  templateUrl: './remarks-history-table.component.html',
  styleUrls: ['./remarks-history-table.component.scss'],
})
export class RemarksHistoryTableComponent implements OnInit {
  public remarksForm: FormGroup;
  public isLoading: boolean = true;
  public revisionData;
  displayedColumns: string[] = [
    'index',
    'date',
    'remark',
    'evaluator',
    'office',
  ];

  constructor(
    private newApplicationService: NewApplicationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RemarksHistoryTableComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    this.revisionData = this.data.form.document_revision;
    console.log(this.revisionData);
    this.isLoading = false;
    this.remarksForm = this.fb.group({
      remarks: new FormControl('', [Validators.required]),
    });
  }
  getOfficeType(id): string {
    return officeTypes[id];
  }
  onNoClick(): void {
    this.dialogRef.close();
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
