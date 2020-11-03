import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.scss']
})
export class NewApplicationComponent implements OnInit {
  public selectedPermitType;
  public isRepresentative;
  public isLotOwner;
  public permitStepOneForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.permitStepOneForm = this.fb.group({
      application_type: new FormControl("", Validators.required),
      is_representative: new FormControl("", Validators.required),
      is_lot_owner: new FormControl("", Validators.required),
    }) 
  }

  callNext(){
    const value = this.permitStepOneForm.value
    const body = {
      "application_type": value.application_type,
      "is_representative": value.is_representative,
      "is_lot_owner": value.is_lot_owner
    }
    console.log(body)
  }

}
