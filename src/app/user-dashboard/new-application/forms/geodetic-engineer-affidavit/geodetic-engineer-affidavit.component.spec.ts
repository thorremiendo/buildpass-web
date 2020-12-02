import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeodeticEngineerAffidavitComponent } from './geodetic-engineer-affidavit.component';

describe('GeodeticEngineerAffidavitComponent', () => {
  let component: GeodeticEngineerAffidavitComponent;
  let fixture: ComponentFixture<GeodeticEngineerAffidavitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeodeticEngineerAffidavitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeodeticEngineerAffidavitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
