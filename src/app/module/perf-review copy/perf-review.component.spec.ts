import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfReviewComponent2 } from './perf-review.component';

describe('PerfReviewComponent', () => {
  let component: PerfReviewComponent2;
  let fixture: ComponentFixture<PerfReviewComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfReviewComponent2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfReviewComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
