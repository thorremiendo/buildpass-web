import { TestBed } from '@angular/core/testing';

import { OccupancyService } from './occupancy.service';

describe('OccupancyService', () => {
  let service: OccupancyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccupancyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
