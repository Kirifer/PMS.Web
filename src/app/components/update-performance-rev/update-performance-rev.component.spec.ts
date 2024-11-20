import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePerformanceRevComponent } from './update-performance-rev.component';

describe('UpdatePerformanceRevComponent', () => {
  let component: UpdatePerformanceRevComponent;
  let fixture: ComponentFixture<UpdatePerformanceRevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePerformanceRevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePerformanceRevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
