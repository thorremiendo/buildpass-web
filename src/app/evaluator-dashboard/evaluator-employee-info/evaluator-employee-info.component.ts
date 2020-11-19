import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterAccountEvaluatorFormService } from '../../core/services/register-account-evaluator-form.service';
import { Router } from '@angular/router';
import { Office, Position } from '../../core/enums/department.enum'

@Component({
  selector: 'app-evaluator-employee-info',
  templateUrl: './evaluator-employee-info.component.html',
  styleUrls: ['./evaluator-employee-info.component.scss']
})
export class EvaluatorEmployeeInfoComponent implements OnInit {

  public userDetails;
  public maxLength: number = 11;
  
  // public officeEnumKeys= [];

  // public office: Office;
  // private _posistion: Position;


  _evaluatorEmployeeInfoForm: FormGroup;
  _submitted = false;


  get evaluatorEmployeeFormControl() {
    return this._evaluatorEmployeeInfoForm.controls;
  }


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _registerAccountEvaluatorFormService: RegisterAccountEvaluatorFormService,

  ) {
    this.createForm();
    // this.officeEnumKeys = Object.keys(this.office);
    
    
   }
  //  change(value: string) {
  //   this.office = this._office[value];
  // }


  createForm() {
    this._evaluatorEmployeeInfoForm = this._fb.group({
      employee_number:['', Validators.required],
      department:[''],
      position: ['', Validators.required],
      contact_number:['', [Validators.required, Validators.maxLength(11),]],
      
    },
    );
  }

  createUserDetails(){

    this.userDetails ={
      "employee_number": this._evaluatorEmployeeInfoForm.value.employee_number,
      "department": this._evaluatorEmployeeInfoForm.value.department,
      "position": this._evaluatorEmployeeInfoForm.value.position, 
      "contact_number":  this._evaluatorEmployeeInfoForm.value.contact_number,
     
      

    }
  
  }

 

  onSubmit(){
    this._submitted = true;
    if (this._evaluatorEmployeeInfoForm.valid){
      this.createUserDetails();
      this._registerAccountEvaluatorFormService.setRegisterAccountInfo(this.userDetails);
      this._router.navigateByUrl("evaluator/registration/summary");
      
      console.log(this.userDetails);

    
    }
  
   
  }

  
  ngOnInit(): void {
    this._registerAccountEvaluatorFormService.cast.subscribe(registerAccountEvaluatorSubject => this.userDetails = registerAccountEvaluatorSubject)
    console.log(this.userDetails)
    this.createForm();
   

    
  }

}
