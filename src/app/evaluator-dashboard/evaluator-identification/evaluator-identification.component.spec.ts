import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatorIdentificationComponent } from './evaluator-identification.component';

describe('EvaluatorIdentificationComponent', () => {
  let component: EvaluatorIdentificationComponent;
  let fixture: ComponentFixture<EvaluatorIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluatorIdentificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatorIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
