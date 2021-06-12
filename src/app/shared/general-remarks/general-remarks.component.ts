import { ActivatedRoute } from '@angular/router';
import { ApplicationInfoService } from 'src/app/core/services/application-info.service';
import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
@Component({
  selector: 'app-general-remarks',
  templateUrl: './general-remarks.component.html',
  styleUrls: ['./general-remarks.component.scss'],
})
export class GeneralRemarksComponent implements OnInit {
  @Input() evaluatorDetails;

  public remarksForm: FormGroup;
  displayedColumns: string[] = ['index', 'date', 'remark', 'evaluator'];
  public isLoading: boolean = false;
  public remarksData;
  public applicationId;
  public applicationDetails;
  public isSubmitting: boolean = false;
  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationInfoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.applicationId = this.route.snapshot.params.id;
    this.fetchApplicationDetails();
    this.remarksForm = this.fb.group({
      remarks: new FormControl('', [Validators.required]),
    });
  }

  fetchApplicationDetails() {
    this.isLoading = true;
    this.applicationService
      .fetchApplicationInfo(this.applicationId)
      .subscribe((result) => {
        this.applicationDetails = result.data;
        this.remarksData = this.applicationDetails.remarks;
        console.log(this.remarksData);
        this.isLoading = false;
      });
  }

  addRemarks() {
    this.isSubmitting = true;
    const body = {
      application_id: this.applicationDetails.id,
      evaluator_user_id: this.evaluatorDetails.user_id,
      remarks: this.remarksForm.value.remarks,
    };
    this.applicationService
      .submitGeneralRemark(body, this.applicationDetails.id)
      .subscribe((res) => {
        this.remarksForm.reset();
        this.fetchApplicationDetails();
        this.isSubmitting = false;
      });
  }
}
