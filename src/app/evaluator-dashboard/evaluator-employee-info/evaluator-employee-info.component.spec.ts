import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatorEmployeeInfoComponent } from './evaluator-employee-info.component';

describe('EvaluatorEmployeeInfoComponent', () => {
  let component: EvaluatorEmployeeInfoComponent;
  let fixture: ComponentFixture<EvaluatorEmployeeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluatorEmployeeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatorEmployeeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
