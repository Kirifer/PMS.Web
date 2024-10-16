import { TestBed } from '@angular/core/testing';

import { PerformanceReviewService } from './performance-review.service';

describe('PerformanceReviewService', () => {
  let service: PerformanceReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
