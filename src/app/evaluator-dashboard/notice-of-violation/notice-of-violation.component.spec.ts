import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeOfViolationComponent } from './notice-of-violation.component';

describe('NoticeOfViolationComponent', () => {
  let component: NoticeOfViolationComponent;
  let fixture: ComponentFixture<NoticeOfViolationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeOfViolationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeOfViolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
