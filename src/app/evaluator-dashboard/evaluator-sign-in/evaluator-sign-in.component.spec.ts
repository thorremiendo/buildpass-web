import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatorSignInComponent } from './evaluator-sign-in.component';

describe('EvaluatorSignInComponent', () => {
  let component: EvaluatorSignInComponent;
  let fixture: ComponentFixture<EvaluatorSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluatorSignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatorSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
