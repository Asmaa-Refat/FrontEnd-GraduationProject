import { TestBed } from '@angular/core/testing';

import { PasswordEncruptionService } from './password-encruption.service';

describe('PasswordEncruptionService', () => {
  let service: PasswordEncruptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordEncruptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
