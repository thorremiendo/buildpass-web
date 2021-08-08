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
  FormArray,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public firstName;
  public lastName;
  public coOwners = [];
  public wifeFirstName;
  public wifeLastName;
  public husbandFirstName;
  public husbandLastName;
  public typeOfOccupancy;
  public isLoading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AssociateOldBpComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data,
    private occupancyService: OccupancyService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.oldBpDetailsForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      corporation_name: ['', Validators.required],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addOwner(): void {
    this.coOwners.push({
      first_name: this.firstName,
      last_name: this.lastName,
    });
    this.firstName = '';
    this.lastName = '';
  }

  removeOwner(i) {
    this.coOwners.splice(i, 1);
  }

  submit() {
    this.isLoading = true;
    const corporationDetails = this.oldBpDetailsForm.value.corporation_name;
    const individualDetails = {
      first_name: this.oldBpDetailsForm.value.first_name,
      last_name: this.oldBpDetailsForm.value.last_name,
    };
    const coOwners = this.coOwners;
    const spouseDetails = {
      wife_first_name: this.wifeFirstName,
      wife_last_name: this.wifeLastName,
      husband_first_name: this.husbandFirstName,
      husband_last_name: this.husbandLastName,
    };
    const id = this.data.oldBpInfo.generated_application_id;
    const body = {
      user_id: this.data.oldBpInfo.user_id,
      associated_id: this.data.oldBpInfo.id,
      old_permit_number: this.data.oldBpInfo.old_permit_number,
    };
    console.log(id, body);
    this.occupancyService.confirmOldBp(id, body).subscribe((res) => {
      debugger;
      const generatedId = res.data.id;
      const body = {
        user_id: this.data.oldBpInfo.user_id,
        associated_id: this.data.oldBpInfo.id,
        old_permit_number: this.data.oldBpInfo.old_permit_number,
        owner_type_id: this.typeOfOwnership,
        ownership_details:
          this.typeOfOwnership == 1
            ? corporationDetails
            : this.typeOfOwnership == 2
            ? individualDetails
            : this.typeOfOwnership == 3
            ? coOwners
            : this.typeOfOwnership == 4
            ? spouseDetails
            : '',
        occupancy_classification_id: this.typeOfOccupancy,
      };
      this.occupancyService
        .createOldBpOwnerDetals(generatedId, body)
        .subscribe((res) => {
          this.isLoading = false;
          this.openSnackBar('Saved!');
          window.location.reload();
          this.onNoClick();
        });
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      // horizontalPosition: 'right',
      // verticalPosition: 'top',
    });
  }
}
