import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BfpFeesTableComponent } from './bfp-fees-table.component';

describe('BfpFeesTableComponent', () => {
  let component: BfpFeesTableComponent;
  let fixture: ComponentFixture<BfpFeesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BfpFeesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BfpFeesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
