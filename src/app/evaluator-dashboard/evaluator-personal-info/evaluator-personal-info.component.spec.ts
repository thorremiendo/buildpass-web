import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatorPersonalInfoComponent } from './evaluator-personal-info.component';

describe('EvaluatorPersonalInfoComponent', () => {
  let component: EvaluatorPersonalInfoComponent;
  let fixture: ComponentFixture<EvaluatorPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluatorPersonalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatorPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
