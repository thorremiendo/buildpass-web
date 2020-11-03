import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherRequirementsComponent } from './other-requirements.component';

describe('OtherRequirementsComponent', () => {
  let component: OtherRequirementsComponent;
  let fixture: ComponentFixture<OtherRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherRequirementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
