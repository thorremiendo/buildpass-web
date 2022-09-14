import { NoticeOfViolationService } from './../../core/services/notice-of-violation.service';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core';

@Component({
  selector: 'app-notice-of-violation-remarks',
  templateUrl: './notice-of-violation-remarks.component.html',
  styleUrls: ['./notice-of-violation-remarks.component.scss'],
})
export class NoticeOfViolationRemarksComponent implements OnInit {
  @Input() evaluatorDetails;

  public remarksForm: FormGroup;
  public editRemarksForm: FormGroup;
  displayedColumns: string[] = [
    'index',
    'date',
    'remark',
    'evaluator',
    'action',
  ];
  public isLoading: boolean = false;
  public remarksData;
  public novId;
  public novDetails;
  public isSubmitting: boolean = false;
  public editMode: boolean = false;
  constructor(
    private fb: FormBuilder,
    private novService: NoticeOfViolationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.novId = this.route.snapshot.params.id;
    this.fetchNovDetails();
    this.remarksForm = this.fb.group({
      remarks: new FormControl('', [Validators.required]),
    });
    this.editRemarksForm = this.fb.group({
      updateRemark: new FormControl('', [Validators.required]),
    });
  }

  // editRemark(item) {
  //   console.log(item);
  //   this.editMode = true;
  //   this.editRemarksForm.patchValue({
  //     updateRemark: item.remarks,
  //   });
  // }

  // updateRemark(item) {
  //   this.applicationService
  //     .editGeneralRemark(item.id, {
  //       remarks: this.editRemarksForm.value.updateRemark,
  //     })
  //     .subscribe((res) => {
  //       this.editMode = false;
  //       this.fetchNovDetails();
  //     });
  // }
  // deleteRemark(item) {
  //   console.log(item);
  //   this.applicationService
  //     .deleteGeneralRemark(item.id, {})
  //     .subscribe((res) => {
  //       console.log(res);
  //       this.fetchNovDetails();
  //     });
  // }

  fetchNovDetails() {
    this.isLoading = true;
    this.novService.getSubById(this.novId).subscribe((result) => {
      this.novDetails = result.data[0];
      this.remarksData = this.novDetails.remarks;
      console.log('re', this.remarksData);
      this.isLoading = false;
    });
  }

  addRemarks() {
    this.isSubmitting = true;
    const body = {
      sub_notice_id: this.novId,
      evaluator_user_id: this.evaluatorDetails.id,
      remarks: this.remarksForm.value.remarks,
    };
    this.novService.addRemarks(body).subscribe((res) => {
      this.remarksForm.reset();
      this.fetchNovDetails();
      this.isSubmitting = false;
    });
  }
}
