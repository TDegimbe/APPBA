import { TestBed } from '@angular/core/testing';

import { VerificationcodeService } from './verificationcode.service';

describe('VerificationcodeService', () => {
  let service: VerificationcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificationcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
