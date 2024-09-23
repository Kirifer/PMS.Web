import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPerformRevComponent } from './add-perform-rev.component';

describe('AddPerformRevComponent', () => {
  let component: AddPerformRevComponent;
  let fixture: ComponentFixture<AddPerformRevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPerformRevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPerformRevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
