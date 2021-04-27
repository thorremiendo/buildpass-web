import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeCreateComponent } from './admin-employee-create.component';

describe('AdminEmployeeCreateComponent', () => {
  let component: AdminEmployeeCreateComponent;
  let fixture: ComponentFixture<AdminEmployeeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEmployeeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
