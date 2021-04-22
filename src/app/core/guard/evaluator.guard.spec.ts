import { TestBed } from '@angular/core/testing';

import { EvaluatorGuard } from './evaluator.guard';

describe('EvaluatorGuard', () => {
  let guard: EvaluatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EvaluatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
