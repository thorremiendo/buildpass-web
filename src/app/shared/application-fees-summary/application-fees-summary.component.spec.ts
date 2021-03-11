import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFeesSummaryComponent } from './application-fees-summary.component';

describe('ApplicationFeesSummaryComponent', () => {
  let component: ApplicationFeesSummaryComponent;
  let fixture: ComponentFixture<ApplicationFeesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationFeesSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationFeesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
