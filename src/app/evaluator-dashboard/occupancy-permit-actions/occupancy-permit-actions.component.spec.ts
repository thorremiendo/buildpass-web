import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyPermitActionsComponent } from './occupancy-permit-actions.component';

describe('OccupancyPermitActionsComponent', () => {
  let component: OccupancyPermitActionsComponent;
  let fixture: ComponentFixture<OccupancyPermitActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupancyPermitActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupancyPermitActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
