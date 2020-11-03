import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistSummaryComponent } from './checklist-summary.component';

describe('ChecklistSummaryComponent', () => {
  let component: ChecklistSummaryComponent;
  let fixture: ComponentFixture<ChecklistSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
