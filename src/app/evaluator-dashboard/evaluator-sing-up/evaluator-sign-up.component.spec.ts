import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatorSignUpComponent } from './evaluator-sign-up.component';

describe('EvaluatorSingOutComponent', () => {
  let component: EvaluatorSignUpComponent;
  let fixture: ComponentFixture<EvaluatorSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluatorSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatorSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
