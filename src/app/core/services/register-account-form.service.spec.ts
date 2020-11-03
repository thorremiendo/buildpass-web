import { TestBed } from '@angular/core/testing';

import { RegisterAccountFormService } from './register-account-form.service';

describe('RegisterAccountFormService', () => {
  let service: RegisterAccountFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterAccountFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
