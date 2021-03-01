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
import { ActivatedRoute, Router, Data } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';
import { NewApplicationService } from 'src/app/core/services/new-application.service';
import { UserService } from 'src/app/core/services/user.service';
import { ApplicationFeesService } from 'src/app/core/services/application-fees.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-fees-dialog',
  templateUrl: './fees-dialog.component.html',
  styleUrls: ['./fees-dialog.component.scss'],
})
export class FeesDialogComponent implements OnInit {
  public typeOfFee = new FormControl();
  public user;
  public userDetails;
  public applicationId;
  public feesDetails: FormGroup;
  public evaluatorDetails;
  public fees;
  public isLoading: boolean = true;
  filteredOptions: Observable<string[]>;
  get feesDetailsControl() {
    return this.feesDetails.controls;
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newApplicationService: NewApplicationService,
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private applicationFeeService: ApplicationFeesService,
    public dialogRef: MatDialogRef<FeesDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.evaluatorDetails = this.user.employee_detail;
    console.log('Current user', this.user);
    this.applicationId = this.data.route.snapshot.params.id;
    console.log(this.applicationId);
    console.log(this.data);
    this.feesDetails = this.fb.group({
      description: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
    });
    this.fetchFeeTypes();
  }
  filterFees() {
    this.filteredOptions = this.typeOfFee.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value))
    );
    this.isLoading = false;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.fees.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  fetchFeeTypes() {
    this.applicationFeeService.fetchAllFees().subscribe((res) => {
      this.fees = res.data;
      this.filterFees();
    });
  }
  onSubmit() {
    this.isLoading = true;
    const value = this.feesDetails.value;
    const newItem = {
      application_id: this.applicationId,
      name: this.typeOfFee.value,
      amount: value.amount,
      office_id: this.evaluatorDetails.office_id,
      evaluator_user_id: this.evaluatorDetails.id,
      action_id: 1,
      fee_id: 0,
    };

    this.applicationFeeService.addFee(newItem).subscribe((res) => {
      console.log(res);
      this.isLoading = false;

      this.onNoClick();
    });
  }
}
