import { TestBed } from '@angular/core/testing';

import { CustomStrategyService } from './custom-strategy.service';

describe('CustomStrategyService', () => {
  let service: CustomStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
