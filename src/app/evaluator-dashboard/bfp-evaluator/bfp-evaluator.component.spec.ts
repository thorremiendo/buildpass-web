import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BfpEvaluatorComponent } from './bfp-evaluator.component';

describe('BfpEvaluatorComponent', () => {
  let component: BfpEvaluatorComponent;
  let fixture: ComponentFixture<BfpEvaluatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BfpEvaluatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BfpEvaluatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
