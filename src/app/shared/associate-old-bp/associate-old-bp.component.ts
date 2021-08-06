import { OccupancyService } from './../../core/services/occupancy.service';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-associate-old-bp',
  templateUrl: './associate-old-bp.component.html',
  styleUrls: ['./associate-old-bp.component.scss'],
})
export class AssociateOldBpComponent implements OnInit {
  public oldBpDetailsForm: FormGroup;
  public applicationDetails;
  public typeOfOwnership;
  public ownersFormControl = new FormControl();
  public coOwners = [];
  constructor(
    public dialogRef: MatDialogRef<AssociateOldBpComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private occupancyService: OccupancyService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.oldBpDetailsForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
  }
  addOwners() {
    this.coOwners.push(this.ownersFormControl.value);
    console.log(this.coOwners);
  }

  submit() {
    const id = this.data.application.id;
    const body = {
      user_id: this.data.oldBpInfo.user_id,
      associated_id: this.data.oldBpInfo.id,
      old_permit_number: this.data.oldBpInfo.old_permit_number,
      applicant_first_name: this.oldBpDetailsForm.value.first_name,
      applicant_last_name: this.oldBpDetailsForm.value.last_name,
    };
    console.log(id, body);
    this.occupancyService
      .confirmOldBp(id, body)
      .subscribe((res) => console.log(res));
  }
}
