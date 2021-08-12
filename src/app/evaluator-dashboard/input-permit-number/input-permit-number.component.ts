import { Component, OnInit, Inject } from '@angular/core';
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
import { ApplicationInfoService } from 'src/app/core';
@Component({
  selector: 'app-input-permit-number',
  templateUrl: './input-permit-number.component.html',
  styleUrls: ['./input-permit-number.component.scss'],
})
export class InputPermitNumberComponent implements OnInit {
  public permitDetails: FormGroup;
  get permitDetailsControl() {
    return this.permitDetails.controls;
  }
  public isLoading: boolean = false;
  constructor(
    private applicationService: ApplicationInfoService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InputPermitNumberComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.permitDetails = this.fb.group({
      permit_number: new FormControl('', [Validators.required]),
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  handleUpdate() {
    this.isLoading = true;
    const body = {
      permit_released_code: this.permitDetails.value.permit_number,
    };
    this.applicationService
      .updateApplicationInfo(body, this.data.applicationDetails.id)
      .subscribe((res) => {
        this.isLoading = false;
        window.location.reload();
      });
  }
}
