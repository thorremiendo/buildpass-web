import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeFiltersComponent } from './admin-employee-filters.component';

describe('AdminEmployeeFiltersComponent', () => {
  let component: AdminEmployeeFiltersComponent;
  let fixture: ComponentFixture<AdminEmployeeFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEmployeeFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
