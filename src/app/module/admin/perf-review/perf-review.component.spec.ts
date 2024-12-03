import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceReviewComponent } from './perf-review.component';

describe('PerfReviewComponent', () => {
  let component: PerformanceReviewComponent;
  let fixture: ComponentFixture<PerformanceReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
