import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalutorReminderComponent } from './evalutor-reminder.component';

describe('EvalutorReminderComponent', () => {
  let component: EvalutorReminderComponent;
  let fixture: ComponentFixture<EvalutorReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalutorReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalutorReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
