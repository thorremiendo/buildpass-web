import { Component, OnInit, ViewChild, TemplateRef, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.scss']
})
export class ReportIssueComponent implements OnInit {
  @ViewChild('reportIssueTemplate', {static: true}) reportIssueTemplate: TemplateRef<any>;
  public reportIssueForm: FormGroup;
  public userId: string;
  public submitted = false;
  public applicationNumberList: any =  [];
  public moduleList: any = [];
  private dialog;

  public attachment: File = null;
  private displayAttachment: string | ArrayBuffer = '';

  get reportIssueFormControl() {
    return this.reportIssueForm.controls;
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

    this.reportIssueForm = this.formBuilder.group({
      module:[''],
      applicationNumber:['', Validators.required],
      subject:['', Validators.required],
      description:['', Validators.required],

    });
  }

  ngOnInit(): void {
    if(this.userId){
      this.feedbackService.fetchApplicationNumber(this.userId).subscribe( data => {
        let applications = data.data;
        for( let application of applications){
          this.applicationNumberList.push(application)
        }
      });
      this.feedbackService.fetchModules().subscribe( data => {
        let modules = data.data;
        for( let module of modules){
          this.moduleList.push(module);
        }
      });
    };
  }

  ngAfterViewInit() {
    this.openDialog();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "auto";
    dialogConfig.width = "700px";

    this.dialog = this.matDialog.open(this.reportIssueTemplate, dialogConfig);
    this.dialog.afterClosed().subscribe(result => {
      this.router.navigate([{outlets: {modal: null}}], {relativeTo: this.route.parent});
    });
  }

  openAttachmentChooser() {
    const element: HTMLElement = document.getElementById('attachment') as HTMLElement;
    element.click();
  }

  handleAttachmentChange($event) {
    this.attachment = $event.target.files[0];
    this.readSelectedAttachment();
  }

  readSelectedAttachment() {
    if (this.attachment) {
      let reader = new FileReader();
      reader.onload = (res) => {
        this.displayAttachment = reader.result;
      };
      reader.readAsDataURL(this.attachment);
    }
  }

  closeModal() {
    this.dialog.close();
  }

  onSubmit() {
    this.submitted = true;
    if (this.reportIssueForm.valid) {
      const data = {
        user_id: this.userId,
        module_id: this.reportIssueForm.value.module,
        applicationNumber: this.reportIssueForm.value.applicationNumber,
        subject: this.reportIssueForm.value.subject,
        description: this.reportIssueForm.value.description,
        supporting_file_path: this.attachment ? this.attachment : null,
      }

      console.log(data);

      this.feedbackService.submitReportIssue(data).subscribe(res => {
        Swal.fire('Success!', `Feedback submitted.`, 'success').then(
          (result) => {
            this.closeModal();
          }
        );
      });
    }
  }
}
