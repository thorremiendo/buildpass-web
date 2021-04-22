import { Component, OnInit, ViewChild, TemplateRef, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  @ViewChild('feedbackTemplate', {static: true}) feedbackTemplate: TemplateRef<any>;
  public feedbackForm: FormGroup;
  public userId: string;
  public submitted = false;
  private dialog;

  get feedbackFormControl() {
    return this.feedbackForm.controls;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private matDialog: MatDialog,
  ) {
    var user = JSON.parse(localStorage.getItem('user'));
    this.userId = user.id;

    this.feedbackForm = this.formBuilder.group({
      category:['', Validators.required],
      feedback:['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.openDialog();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "auto";
    dialogConfig.width = "700px";

    this.dialog = this.matDialog.open(this.feedbackTemplate, dialogConfig);
    this.dialog.afterClosed().subscribe(result => {
      this.router.navigate([{outlets: {modal: null}}], {relativeTo: this.route.parent});
    });
  }

  closeModal() {
    this.dialog.close();
  }

  onSubmit() {
    this.submitted = true;
    if (this.feedbackForm.valid) {
      const data = {
        user_id: this.userId,
        page: this.feedbackForm.value.category,
        feedback: this.feedbackForm.value.feedback,
      }

      this.feedbackService.submitFeedback(data).subscribe(res => {
        Swal.fire('Success!', `Feedback submitted.`, 'success').then(
          (result) => {
            this.closeModal();
          }
        );
      });
    }
  }
}
