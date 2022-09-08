import { PopOutNotificationsService } from './../../core/services/pop-out-notification.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { NoticeOfViolationService } from './../../core/services/notice-of-violation.service';
import { Component, OnInit } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-notice-of-violation',
  templateUrl: './details-notice-of-violation.component.html',
  styleUrls: ['./details-notice-of-violation.component.scss'],
})
export class DetailsNoticeOfViolationComponent implements OnInit {
  mainNoticeId;
  actionsList = [];
  selectedActions = [];
  actionOthers;
  public photoA: File;
  public photoB: File;
  photoApath;
  photoBpath;
  subType = new FormControl('');
  isLoading: boolean = false;
  constructor(
    private nov: NoticeOfViolationService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private notif: PopOutNotificationsService
  ) {
    this.subType.valueChanges.subscribe((res) => {
      this.nov.getActions(res).subscribe((res) => {
        this.actionsList = res.data;
        console.log(this.actionsList);
      });
    });
  }

  ngOnInit(): void {
    this.mainNoticeId = this.route.snapshot.params.id;
    console.log(this.mainNoticeId);
  }

  handleUpload(file) {
    return this.nov.uploadFile({ file });
  }

  onSelect($event: NgxDropzoneChangeEvent, type) {
    const file = $event.addedFiles[0];
    switch (type) {
      case 'photoA':
        this.photoA = file;
        this.handleUpload(this.photoA).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            this.photoApath = err.error.text;
          }
        );
        break;
      case 'photoB':
        this.photoB = file;
        this.handleUpload(this.photoB).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            this.photoBpath = err.error.text;
          }
        );
        break;
    }
  }
  onRemove(type) {
    switch (type) {
      case 'photoA':
        this.photoA = null;
        break;
      case 'photoB':
        this.photoB = null;
        break;
    }
  }

  handleRemove(index) {
    this.selectedActions.splice(index, 1);
  }

  handleAction(e) {
    console.log(e);
    if (e.checked == true) {
      this.selectedActions.push(e.source.value);
    } else {
      const find = this.selectedActions.find(
        (element) => element == e.source.value
      );
      const index = this.selectedActions.indexOf(find);
      this.selectedActions.splice(index, 1);
    }
  }

  generatePdf() {
    // this.nov.insertWaterMark().then((blob) => {});
    this.handleUpload(this.photoA).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err.error.text);
      }
    );
  }

  handleNext() {
    const body = {
      main_notice_id: this.mainNoticeId,
      type_id: this.subType.value,
      status_id: 1,
      photo_a_path: this.photoApath,
      photo_b_path: this.photoBpath,
      actions: this.selectedActions.toString(),
      notice_of_violation_form_path: '',
      notice_of_violation_photo_path: '',
    };
    this.nov.addSubNov(body).subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
        this.notif.openSnackBar('Success!');
        this.router.navigate(['/evaluator/nov/new/form', res.data.id]);
      },
      (err) => {
        this.isLoading = false;
        this.notif.openSnackBar('An error occured! Please try again.');
      }
    );
  }
}
