import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFieldsPersonalInfoComponent } from './common-fields-personal-info.component';

describe('CommonFieldsPersonalInfoComponent', () => {
  let component: CommonFieldsPersonalInfoComponent;
  let fixture: ComponentFixture<CommonFieldsPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonFieldsPersonalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFieldsPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
