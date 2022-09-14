import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeOfViolationRemarksComponent } from './notice-of-violation-remarks.component';

describe('NoticeOfViolationRemarksComponent', () => {
  let component: NoticeOfViolationRemarksComponent;
  let fixture: ComponentFixture<NoticeOfViolationRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeOfViolationRemarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeOfViolationRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
