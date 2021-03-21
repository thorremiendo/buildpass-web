import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersCreateComponent } from './create-user.component';

describe('AdminUsersCreateComponent', () => {
  let component: AdminUsersCreateComponent;
  let fixture: ComponentFixture<AdminUsersCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUsersCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
