import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NewApplicationFormService } from 'src/app/core/services/new-application-form-service';

@Component({
  selector: 'app-common-fields',
  templateUrl: './common-fields.component.html',
  styleUrls: ['./common-fields.component.scss']
})
export class CommonFieldsComponent implements OnInit {
  public commonFields: FormGroup;
  public userDetails;

  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private commonFieldService: NewApplicationFormService
  ) { }

  ngOnInit(): void {
    this.commonFields = this.fb.group({
      first_name: new FormControl('', Validators.required),
      middle_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      contact_no: new FormControl('', Validators.required),

    });
    //get user details
  }
  callNext(){

    // const body = {
    //   first_name: //userdetails.firstname
    //   middle_name: value.middle_name,
    //   last_name: value.last_name,
    //   contact_no: value.contact_no
    // };
    // this.commonFieldService.setCommonFields(body)
    this.router.navigateByUrl('/dashboard/new/initial-forms/zoning-clearance')
  }
}
