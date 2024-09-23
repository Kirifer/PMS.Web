import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformRevComponent } from './perform-rev.component';

describe('PerformRevComponent', () => {
  let component: PerformRevComponent;
  let fixture: ComponentFixture<PerformRevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformRevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformRevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
