import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeReviewComponent } from './take-review.component';

describe('TakeReviewComponent', () => {
  let component: TakeReviewComponent;
  let fixture: ComponentFixture<TakeReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TakeReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
