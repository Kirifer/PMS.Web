import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfReviewComponent } from './perf-review.component';

describe('PerfReviewComponent', () => {
  let component: PerfReviewComponent;
  let fixture: ComponentFixture<PerfReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
