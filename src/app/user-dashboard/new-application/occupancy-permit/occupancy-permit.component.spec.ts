import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyPermitComponent } from './occupancy-permit.component';

describe('OccupancyPermitComponent', () => {
  let component: OccupancyPermitComponent;
  let fixture: ComponentFixture<OccupancyPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupancyPermitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupancyPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
