import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Position, Office } from '../../core/enums/department.enum';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-evaluator-employee-info',
  templateUrl: './evaluator-employee-info.component.html',
  styleUrls: ['./evaluator-employee-info.component.scss']
})
export class EvaluatorEmployeeInfoComponent implements OnInit {
  public maxLength: number = 11;
  _filteredOfficeOptions: Observable<string[]>;
  _filteredPositionOptions: Observable<string[]>;
  _office_options:string[] = Object.keys(Office).map(key => Office[key]).filter(k => !(parseInt(k) >= 0));
  _position_options:string[] = Object.keys(Position).map(key => Position[key]).filter(k => !(parseInt(k) >= 0));
  _evaluatorEmployeeInfoForm: FormGroup;
  _submitted: boolean = false;

  get evaluatorEmployeeFormControl() {
    return this._evaluatorEmployeeInfoForm.controls;
  }
  
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createForm();

    this._filteredOfficeOptions = this.evaluatorEmployeeFormControl.office.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOffice(value))
    );
    
    this._filteredPositionOptions = this.evaluatorEmployeeFormControl.position.valueChanges.pipe(
      startWith(''),
      map(value => this.filterPosition(value))
    );   
  }
 
  createForm() {
    const employeeNumber = this._localStorageService.get('evaluator-registration-employee-number');
    const office = this._localStorageService.get('evaluator-registration-office');
    const position = this._localStorageService.get('evaluator-registration-position');
    const contactNumber = this._localStorageService.get('evaluator-registration-contact-number');

    this._evaluatorEmployeeInfoForm = this._fb.group({
      employee_number:[employeeNumber, Validators.required],
      office:[office, Validators.required],
      position: [position, Validators.required],
      contact_number:[contactNumber, [Validators.required, Validators.maxLength(11),]],
    });
  }

  onSubmit(){
    if (this._evaluatorEmployeeInfoForm.valid) {
      this._router.navigateByUrl("evaluator/registration/identification-info");
    }
  }

  filterOffice(value: string): string[] {
    const filterValueOffice = value.toLowerCase();
    return this._office_options.filter(_office_option=> _office_option.toLowerCase().includes(filterValueOffice));
  }

  filterPosition(value: string): string[] {
    const filterValuePosition = value.toLowerCase();
    return this._position_options.filter(_position_option=> _position_option.toLowerCase().includes(filterValuePosition));
  }
  
  persist(key: string, value: any) {
    this._localStorageService.set(key, value);
  }
}

    


