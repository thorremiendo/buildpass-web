import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarksHistoryTableComponent } from './remarks-history-table.component';

describe('RemarksHistoryTableComponent', () => {
  let component: RemarksHistoryTableComponent;
  let fixture: ComponentFixture<RemarksHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarksHistoryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarksHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
