import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeOfViolationSummaryComponent } from './notice-of-violation-summary.component';

describe('NoticeOfViolationSummaryComponent', () => {
  let component: NoticeOfViolationSummaryComponent;
  let fixture: ComponentFixture<NoticeOfViolationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeOfViolationSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeOfViolationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
