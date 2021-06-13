import { TreasuryService } from './../treasury-service.service';
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
import Swal from 'sweetalert2';

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
    private treasuryService: TreasuryService,
    public dialogRef: MatDialogRef<TreasuryPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    this.paymentDetails = this.fb.group({
      receipt: new FormControl('', [Validators.required]),
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  handlePaid() {
    this.isLoading = true;
    const code = this.data.applicationDetails.ocpas_code;
    const body = {
      payment_releasing_status_id: 2,
      official_receipt_number_releasing: this.paymentDetails.value.receipt,
    };
    this.treasuryService.updatePaymentStatus(body, code).subscribe((res) => {
      Swal.fire('Success!', `Permit Fees - Paid!`, 'success').then((result) => {
        this.isLoading = false;
        window.location.reload();
      });
    });
  }
}
