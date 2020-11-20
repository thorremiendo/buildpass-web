import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatorsSummaryComponent } from './evaluators-summary.component';

describe('EvaluatorsSummaryComponent', () => {
  let component: EvaluatorsSummaryComponent;
  let fixture: ComponentFixture<EvaluatorsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluatorsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatorsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
