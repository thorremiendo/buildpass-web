import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApplicantListComponent } from './admin-applicant-list.component';

describe('AdminApplicantListComponent', () => {
  let component: AdminApplicantListComponent;
  let fixture: ComponentFixture<AdminApplicantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApplicantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApplicantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
