import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbaoFeesTableComponent } from './cbao-fees-table.component';

describe('CbaoFeesTableComponent', () => {
  let component: CbaoFeesTableComponent;
  let fixture: ComponentFixture<CbaoFeesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CbaoFeesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CbaoFeesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
