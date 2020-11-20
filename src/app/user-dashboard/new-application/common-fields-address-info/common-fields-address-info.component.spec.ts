import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFieldsAddressInfoComponent } from './common-fields-address-info.component';

describe('CommonFieldsAddressInfoComponent', () => {
  let component: CommonFieldsAddressInfoComponent;
  let fixture: ComponentFixture<CommonFieldsAddressInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonFieldsAddressInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFieldsAddressInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
