import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGoalsComponent } from './dialog-goals.component';

describe('DialogGoalsComponent', () => {
  let component: DialogGoalsComponent;
  let fixture: ComponentFixture<DialogGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogGoalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
