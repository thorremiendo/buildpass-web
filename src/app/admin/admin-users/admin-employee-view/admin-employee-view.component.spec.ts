import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeViewComponent } from './admin-employee-view.component';

describe('AdminEmployeeViewComponent', () => {
  let component: AdminEmployeeViewComponent;
  let fixture: ComponentFixture<AdminEmployeeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEmployeeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
