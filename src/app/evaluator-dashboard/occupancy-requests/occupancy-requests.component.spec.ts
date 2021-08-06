import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyRequestsComponent } from './occupancy-requests.component';

describe('OccupancyRequestsComponent', () => {
  let component: OccupancyRequestsComponent;
  let fixture: ComponentFixture<OccupancyRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupancyRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupancyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
