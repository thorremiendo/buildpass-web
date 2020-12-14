import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersFiltersComponent } from './admin-users-filters.component';

describe('AdminUsersFiltersComponent', () => {
  let component: AdminUsersFiltersComponent;
  let fixture: ComponentFixture<AdminUsersFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUsersFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
