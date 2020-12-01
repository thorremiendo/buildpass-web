import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatorRegistrationComponent } from './evaluator-registration.component';

describe('EvaluatorRegistrationComponent', () => {
  let component: EvaluatorRegistrationComponent;
  let fixture: ComponentFixture<EvaluatorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluatorRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
