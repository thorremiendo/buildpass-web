import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-treasury-payment-dialog',
  templateUrl: './treasury-payment-dialog.component.html',
  styleUrls: ['./treasury-payment-dialog.component.scss'],
})
export class TreasuryPaymentDialogComponent implements OnInit {
  public paymentDetails: FormGroup;
  public isLoading: boolean = false;
  get paymentDetailsControl() {
    return this.paymentDetails.controls;
  }
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TreasuryPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    this.paymentDetails = this.fb.group({
      receipt: new FormControl('', [Validators.required]),
    });
  }
}
