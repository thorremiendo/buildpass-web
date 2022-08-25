import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeOfViolationFormsComponent } from './notice-of-violation-forms.component';

describe('NoticeOfViolationFormsComponent', () => {
  let component: NoticeOfViolationFormsComponent;
  let fixture: ComponentFixture<NoticeOfViolationFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeOfViolationFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeOfViolationFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
