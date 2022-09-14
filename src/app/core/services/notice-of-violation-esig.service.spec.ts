import { TestBed } from '@angular/core/testing';

import { NoticeOfViolationEsigService } from './notice-of-violation-esig.service';

describe('NoticeOfViolationEsigService', () => {
  let service: NoticeOfViolationEsigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticeOfViolationEsigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
