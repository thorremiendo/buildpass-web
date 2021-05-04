import { TestBed } from '@angular/core/testing';

import { TreasuryServiceService } from './treasury-service.service';

describe('TreasuryServiceService', () => {
  let service: TreasuryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreasuryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
