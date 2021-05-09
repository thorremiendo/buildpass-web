import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-technical-findings',
  templateUrl: './technical-findings.component.html',
  styleUrls: ['./technical-findings.component.scss'],
})
export class TechnicalFindingsComponent implements OnInit {
  public technicalFindingsForm: FormGroup;
  public isLoading: boolean = false;
  get technicalFindingsFormControl() {
    return this.technicalFindingsForm.controls;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.technicalFindingsForm = this.fb.group({
      setBackFron: ['', Validators.required],
    });
  }
}
