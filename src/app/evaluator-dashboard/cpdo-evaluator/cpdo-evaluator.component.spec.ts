import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpdoEvaluatorComponent } from './cpdo-evaluator.component';

describe('CpdoEvaluatorComponent', () => {
  let component: CpdoEvaluatorComponent;
  let fixture: ComponentFixture<CpdoEvaluatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpdoEvaluatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpdoEvaluatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
