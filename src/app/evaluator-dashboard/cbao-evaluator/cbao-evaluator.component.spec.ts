import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbaoEvaluatorComponent } from './cbao-evaluator.component';

describe('CbaoEvaluatorComponent', () => {
  let component: CbaoEvaluatorComponent;
  let fixture: ComponentFixture<CbaoEvaluatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CbaoEvaluatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CbaoEvaluatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
