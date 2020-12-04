import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatorEditProfileComponent } from './evaluator-edit-profile.component';

describe('EvaluatorEditProfileComponent', () => {
  let component: EvaluatorEditProfileComponent;
  let fixture: ComponentFixture<EvaluatorEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluatorEditProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatorEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
