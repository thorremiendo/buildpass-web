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
  displayedColumns: string[] = ['index', 'date', 'remark', 'evaluator'];

  constructor(
    private newApplicationService: NewApplicationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RemarksHistoryTableComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    this.revisionData = this.data.form.document_revision;
    this.isLoading = false;
    this.remarksForm = this.fb.group({
      remarks: new FormControl('', [Validators.required]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addRemarks() {
    const id = this.data.form.id;
    const revisionData = {
      evaluator_user_id: this.data.evaluator.id,
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
