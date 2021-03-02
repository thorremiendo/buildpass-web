import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFieldsRepresentativeComponent } from './common-fields-representative.component';

describe('CommonFieldsRepresentativeComponent', () => {
  let component: CommonFieldsRepresentativeComponent;
  let fixture: ComponentFixture<CommonFieldsRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonFieldsRepresentativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFieldsRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
