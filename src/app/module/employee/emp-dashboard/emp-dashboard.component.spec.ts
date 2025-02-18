import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDashboardComponent } from './emp-dashboard.component';

describe('EmpDashboardComponent', () => {
  let component: EmpDashboardComponent;
  let fixture: ComponentFixture<EmpDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
