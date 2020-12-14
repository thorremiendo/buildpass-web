import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserInfoComponent } from './admin-user-info.component';

describe('AdminUserInfoComponent', () => {
  let component: AdminUserInfoComponent;
  let fixture: ComponentFixture<AdminUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
