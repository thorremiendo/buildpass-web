import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeResetPasswordComponent } from './employee-reset-password.component';

describe('EmployeeResetPasswordComponent', () => {
  let component: EmployeeResetPasswordComponent;
  let fixture: ComponentFixture<EmployeeResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
