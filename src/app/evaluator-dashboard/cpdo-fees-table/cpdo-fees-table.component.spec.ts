import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpdoFeesTableComponent } from './cpdo-fees-table.component';

describe('CpdoFeesTableComponent', () => {
  let component: CpdoFeesTableComponent;
  let fixture: ComponentFixture<CpdoFeesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpdoFeesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpdoFeesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
