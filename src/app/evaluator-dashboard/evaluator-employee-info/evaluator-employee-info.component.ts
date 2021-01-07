import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterAccountEvaluatorFormService } from '../../core/services/register-account-evaluator-form.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Position, Office } from '../../core/enums/department.enum'

@Component({
  selector: 'app-evaluator-employee-info',
  templateUrl: './evaluator-employee-info.component.html',
  styleUrls: ['./evaluator-employee-info.component.scss']
})
export class EvaluatorEmployeeInfoComponent implements OnInit {

  public userDetails;
  public maxLength: number = 11;

  _submitted = false;
  _evaluatorEmployeeInfoForm: FormGroup;

  _filteredOfficeOptions: Observable<string[]>;
  _filteredPositionOptions: Observable<string[]>;
 
  _office_options:string[] = Object.keys(Office).map(key => Office[key]).filter(k => !(parseInt(k) >= 0));
  _position_options:string[] = Object.keys(Position).map(key => Position[key]).filter(k => !(parseInt(k) >= 0));
  
  get evaluatorEmployeeFormControl() {
    return this._evaluatorEmployeeInfoForm.controls;
  }


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _registerAccountEvaluatorFormService: RegisterAccountEvaluatorFormService,

  ) {
    this.createForm();
    
    
   }
 


  createForm() {
    this._evaluatorEmployeeInfoForm = this._fb.group({
      employee_number:['', Validators.required],
      office:['', Validators.required],
      position: ['', Validators.required],
      contact_number:['', [Validators.required, Validators.maxLength(11),]],
      
    },
    );
  }

  createUserDetails(){

    this.userDetails ={
      "employee_number": this._evaluatorEmployeeInfoForm.value.employee_number,
      "office": this._evaluatorEmployeeInfoForm.value.office,
      "position": this._evaluatorEmployeeInfoForm.value.position, 
      "contact_number":  this._evaluatorEmployeeInfoForm.value.contact_number,
     
    }
  
  }

 

  onSubmit(){
    this._submitted = true;
    if (this._evaluatorEmployeeInfoForm.valid){
      this.createUserDetails();
      this._registerAccountEvaluatorFormService.setRegisterAccountInfo(this.userDetails);
      this._router.navigateByUrl("evaluator/registration/identification-info");
      
      console.log(this.userDetails);
    
    }
  
  }
  _filterOffice(value: string): string[] {
    const filterValueOffice = value.toLowerCase();

    return this._office_options.filter(_office_option=> _office_option.toLowerCase().includes(filterValueOffice));
  }


  _filterPosition(value: string): string[] {
    const filterValuePosition = value.toLowerCase();

    return this._position_options.filter(_position_option=> _position_option.toLowerCase().includes(filterValuePosition));
  }

  
  ngOnInit(): void {
    this._registerAccountEvaluatorFormService.cast.subscribe(registerAccountEvaluatorSubject => this.userDetails = registerAccountEvaluatorSubject)
    this.createForm();
    this._evaluatorEmployeeInfoForm.patchValue({
      employee_number: this.userDetails.employee_number,
      office: this.userDetails.office,
      position: this.userDetails.position, 
      contact_number:  this.userDetails.contact_number,
      
    });
    console.log(this.userDetails)
    

    this._filteredOfficeOptions = this.evaluatorEmployeeFormControl.office.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOffice(value))
    );

    this._filteredPositionOptions = this.evaluatorEmployeeFormControl.position.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPosition(value))
    );

   
  }
}

    


