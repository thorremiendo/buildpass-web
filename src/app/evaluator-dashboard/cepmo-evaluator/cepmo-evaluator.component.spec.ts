import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CepmoEvaluatorComponent } from './cepmo-evaluator.component';

describe('CepmoEvaluatorComponent', () => {
  let component: CepmoEvaluatorComponent;
  let fixture: ComponentFixture<CepmoEvaluatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CepmoEvaluatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CepmoEvaluatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
