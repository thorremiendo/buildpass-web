import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeOfViolationEsigComponent } from './notice-of-violation-esig.component';

describe('NoticeOfViolationEsigComponent', () => {
  let component: NoticeOfViolationEsigComponent;
  let fixture: ComponentFixture<NoticeOfViolationEsigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeOfViolationEsigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeOfViolationEsigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
