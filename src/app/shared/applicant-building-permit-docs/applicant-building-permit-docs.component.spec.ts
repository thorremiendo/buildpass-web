import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantBuildingPermitDocsComponent } from './applicant-building-permit-docs.component';

describe('ApplicantBuildingPermitDocsComponent', () => {
  let component: ApplicantBuildingPermitDocsComponent;
  let fixture: ComponentFixture<ApplicantBuildingPermitDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantBuildingPermitDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantBuildingPermitDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
