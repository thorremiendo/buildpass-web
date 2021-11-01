import { SchedulingService } from './../../core/services/scheduling.service';
import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-add-inspection',
  templateUrl: './add-inspection.component.html',
  styleUrls: ['./add-inspection.component.scss'],
})
export class AddInspectionComponent implements OnInit {
  public userDetails;
  selectedDate: Date | null;
  public selectedSlot;
  public date;
  public selectedTime;
  public errorMessage;
  public isLoading: boolean = false;
  public minDate: Date;
  public notes = new FormControl();
  onClose = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AddInspectionComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private inspectionService: SchedulingService
  ) {}

  ngOnInit(): void {
    this.minDate = new Date();
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDialogClose() {
    this.onClose.emit();
  }

  onSelect(event) {
    this.selectedDate = event;
    this.date = this.dateToString(this.selectedDate);
  }

  selectTime(time) {
    time.selected = !time.selected;
  }

  dateToString(dateObject) {
    var d = new Date(dateObject),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  time(e) {
    this.selectedTime = e;
  }
  confirm() {
    this.isLoading = true;
    const body = {
      application_id: this.data.application.id,
      evaluator_user_id: this.data.evaluator.user_id,
      scheduled_date: this.date,
      scheduled_time: this.selectedTime,
      notes: this.notes.value,
    };
    this.inspectionService.addInspection(body).subscribe((res) => {
      console.log(res);
      this.isLoading = false;
      this.onNoClick();
      this.onDialogClose();
    });
  }
}
