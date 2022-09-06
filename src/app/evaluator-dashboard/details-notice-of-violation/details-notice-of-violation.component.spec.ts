import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNoticeOfViolationComponent } from './details-notice-of-violation.component';

describe('DetailsNoticeOfViolationComponent', () => {
  let component: DetailsNoticeOfViolationComponent;
  let fixture: ComponentFixture<DetailsNoticeOfViolationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsNoticeOfViolationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsNoticeOfViolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
