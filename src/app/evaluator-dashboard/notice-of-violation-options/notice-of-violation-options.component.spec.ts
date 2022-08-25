import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeOfViolationOptionsComponent } from './notice-of-violation-options.component';

describe('NoticeOfViolationOptionsComponent', () => {
  let component: NoticeOfViolationOptionsComponent;
  let fixture: ComponentFixture<NoticeOfViolationOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeOfViolationOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeOfViolationOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
